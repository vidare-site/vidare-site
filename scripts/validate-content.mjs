import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SUPPORTED_LOCALES } from '../src/i18n/config.js';
import { servicePages, SERVICE_ROUTE_PATHS } from '../src/content/servicePages.js';
import { getRouteSeo } from '../src/content/seo.js';

assert.deepEqual(SUPPORTED_LOCALES, ['pt', 'en', 'sv']);
const slugs = Object.values(SERVICE_ROUTE_PATHS).map((p) => p.slice('/services/'.length));
let pages = 0, questions = 0;
const countSentences = (text) => (text.match(/[.!?](?:\s|$)/g) || []).length;
for (const locale of SUPPORTED_LOCALES) {
  const site = servicePages[locale];
  assert.deepEqual(Object.keys(site.services), slugs);
  for (const [slug, article] of Object.entries(site.services)) {
    const paragraphs = [...article.intro, ...article.sections.flatMap((section) => section.paragraphs)];
    const words = paragraphs.join(' ').trim().split(/\s+/u).length;
    assert.ok(words >= 250 && words <= 400, `${locale}/${slug}: ${words} narrative words`);
    for (const paragraph of paragraphs) assert.ok(countSentences(paragraph) >= 2 && countSentences(paragraph) <= 4, `${locale}/${slug}: paragraph sentence count`);
    assert.ok(article.faqs.length >= 6 && article.faqs.length <= 8);
    for (const [question, answer] of article.faqs) {
      assert.ok(question.endsWith('?'));
      assert.ok(countSentences(answer) >= 2 && countSentences(answer) <= 4, `${locale}/${slug}: ${question}`);
    }
    for (const related of article.related) assert.ok(slugs.includes(related) && related !== slug);
    const seo = getRouteSeo(locale, `/services/${slug}`);
    const faq = seo.structuredData['@graph'].find((node) => node['@type'] === 'FAQPage');
    assert.deepEqual(faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), article.faqs);
    const html = fs.readFileSync(`dist/${locale}/services/${slug}/index.html`, 'utf8');
    assert.equal((html.match(/data-service-contact/g) || []).length, 1);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
    assert.equal((main.match(/href="https:\/\/wa.me\//g) || []).length, 1, 'one WhatsApp invitation in the service content');
    assert.ok(!main.includes(`/${locale}/cadastro`));
    assert.ok(html.includes(article.title));
    pages++; questions += article.faqs.length;
  }
  const home = fs.readFileSync(`dist/${locale}/index.html`, 'utf8');
  const heading = home.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1];
  assert.notEqual(heading, 'Vidare Psicologia Integral');
  assert.ok(home.includes('Vidare Psicologia Integral'));
  assert.ok(!home.includes('hreflang="es"') && !home.includes('href="/es'));
  const graph = getRouteSeo(locale, '/').structuredData['@graph'];
  assert.deepEqual(graph.find((n) => n['@type'] === 'Person').knowsLanguage, ['pt-BR', 'en', 'sv']);
}
assert.ok(!fs.existsSync('dist/es'));
const llms = fs.readFileSync('dist/llms.txt', 'utf8');
assert.ok(!/espanhol|Español|\/es(?:\b|\/)/.test(llms));
assert.ok(llms.includes('/pt/services/emdr-schema-therapy'));
console.log(`PASS: ${pages} service texts, 250 to 400 narrative words each, ${questions} FAQ answers with 2 to 4 sentences, 3 languages, one final invitation and no Spanish pages.`);
