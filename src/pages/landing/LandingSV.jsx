import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Whatsapp from '../../components/icons/Whatsapp';
import { Mail, MessageSquare } from 'lucide-react';

const BRAND_NAME_SV = 'Vidare Integrerad Psykologi';
const WHATSAPP_NUMBER = '46721524084';
const EMAIL_ADDRESS = 'ricardo@vidare.eu';

const WHATSAPP_MESSAGE = 'Hej! Jag skulle vilja boka en kostnadsfri konsultation.';
const EMAIL_SUBJECT = 'Kostnadsfri konsultation';
const EMAIL_BODY = 'Hej Ricardo,\n\nJag skulle vilja boka en kostnadsfri konsultation.\n\n';

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const smsHref = `sms:+${WHATSAPP_NUMBER}`;
const mailHref = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`;

const faqs = [
  {
    question: 'Vad kostar ett samtal?',
    answer:
      'Ett samtal (50 minuter) kostar 1 500 kr. Vid behov av dubbla sessioner, vilket kan bli aktuellt vid EMDR-behandling, kostar det 2 000 kr.',
  },
  {
    question: 'Hur vet jag om EMDR passar mig?',
    answer:
      'EMDR passar och fungerar för de flesta. Ricardo gör alltid en individuell bedömning tillsammans med dig för att säkerställa högsta möjliga patientsäkerhet.',
  },
  {
    question: 'Kan jag få hjälp om jag inte vet vad som orsakar mönstret?',
    answer:
      'Ja, det är mycket vanligt att inte veta varför mönstren uppstår. Det är också en central del av terapin – tillsammans navigerar vi dina mönster och arbetar oss fram till en förståelse för orsakerna, vilket är ett grundläggande steg i den terapeutiska processen.',
  },
];

const identificationPoints = [
  'Du hamnar alltid med samma typ av partner, fast du lovat dig själv att det skulle bli annorlunda.',
  'Du känner dig dränerad i relationer som borde kännas trygga.',
  'Gamla känslor dyker upp starkare än situationen egentligen kräver.',
  'Du vet "varför" i huvudet och kan logiskt förstå det som händer, men kroppen reagerar ändå likadant.',
];

const methods = [
  {
    name: 'EMDR',
    description:
      'Hjälper hjärnan att bearbeta och lägga traumatiska minnen till rätta, så att de inte längre styr din vardag.',
    stat:
      'Enligt WHO och internationella riktlinjer (NICE, ISTSS) uppfyller 85–90% av de som genomgår EMDR-terapi inte längre kriterier för PTSD efter behandling.',
  },
  {
    name: 'Schematerapi',
    description:
      'Hjälper dig förstå var dina återkommande mönster kommer ifrån, och ger konkreta verktyg för att bryta dem – särskilt när det gäller relationer och självbild som suttit i sedan barndomen.',
  },
  {
    name: 'KBT',
    description:
      'Hjälper dig se sambandet mellan tankar, känslor och beteenden, och ger praktiska strategier för att hantera ångest, oro och svåra känslor i vardagen.',
  },
];

const processSteps = [
  {
    title: 'Kostnadsfri konsultation',
    body: 'Ett kort samtal, ca 15 minuter, via WhatsApp, SMS eller e-post för att höra om din situation.',
  },
  {
    title: 'Kartläggning',
    body: 'Ricardo gör en preliminär kartläggning av dina behov och återkopplar med förslag till terapiplan.',
  },
  {
    title: 'Skräddarsydd terapi',
    body: 'Om det känns rätt att gå vidare, inleder vi regelbunden kontakt – en skräddarsydd terapi, i din takt.',
  },
];

const ContactOptions = () => (
  <div className="flex flex-col gap-md w-full max-w-md mx-auto">
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto inline-flex items-center justify-center gap-sm px-2xl py-md bg-title text-light text-sm font-medium uppercase tracking-[0.1em] hover:bg-transparent hover:text-title border border-title transition-all"
    >
      <Whatsapp className="w-5 h-5 shrink-0" />
      <span>Boka en kostnadsfri konsultation</span>
    </a>
    <div className="flex flex-wrap items-center justify-center gap-lg text-sm text-muted">
      <a
        href={smsHref}
        className="inline-flex items-center gap-xs hover:text-title transition-colors underline underline-offset-4"
      >
        <MessageSquare className="w-4 h-4 shrink-0" />
        <span>Skicka SMS</span>
      </a>
      <a
        href={mailHref}
        className="inline-flex items-center gap-xs hover:text-title transition-colors underline underline-offset-4"
      >
        <Mail className="w-4 h-4 shrink-0" />
        <span>Skicka e-post</span>
      </a>
    </div>
    <p className="w-full text-xs text-muted text-center leading-relaxed">
      Observera att e-post inte är en krypterad kommunikationskanal. Undvik att skicka känslig
      personlig information via e-post.
    </p>
  </div>
);

const useLandingSeo = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const title = 'Bryt mönstret som upprepas | Ricardo Correa, Leg. psykolog';
    document.title = title;

    const description =
      'Hamnar du i samma destruktiva relationsmönster om och om igen? Legitimerad psykolog med 18 års erfarenhet inom trauma, otrygg anknytning och EMDR. Boka en kostnadsfri konsultation.';

    const setMeta = (name, content, attr = 'name') => {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      let created = false;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
        created = true;
      }
      el.setAttribute('content', content);
      return { el, created };
    };

    const managed = [
      setMeta('description', description),
      setMeta('robots', 'index, follow'),
      setMeta('og:title', title, 'property'),
      setMeta('og:description', description, 'property'),
      setMeta('og:type', 'website', 'property'),
    ];

    const previousLang = document.documentElement.lang;
    document.documentElement.lang = 'sv';

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
      managed.forEach(({ el, created }) => {
        if (created && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);
};

const SectionHeading = ({ children, className = '' }) => (
  <h2 className={`font-title text-3xl md:text-4xl text-title text-center mb-lg ${className}`}>
    {children}
  </h2>
);

const LandingSV = () => {
  useLandingSeo();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-bg text-body">
      <header className="py-md border-b border-border">
        <div className="container mx-auto px-lg flex items-center justify-between">
          <span className="font-title text-lg text-title">{BRAND_NAME_SV}</span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.14em] text-muted">
            Legitimerad psykolog
          </span>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero */}
        <section className="py-2xl md:py-3xl bg-bg">
          <div className="container mx-auto px-lg max-w-[820px] text-center">
            <h1 className="font-title text-4xl md:text-6xl leading-[1.1] text-title mb-lg">
              Har du märkt att du hamnar i samma negativa mönster – om och om igen?
            </h1>
            <p className="text-lg md:text-xl text-body leading-relaxed mb-xl max-w-[620px] mx-auto text-left md:text-center">
              Relationer som efter ett tag får dig att må dåligt och alltid slutar likadant.
              Känslor som tar överhand. Gamla upplevelser som fortfarande styr. Det går att
              förstå varför – och det går att förändra, i din egen takt, tillsammans med en
              psykolog som förstår och har rätt verktyg.
            </p>
            <ContactOptions />
          </div>
        </section>

        {/* Identification */}
        <section className="py-2xl bg-bg">
          <div className="container mx-auto px-lg max-w-[760px]">
            <SectionHeading>Känner du igen dig?</SectionHeading>
            <div className="grid sm:grid-cols-2 gap-md mt-xl">
              {identificationPoints.map((point) => (
                <div
                  key={point}
                  className="bg-surface border border-border p-lg text-body text-left leading-relaxed"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mechanism */}
        <section className="py-2xl bg-bg">
          <div className="container mx-auto px-lg max-w-[680px]">
            <SectionHeading>Varför blir det så?</SectionHeading>
            <p className="text-lg text-body leading-relaxed text-left">
              Mönster som upprepas har ofta sin grund i det vi lärde oss tidigt i livet om vad
              som är bekant och hur trygghet känns – även när det gör ont. Det bekanta kan
              kännas "rätt", även om det inte är bra för dig.
            </p>
          </div>
        </section>

        {/* Method */}
        <section className="py-2xl bg-bg">
          <div className="container mx-auto px-lg max-w-[960px]">
            <SectionHeading>Hur vi arbetar tillsammans</SectionHeading>
            <p className="text-body text-left md:text-center mb-xl max-w-[600px] md:mx-auto">
              Beroende på dina behov och mål arbetar vi med metoder som har starkt
              vetenskapligt stöd:
            </p>
            <div className="grid md:grid-cols-3 gap-md">
              {methods.map((method) => (
                <div
                  key={method.name}
                  className="bg-surface border border-border p-lg flex flex-col"
                >
                  <h3 className="font-title text-2xl text-title mb-sm">{method.name}</h3>
                  <p className="text-sm text-body leading-relaxed mb-sm flex-grow">
                    {method.description}
                  </p>
                  {method.stat && (
                    <p className="text-xs text-muted leading-relaxed border-t border-border-subtle pt-sm mt-sm">
                      {method.stat}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-2xl bg-bg">
          <div className="container mx-auto px-lg max-w-[680px]">
            <SectionHeading>Om Ricardo</SectionHeading>
            <p className="text-body leading-relaxed mb-md text-left">
              Ricardo är legitimerad psykolog, med totalt 18 års erfarenhet inom yrket. Han har
              arbetat inom primärvården, vuxenhabiliteringen och specialistpsykiatrin, och har
              genom åren genomfört över 25 000 kliniska timmar och tagit emot patienter från
              mer än 20 länder.
            </p>
            <p className="text-body leading-relaxed text-left">
              Ricardo är certifierad i EMDR (EMDRIA och EMDR Europe) samt Schematerapi (ISST),
              och arbetar även med KBT och ACT. Han har särskild erfarenhet av trauma,
              återkommande dysfunktionella relationsmönster och långvariga psykiska besvär.
            </p>
          </div>
        </section>

        {/* Process */}
        <section className="py-2xl bg-section-warm">
          <div className="container mx-auto px-lg max-w-[820px]">
            <SectionHeading>Så går det till</SectionHeading>
            <div className="grid md:grid-cols-3 gap-lg mt-xl">
              {processSteps.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="w-10 h-10 mx-auto mb-sm rounded-full bg-title text-light flex items-center justify-center font-title text-lg">
                    {index + 1}
                  </div>
                  <h3 className="font-title text-xl text-title mb-xs">{step.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-2xl bg-section-sage">
          <div className="container mx-auto px-lg max-w-[760px]">
            <h2 className="font-title text-3xl md:text-4xl text-light text-center mb-xl">
              Vanliga frågor
            </h2>
            <Accordion type="single" collapsible className="bg-surface p-lg md:p-xl border border-border/10">
              {faqs.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-title text-left font-title text-lg md:text-xl">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body text-left leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-3xl bg-bg">
          <div className="container mx-auto px-lg max-w-[620px] text-center">
            <h2 className="font-title text-3xl md:text-4xl text-title mb-xl">
              Du behöver inte ha alla svar för att ta första steget.
            </h2>
            <ContactOptions />
          </div>
        </section>
      </main>

      <footer className="py-xl bg-bg border-t border-border">
        <div className="container mx-auto px-lg max-w-[820px] space-y-md">
          <div className="p-lg bg-surface border border-border text-sm text-body leading-relaxed text-left">
            Denna webbsida och informationen som finns här ersätter inte kvalificerad vård. Vid
            nödsituation, ring alltid 112 eller kontakta 1177 för rådgivning.
          </div>
          <p className="text-xs text-muted text-center">
            © {new Date().getFullYear()} Ricardo Correa | {BRAND_NAME_SV}. Alla rättigheter
            förbehållna.
          </p>
          <p className="text-xs text-muted text-center">
            Alla samtal, videosamtal och all kommunikation sker i enlighet med GDPR
            (dataskyddsförordningen).
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingSV;
