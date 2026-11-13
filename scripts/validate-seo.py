"""Validate the delivered HTML without executing JavaScript or contacting live forms."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import json, re, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
LOCALES = {'pt': 'pt-BR', 'en': 'en', 'es': 'es', 'sv': 'sv'}
PATHS = ['', '/blog', '/cadastro', '/services/online-psychotherapy-adults', '/services/trauma', '/services/anxiety', '/services/burnout', '/services/emdr', '/services/schema-therapy']
PAGES = {f'/{locale}{path}' for locale in LOCALES for path in PATHS}
errors, results = [], []

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.tags, self.text, self.jsonld, self.current_json = [], [], [], None
        self.headings, self.current_heading = [], None
        self.inert = False
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs); self.tags.append((tag, attrs))
        if tag in ['script', 'style']: self.inert = True
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.current_json = ''
        if re.fullmatch('h[1-6]', tag): self.current_heading = [int(tag[1]), '']
    def handle_data(self, data):
        if not self.inert: self.text.append(data)
        if self.current_json is not None: self.current_json += data
        if self.current_heading is not None: self.current_heading[1] += data
    def handle_endtag(self, tag):
        if tag in ['script', 'style']: self.inert = False
        if tag == 'script' and self.current_json is not None:
            self.jsonld.append(json.loads(self.current_json)); self.current_json = None
        if re.fullmatch('h[1-6]', tag) and self.current_heading is not None:
            self.headings.append(self.current_heading); self.current_heading = None
    def find(self, tag, **attrs):
        return [a for t, a in self.tags if t == tag and all(a.get(k) == v for k, v in attrs.items())]

for url in sorted(PAGES):
    html = (DIST / url.lstrip('/') / 'index.html').read_text()
    page = Page(html)
    def check(condition, message):
        if not condition: errors.append(f'{url}: {message}')
    locale = url.split('/')[1]
    check(page.find('html')[0].get('lang') == LOCALES[locale], 'wrong document language')
    check(len(page.find('h1')) == 1, 'must have exactly one H1')
    check(len(page.find('main')) == 1, 'must have exactly one main')
    check(bool(page.find('header')) and bool(page.find('footer')), 'missing semantic header/footer')
    check(all(text.strip() for _, text in page.headings), 'empty heading')
    previous = 0
    for level, _ in page.headings:
        check(level <= previous + 1, f'skipped heading level: H{previous} to H{level}'); previous = level
    title = re.findall(r'<title[^>]*>(.*?)</title>', html, re.S)
    check(len(title) == 1 and 0 < len(title[0]) <= 60, 'title missing, duplicate, or longer than 60')
    description = page.find('meta', name='description')
    check(len(description) == 1 and 0 < len(description[0]['content']) <= 155, 'description missing, duplicate, or longer than 155')
    canonical = page.find('link', rel='canonical')
    check(len(canonical) == 1 and canonical[0]['href'] == 'https://vidare.eu' + url, 'canonical mismatch')
    alternates = page.find('link', rel='alternate')
    check({a['hreflang'] for a in alternates} == set(LOCALES.values()) | {'x-default'}, 'hreflang set mismatch')
    for alternate in alternates:
        check(urlparse(alternate['href']).path in PAGES, 'hreflang target missing')
        target = Page((DIST / urlparse(alternate['href']).path.lstrip('/') / 'index.html').read_text())
        check(any(a.get('href') == 'https://vidare.eu' + url for a in target.find('link', rel='alternate')), 'nonreciprocal hreflang')
    for key in ['og:type','og:title','og:description','og:url','og:site_name','og:locale','og:image','og:image:width','og:image:height','og:image:alt']:
        check(len(page.find('meta', property=key)) == 1, f'missing/duplicate {key}')
    for key in ['twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt']:
        check(len(page.find('meta', name=key)) == 1, f'missing/duplicate {key}')
    for image in page.find('img'):
        check('alt' in image and (image['alt'] or image.get('aria-hidden') == 'true'), 'missing descriptive/decorative alt')
        check(str(image.get('width','')).isdigit() and str(image.get('height','')).isdigit(), 'image dimensions missing')
        if image.get('src','').startswith('/'): check((DIST / image['src'].lstrip('/')).is_file(), 'image missing')
    for link in page.find('a'):
        href = link.get('href', '')
        if href.startswith('/') and not href.startswith('//'): check(urlparse(href).path in PAGES, f'broken internal link {href}')
    check(len(page.jsonld) == 1, 'JSON-LD missing or duplicated')
    if page.jsonld:
        graph = page.jsonld[0]['@graph']
        person = next(node for node in graph if node['@type'] == 'Person')
        check(person['hasCredential']['identifier'] == 'CRP 05/40839', 'credential mismatch')
        business = next(node for node in graph if node['@type'] == 'ProfessionalService')
        check(business['email'] == 'ricardo@vidare.eu', 'email mismatch')
        check(not any(key in business for key in ['address','aggregateRating','review','award']), 'invented business facts')
        for node in graph:
            if node['@type'] == 'FAQPage':
                for question in node['mainEntity']:
                    check(question['name'] in ' '.join(page.text), 'FAQ question absent from HTML')
                    answer = ' '.join(question['acceptedAnswer']['text'].split())
                    check(answer in ' '.join(' '.join(page.text).split()), 'FAQ answer absent from HTML')
    for script in page.find('script'):
        check(script.get('data-cfasync') == 'false', 'script not excluded from Rocket Loader')
    if url.endswith('/cadastro'):
        check(not any(a.get('src') == '/analytics.js' for a in page.find('script')), 'tracker on clinical form')
        check(page.find('meta', name='robots')[0]['content'] == 'noindex, follow', 'intake must be noindex')
    main_html = re.search(r'<main\b[^>]*>([\s\S]*?)</main>', html)
    check(not re.search(r'<(?:div|section)[^>]*style="[^"]*opacity:0', main_html[1] if main_html else ''), 'main text hidden pending animation')
    check('https://www.vidare.eu' not in html, 'noncanonical domain in HTML')
    results.append({'url': url, 'title': title[0], 'title_length': len(title[0]), 'description_length': len(description[0]['content']), 'h1': next(text for level,text in page.headings if level == 1)})

sitemap = ET.parse(DIST / 'sitemap.xml')
namespace = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = [node.text for node in sitemap.findall('.//s:loc', namespace)]
expected = {'https://vidare.eu' + url for url in PAGES if not url.endswith('/cadastro')}
if set(urls) != expected: errors.append('sitemap does not match the 32 indexable pages')
if len(urls) != len(set(urls)): errors.append('duplicate URLs in sitemap')
if (DIST / 'server').exists(): errors.append('server build leaked to public output')
error_page = Page((DIST / '404.html').read_text())
if error_page.find('meta', name='robots')[0]['content'] != 'noindex, follow': errors.append('404 must be noindex')
if any(s.get('src') for s in error_page.find('script')): errors.append('404 must work without client rendering')
root = Page((DIST / 'index.html').read_text())
if len(root.find('h1')) != 1: errors.append('root document lacks H1')
if errors:
    print('\n'.join(errors)); raise SystemExit(1)
print(f'PASS: {len(results)} complete HTML pages, one H1/main each, metadata lengths, hreflang reciprocity, existing images, JSON-LD facts, internal links, visible FAQ answers, 32 sitemap URLs and static 404.')
(ROOT / 'seo-validation.json').write_text(json.dumps({'pages':results,'sitemap_urls':len(urls),'errors':errors},ensure_ascii=False,indent=2)+'\n')
