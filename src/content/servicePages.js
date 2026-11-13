import { DEFAULT_LOCALE } from '../i18n/config.js';

export const SERVICE_ROUTE_PATHS = {
  ONLINE_PSYCHOTHERAPY_ADULTS: '/services/online-psychotherapy-adults',
  TRAUMA: '/services/trauma',
  ANXIETY: '/services/anxiety',
  BURNOUT: '/services/burnout',
  EMDR: '/services/emdr',
  SCHEMA_THERAPY: '/services/schema-therapy',
};

const SERVICE_SLUGS = Object.values(SERVICE_ROUTE_PATHS).map((path) => path.replace('/services/', ''));

export const isServiceSlug = (slug) => SERVICE_SLUGS.includes(slug);
export const getServiceAnchorId = (slug) => `servico-${slug}`;

export const servicePages = {
  pt: {
    hub: {
      title: 'Temas clínicos frequentes',
      description:
        'Exemplos de demandas trabalhadas em psicoterapia, de forma integrada ao seu processo.',
      ctaLabel: 'Ver página completa',
    },
    services: {
      'online-psychotherapy-adults': {
        label: 'Psicoterapia online para adultos',
        cardDescription:
          'Cuidado psicológico para adultos em diferentes países, rotinas e fusos, com consistência e confidencialidade.',
        title: 'Psicoterapia online para adultos',
        intro:
          'A psicoterapia online oferece um espaco estavel de escuta e elaboracao, mesmo quando sua rotina muda, seu trabalho exige muito ou sua vida acontece entre diferentes paises.',
        forWhoTitle: 'Quando essa psicoterapia costuma ajudar',
        forWhoItems: [
          'Quando voce sente que esta funcionando por fora, mas sobrecarregado por dentro.',
          'Quando precisa de continuidade terapeutica em rotina internacional.',
          'Quando busca profundidade clinica sem abrir mao de praticidade.',
        ],
        approachTitle: 'Como esse processo e conduzido',
        approachText:
          'As sessoes sao estruturadas com base na sua historia, no seu momento atual e nos objetivos terapeuticos. O foco e unir vinculo, clareza clinica e intervencao baseada em evidencia.',
        ctaTitle: 'Se fizer sentido para voce, podemos comecar com uma conversa.',
        ctaBody:
          'O primeiro encontro ajuda a mapear seu momento e definir o melhor formato para seu acompanhamento.',
      },
      trauma: {
        label: 'Terapia para trauma',
        cardDescription:
          'Para experiências que passaram no tempo, mas seguem ativas no corpo, nas relações e na regulação emocional.',
        title: 'Terapia para trauma',
        intro:
          'Trauma nao e apenas o que aconteceu, mas o que continuou dentro de voce. A terapia para trauma ajuda a reduzir estado de alerta, restaurar seguranca interna e interromper repeticoes dolorosas.',
        forWhoTitle: 'Sinais comuns de trauma nao processado',
        forWhoItems: [
          'Reacoes intensas diante de situacoes aparentemente simples.',
          'Dificuldade de confiar, relaxar ou se sentir seguro em relacoes.',
          'Sensacao de viver em alerta, com cansaço emocional constante.',
        ],
        approachTitle: 'Como trabalhamos trauma em psicoterapia',
        approachText:
          'Combinamos estabilizacao emocional, leitura de padroes e tecnicas especificas como EMDR quando indicado, sempre respeitando seu ritmo e sua janela de tolerancia.',
        ctaTitle: 'Voce nao precisa continuar carregando isso sozinho.',
        ctaBody:
          'Com acompanhamento adequado, e possivel processar trauma com mais seguranca e recuperar espaco interno.',
      },
      anxiety: {
        label: 'Psicoterapia para ansiedade',
        cardDescription:
          'Para mente acelerada, corpo em alerta e sensação de sobrecarga que não desliga.',
        title: 'Psicoterapia para ansiedade',
        intro:
          'Ansiedade pode parecer produtividade por fora e esgotamento por dentro. A psicoterapia para ansiedade ajuda a entender gatilhos, regular o sistema nervoso e reduzir a pressao interna.',
        forWhoTitle: 'Quando vale buscar ajuda para ansiedade',
        forWhoItems: [
          'Pensamentos acelerados e dificuldade de desacelerar.',
          'Preocupacao constante, mesmo quando tudo parece sob controle.',
          'Insônia, irritabilidade ou sensacao de viver no limite.',
        ],
        approachTitle: 'Nossa abordagem clinica para ansiedade',
        approachText:
          'Trabalhamos cognicoes, padroes emocionais e respostas corporais de estresse para que voce reconquiste presenca, foco e mais liberdade no dia a dia.',
        ctaTitle: 'Ansiedade tratada com clareza muda sua relacao com a rotina.',
        ctaBody:
          'Uma conversa inicial pode mostrar quais ajustes terapeuticos fazem mais sentido para voce.',
      },
      burnout: {
        label: 'Terapia online para burnout',
        cardDescription:
          'Para exaustão crônica, perda de sentido no trabalho e dificuldade de recuperar energia.',
        title: 'Terapia online para burnout',
        intro:
          'Burnout nao e falta de forca. E um colapso progressivo de energia, sentido e regulacao emocional. A terapia ajuda a interromper o ciclo de sobrecarga e culpa.',
        forWhoTitle: 'Sinais frequentes de burnout',
        forWhoItems: [
          'Cansaco persistente mesmo apos descanso.',
          'Distanciamento emocional do trabalho e queda de motivacao.',
          'Dificuldade de concentracao, irritacao e sensacao de esvaziamento.',
        ],
        approachTitle: 'Como trabalhamos burnout',
        approachText:
          'Investigamos padroes de autocobranca e adaptacao excessiva, reorganizamos limites praticos e fortalecemos recursos emocionais para um ritmo mais sustentavel.',
        ctaTitle: 'Recuperar energia tambem e parte do tratamento.',
        ctaBody:
          'Com acompanhamento clinico, o retorno ao equilibrio pode ser consistente e realista.',
      },
      emdr: {
        label: 'EMDR para trauma relacional',
        cardDescription:
          'Processamento de memórias dolorosas com base em protocolo estruturado e evidência clínica.',
        title: 'EMDR para trauma relacional e experiencias dolorosas',
        intro:
          'EMDR e uma abordagem terapeutica baseada em evidencia para processar memorias que seguem ativas emocionalmente. O objetivo e reduzir sofrimento e ampliar regulacao interna.',
        forWhoTitle: 'Quando EMDR pode ser indicado',
        forWhoItems: [
          'Memorias intrusivas ou carga emocional intensa associada ao passado.',
          'Padroes repetitivos de medo, culpa ou desvalia em relacoes.',
          'Dificuldade de integrar experiencias traumaticas de forma segura.',
        ],
        approachTitle: 'Como o EMDR entra no seu processo',
        approachText:
          'O EMDR e integrado ao plano terapeutico de forma personalizada. Primeiro consolidamos recursos de estabilizacao e depois avancamos no processamento das memorias-alvo.',
        ctaTitle: 'EMDR funciona melhor quando aplicado no momento certo.',
        ctaBody:
          'A avaliacao inicial ajuda a entender se essa abordagem e indicada para voce agora.',
      },
      'schema-therapy': {
        label: 'Terapia do Esquema',
        cardDescription:
          'Para padrões emocionais e relacionais que se repetem e impactam escolhas, vínculos e autoestima.',
        title: 'Terapia do Esquema para padroes que se repetem',
        intro:
          'A Terapia do Esquema ajuda a compreender por que certos ciclos emocionais se repetem mesmo quando voce tenta agir diferente. O foco e transformar padroes de longa duracao com profundidade.',
        forWhoTitle: 'Quando a Terapia do Esquema e especialmente util',
        forWhoItems: [
          'Relacoes marcadas por medo de abandono, rejeicao ou distancia emocional.',
          'Autocritica intensa, culpa excessiva e exigencia constante.',
          'Sensacao de repetir os mesmos roteiros apesar do esforco para mudar.',
        ],
        approachTitle: 'Como trabalhamos com esquemas',
        approachText:
          'Identificamos esquemas centrais, modos emocionais e necessidades nao atendidas para construir respostas mais maduras, flexiveis e alinhadas ao seu momento de vida.',
        ctaTitle: 'Entender o padrao e o primeiro passo para muda-lo.',
        ctaBody:
          'O processo terapeutico pode abrir espaco para escolhas mais conscientes e relacoes mais saudaveis.',
      },
    },
  },
  en: {
    hub: {
      title: 'Frequent clinical themes',
      description:
        'Examples of themes often addressed in psychotherapy, integrated into your individual process.',
      ctaLabel: 'View full page',
    },
    services: {
      'online-psychotherapy-adults': {
        label: 'Online psychotherapy for adults',
        cardDescription:
          'Psychotherapy for adults living across countries, routines, and time zones with continuity and confidentiality.',
        title: 'Online psychotherapy for adults',
        intro:
          'Online psychotherapy creates a stable therapeutic space even when life is demanding, international, or constantly shifting.',
        forWhoTitle: 'When this format tends to help most',
        forWhoItems: [
          'When you are functioning externally but emotionally overloaded.',
          'When you need consistent care while living between countries.',
          'When you want clinical depth without losing practical flexibility.',
        ],
        approachTitle: 'How the process is structured',
        approachText:
          'Sessions are tailored to your history, current context, and goals. The focus is to combine a strong therapeutic relationship with clear, evidence-based clinical direction.',
        ctaTitle: 'If this resonates, we can begin with one conversation.',
        ctaBody:
          'The first session helps map your current needs and define the best path forward.',
      },
      trauma: {
        label: 'Therapy for trauma',
        cardDescription:
          'For experiences that are in the past, but still active in your body, relationships, and emotional regulation.',
        title: 'Therapy for trauma',
        intro:
          'Trauma is not only what happened, but what remained active afterward. Trauma therapy helps reduce internal threat states, rebuild safety, and interrupt painful relational patterns.',
        forWhoTitle: 'Common signs of unresolved trauma',
        forWhoItems: [
          'Strong emotional reactions in situations that seem minor.',
          'Difficulty trusting, relaxing, or feeling safe in relationships.',
          'Persistent alertness and emotional exhaustion.',
        ],
        approachTitle: 'How trauma is treated in therapy',
        approachText:
          'We combine stabilization work, pattern understanding, and specific methods such as EMDR when appropriate, always respecting your pace and nervous system capacity.',
        ctaTitle: 'You do not have to keep carrying this alone.',
        ctaBody:
          'With the right support, trauma can be processed safely and with lasting change.',
      },
      anxiety: {
        label: 'Psychotherapy for anxiety',
        cardDescription:
          'For a racing mind, a body on alert, and emotional overload that does not switch off.',
        title: 'Psychotherapy for anxiety',
        intro:
          'Anxiety can look like high functioning on the outside and depletion on the inside. Therapy for anxiety helps identify triggers, regulate your nervous system, and reduce internal pressure.',
        forWhoTitle: 'When anxiety support is important',
        forWhoItems: [
          'A constant stream of thoughts and difficulty slowing down.',
          'Persistent worry even when things appear under control.',
          'Sleep disruption, irritability, or feeling chronically on edge.',
        ],
        approachTitle: 'Our clinical approach to anxiety',
        approachText:
          'We work with thought patterns, emotional dynamics, and stress physiology so you can regain clarity, steadiness, and more freedom in daily life.',
        ctaTitle: 'Anxiety treatment becomes effective when it is personalized.',
        ctaBody:
          'A first conversation can clarify which clinical path fits your current needs.',
      },
      burnout: {
        label: 'Online therapy for burnout',
        cardDescription:
          'For chronic exhaustion, loss of meaning at work, and difficulty restoring emotional energy.',
        title: 'Online therapy for burnout',
        intro:
          'Burnout is not weakness. It is a progressive collapse of energy, meaning, and emotional regulation. Therapy helps interrupt overload cycles and rebuild sustainable rhythms.',
        forWhoTitle: 'Frequent signs of burnout',
        forWhoItems: [
          'Persistent exhaustion even after rest.',
          'Emotional detachment from work and loss of motivation.',
          'Difficulty concentrating, irritability, and inner numbness.',
        ],
        approachTitle: 'How we treat burnout',
        approachText:
          'We address over-adaptation and self-pressure patterns, strengthen emotional boundaries, and build practical strategies to recover stability and capacity.',
        ctaTitle: 'Recovery is part of treatment, not a luxury.',
        ctaBody:
          'Clinical support can help you rebuild energy in a realistic and consistent way.',
      },
      emdr: {
        label: 'EMDR for relational trauma',
        cardDescription:
          'Structured trauma processing based on clinical protocol and strong evidence.',
        title: 'EMDR for relational trauma and painful experiences',
        intro:
          'EMDR is an evidence-based therapeutic method to process distressing memories that remain emotionally charged. The goal is to reduce suffering and restore internal regulation.',
        forWhoTitle: 'When EMDR may be indicated',
        forWhoItems: [
          'Intrusive memories or intense emotional charge linked to past events.',
          'Recurring fear, shame, or helplessness in relationships.',
          'Difficulty integrating traumatic experiences in a safe way.',
        ],
        approachTitle: 'How EMDR is integrated in therapy',
        approachText:
          'EMDR is used as part of a personalized clinical plan. We begin with stabilization resources and then move into memory processing when conditions are safe and appropriate.',
        ctaTitle: 'EMDR is most effective when timing is clinically right.',
        ctaBody:
          'An initial assessment helps determine whether EMDR is the best next step for you.',
      },
      'schema-therapy': {
        label: 'Schema Therapy',
        cardDescription:
          'For long-standing emotional and relational patterns that keep repeating.',
        title: 'Schema Therapy for repeating emotional patterns',
        intro:
          'Schema Therapy helps explain why certain emotional cycles keep repeating even when you consciously try to change. The work focuses on deep, long-term pattern transformation.',
        forWhoTitle: 'When Schema Therapy is especially helpful',
        forWhoItems: [
          'Relationship dynamics shaped by abandonment fear, rejection, or emotional distance.',
          'Strong self-criticism, chronic guilt, and relentless standards.',
          'Feeling stuck in familiar patterns despite sustained effort.',
        ],
        approachTitle: 'How schema work is done',
        approachText:
          'We identify core schemas, emotional modes, and unmet needs to support more flexible responses, healthier boundaries, and better relational choices.',
        ctaTitle: 'Naming the pattern is the beginning of changing it.',
        ctaBody:
          'Therapy can help you move from repetition to intentional, healthier choices.',
      },
    },
  },
  es: {
    hub: {
      title: 'Temas clinicos frecuentes',
      description:
        'Ejemplos de temas trabajados en psicoterapia, integrados en tu proceso individual.',
      ctaLabel: 'Ver pagina completa',
    },
    services: {
      'online-psychotherapy-adults': {
        label: 'Psicoterapia online para adultos',
        cardDescription:
          'Acompanamiento psicologico para adultos que viven entre paises, rutinas y husos horarios distintos.',
        title: 'Psicoterapia online para adultos',
        intro:
          'La psicoterapia online ofrece un espacio estable de escucha y trabajo clinico incluso cuando tu vida es exigente, internacional o cambiante.',
        forWhoTitle: 'Cuando este formato suele ayudar mas',
        forWhoItems: [
          'Cuando por fuera todo funciona, pero por dentro hay sobrecarga.',
          'Cuando necesitas continuidad terapeutica viviendo entre paises.',
          'Cuando buscas profundidad clinica con flexibilidad real.',
        ],
        approachTitle: 'Como se estructura el proceso',
        approachText:
          'Las sesiones se ajustan a tu historia, tu momento actual y tus objetivos terapeuticos. El foco es unir vinculo, claridad clinica y trabajo basado en evidencia.',
        ctaTitle: 'Si esto te representa, podemos empezar con una conversacion.',
        ctaBody:
          'La primera sesion permite mapear tu situacion y definir el mejor camino para tu proceso.',
      },
      trauma: {
        label: 'Terapia para trauma',
        cardDescription:
          'Para experiencias que quedaron en el pasado, pero siguen activas en el cuerpo y en las relaciones.',
        title: 'Terapia para trauma',
        intro:
          'El trauma no es solo lo que paso, sino lo que siguio pasando por dentro. La terapia para trauma ayuda a reducir el estado de alerta y recuperar sensacion de seguridad.',
        forWhoTitle: 'Senales frecuentes de trauma no procesado',
        forWhoItems: [
          'Reacciones emocionales intensas ante situaciones cotidianas.',
          'Dificultad para confiar, relajarte o sentirte seguro en vinculos.',
          'Cansancio emocional sostenido y sensacion de hiperalerta.',
        ],
        approachTitle: 'Como trabajamos trauma en terapia',
        approachText:
          'Combinamos regulacion emocional, comprension de patrones y abordajes especificos como EMDR cuando corresponde, siempre respetando tu ritmo.',
        ctaTitle: 'No tienes que seguir sosteniendo esto solo.',
        ctaBody:
          'Con el acompanamiento adecuado, es posible procesar trauma con mas seguridad y estabilidad.',
      },
      anxiety: {
        label: 'Psicoterapia para ansiedad',
        cardDescription:
          'Para mente acelerada, cuerpo en alerta y preocupacion constante.',
        title: 'Psicoterapia para ansiedad',
        intro:
          'La ansiedad puede verse como rendimiento por fuera y agotamiento por dentro. La terapia para ansiedad ayuda a identificar detonantes y recuperar regulacion emocional.',
        forWhoTitle: 'Cuando conviene pedir ayuda por ansiedad',
        forWhoItems: [
          'Pensamientos repetitivos y dificultad para desacelerar.',
          'Preocupacion constante incluso cuando no hay peligro real.',
          'Insomnio, irritabilidad o sensacion de vivir al limite.',
        ],
        approachTitle: 'Nuestro enfoque clinico para ansiedad',
        approachText:
          'Trabajamos patrones cognitivos, respuestas emocionales y activacion corporal para que puedas recuperar claridad, presencia y mayor libertad interna.',
        ctaTitle: 'La ansiedad mejora cuando el tratamiento se ajusta a tu realidad.',
        ctaBody:
          'Una primera conversacion puede ayudarte a definir el enfoque terapeutico mas indicado.',
      },
      burnout: {
        label: 'Terapia online para burnout',
        cardDescription:
          'Para agotamiento cronico, desconexion emocional y perdida de sentido en el trabajo.',
        title: 'Terapia online para burnout',
        intro:
          'El burnout no es falta de capacidad. Es un colapso progresivo de energia, sentido y regulacion emocional. La terapia ayuda a salir del ciclo de sobrecarga.',
        forWhoTitle: 'Indicadores comunes de burnout',
        forWhoItems: [
          'Cansancio persistente aun despues de descansar.',
          'Desconexion del trabajo y baja motivacion.',
          'Dificultad para concentrarte, irritabilidad y vacio emocional.',
        ],
        approachTitle: 'Como trabajamos burnout',
        approachText:
          'Exploramos patrones de autoexigencia y adaptacion excesiva, reforzamos limites y construimos estrategias para recuperar un ritmo mas sostenible.',
        ctaTitle: 'Recuperar energia tambien forma parte del proceso terapeutico.',
        ctaBody:
          'Con acompanamiento clinico, el equilibrio puede reconstruirse de forma realista y sostenida.',
      },
      emdr: {
        label: 'EMDR para trauma relacional',
        cardDescription:
          'Procesamiento de memorias dolorosas con protocolo estructurado y evidencia clinica.',
        title: 'EMDR para trauma relacional y experiencias dolorosas',
        intro:
          'EMDR es un metodo terapeutico basado en evidencia para procesar recuerdos que siguen activando malestar. El objetivo es reducir carga emocional y aumentar regulacion.',
        forWhoTitle: 'Cuando EMDR puede estar indicado',
        forWhoItems: [
          'Recuerdos intrusivos o dolor emocional persistente ligado al pasado.',
          'Patrones de miedo, culpa o desvalorizacion en vinculos.',
          'Dificultad para integrar experiencias traumaticas de forma segura.',
        ],
        approachTitle: 'Como se integra EMDR en el proceso',
        approachText:
          'EMDR se aplica dentro de un plan clinico personalizado. Primero fortalecemos recursos de estabilidad y despues avanzamos al procesamiento de memorias objetivo.',
        ctaTitle: 'EMDR es mas efectivo cuando se aplica en el momento clinico adecuado.',
        ctaBody:
          'La evaluacion inicial permite decidir si esta herramienta es la mejor opcion para ti ahora.',
      },
      'schema-therapy': {
        label: 'Terapia de Esquemas',
        cardDescription:
          'Para patrones emocionales y vinculares repetitivos que impactan autoestima y decisiones.',
        title: 'Terapia de Esquemas para patrones que se repiten',
        intro:
          'La Terapia de Esquemas ayuda a comprender por que ciertos ciclos se repiten aunque intentes cambiarlos. El foco es transformar patrones profundos con trabajo sostenido.',
        forWhoTitle: 'Cuando la Terapia de Esquemas suele ser clave',
        forWhoItems: [
          'Relaciones atravesadas por miedo al abandono, rechazo o distancia.',
          'Autocritica intensa, culpa cronica y exigencia constante.',
          'Sensacion de repetir siempre los mismos guiones emocionales.',
        ],
        approachTitle: 'Como trabajamos en esquema',
        approachText:
          'Identificamos esquemas nucleares, modos emocionales y necesidades no atendidas para ampliar respuestas mas flexibles y construir vinculos mas saludables.',
        ctaTitle: 'Nombrar el patron es el primer paso para transformarlo.',
        ctaBody:
          'La terapia puede ayudarte a salir de la repeticion y elegir con mayor libertad.',
      },
    },
  },
  sv: {
    hub: {
      title: 'Vanliga kliniska teman',
      description:
        'Exempel på teman som ofta behandlas i terapi, integrerat i din individuella process.',
      ctaLabel: 'Läs hela sidan',
    },
    services: {
      'online-psychotherapy-adults': {
        label: 'Onlineterapi för vuxna',
        cardDescription:
          'Psykoterapi för vuxna som lever mellan länder, höga krav och skiftande tidszoner.',
        title: 'Onlineterapi för vuxna',
        intro:
          'Onlineterapi ger ett stabilt terapeutiskt rum även när livet är rörligt, internationellt eller krävande.',
        forWhoTitle: 'När detta upplägg ofta hjälper mest',
        forWhoItems: [
          'När allt fungerar utåt men belastningen är hög inuti.',
          'När du behöver kontinuitet trots flyttar eller resor.',
          'När du vill ha klinisk fördjupning med praktisk flexibilitet.',
        ],
        approachTitle: 'Hur processen läggs upp',
        approachText:
          'Samtalen formas utifrån din historia, din nuvarande situation och dina mål. Fokus ligger på relation, klinisk tydlighet och evidensbaserat arbete.',
        ctaTitle: 'Om det här stämmer in kan vi börja med ett första samtal.',
        ctaBody:
          'Första mötet hjälper oss att kartlägga behov och välja en hållbar behandlingsriktning.',
      },
      trauma: {
        label: 'Terapi vid trauma',
        cardDescription:
          'För erfarenheter som ligger i det förflutna men fortfarande påverkar kroppen och relationer.',
        title: 'Terapi vid trauma',
        intro:
          'Trauma handlar inte bara om vad som hände, utan om vad som fortsatt är aktivt i dig. Traumaterapi syftar till att minska alarmberedskap och återbygga trygghet.',
        forWhoTitle: 'Vanliga tecken på obearbetat trauma',
        forWhoItems: [
          'Starka reaktioner i situationer som verkar små.',
          'Svårt att lita på andra, slappna av eller känna trygghet i relationer.',
          'Långvarig inre stress och emotionell utmattning.',
        ],
        approachTitle: 'Hur vi arbetar med trauma',
        approachText:
          'Vi kombinerar stabilisering, mönsterförståelse och specifika metoder som EMDR när det är lämpligt, alltid med respekt för ditt tempo.',
        ctaTitle: 'Du behöver inte bära detta ensam längre.',
        ctaBody:
          'Med rätt behandling går det att bearbeta trauma på ett tryggt och hållbart sätt.',
      },
      anxiety: {
        label: 'Psykoterapi vid ångest',
        cardDescription:
          'För hög inre stress, ständig oro och ett nervsystem som har svårt att varva ner.',
        title: 'Psykoterapi vid ångest',
        intro:
          'Ångest kan se ut som kontroll utåt och överbelastning inuti. Terapi för ångest hjälper dig att förstå triggarna och återfå känslomässig reglering.',
        forWhoTitle: 'När det är viktigt att söka stöd för ångest',
        forWhoItems: [
          'Tankar som går i hög fart och svårt att komma till ro.',
          'Oro som ligger kvar även när inget akut hot finns.',
          'Sömnsvårigheter, irritation eller känslan av att vara på gränsen.',
        ],
        approachTitle: 'Vårt kliniska arbetssätt vid ångest',
        approachText:
          'Vi arbetar med tankemönster, känsloreglering och kroppens stressrespons så att du kan få mer närvaro, stabilitet och handlingsutrymme.',
        ctaTitle: 'Rätt behandling för ångest ska vara tydlig och personlig.',
        ctaBody:
          'Ett första samtal hjälper oss att välja rätt riktning utifrån din situation.',
      },
      burnout: {
        label: 'Onlineterapi vid burnout',
        cardDescription:
          'För långvarig utmattning, förlorad arbetsglädje och svårighet att återhämta energi.',
        title: 'Onlineterapi vid burnout',
        intro:
          'Burnout är inte brist på vilja. Det är en gradvis kollaps i energi, mening och regleringsförmåga. Terapi hjälper dig att bryta överbelastningsmönster.',
        forWhoTitle: 'Vanliga signaler vid burnout',
        forWhoItems: [
          'Bestående trötthet trots vila.',
          'Emotionell distans till arbete och minskad motivation.',
          'Koncentrationssvårigheter, irritabilitet och inre tomhet.',
        ],
        approachTitle: 'Hur vi behandlar burnout',
        approachText:
          'Vi kartlägger självkritik och överanpassning, bygger tydligare gränser och skapar strategier för ett mer hållbart tempo i vardagen.',
        ctaTitle: 'Återhämtning är en central del av behandlingen.',
        ctaBody:
          'Med kliniskt stöd kan du återbygga energi på ett realistiskt och stabilt sätt.',
      },
      emdr: {
        label: 'EMDR vid relationstrauma',
        cardDescription:
          'Strukturerad bearbetning av smärtsamma minnen med evidensbaserad metod.',
        title: 'EMDR vid relationstrauma och smärtsamma erfarenheter',
        intro:
          'EMDR är en evidensbaserad metod för att bearbeta minnen som fortsätter att väcka starkt obehag. Målet är minskad belastning och bättre reglering.',
        forWhoTitle: 'När EMDR kan vara relevant',
        forWhoItems: [
          'Påträngande minnen eller stark känsloladdning kopplad till det förflutna.',
          'Återkommande rädsla, skam eller hjälplöshet i nära relationer.',
          'Svårt att integrera traumatiska erfarenheter på ett tryggt sätt.',
        ],
        approachTitle: 'Hur EMDR integreras i behandlingen',
        approachText:
          'EMDR används inom en personlig behandlingsplan. Vi börjar med stabilisering och går vidare till minnesbearbetning när förutsättningarna är tillräckligt trygga.',
        ctaTitle: 'EMDR fungerar bäst när timing och upplägg är kliniskt rätt.',
        ctaBody:
          'I en första bedömning ser vi om EMDR är rätt nästa steg för dig.',
      },
      'schema-therapy': {
        label: 'Schematerapi',
        cardDescription:
          'För långvariga emotionella och relationella mönster som upprepar sig.',
        title: 'Schematerapi för återkommande mönster',
        intro:
          'Schematerapi hjälper dig förstå varför vissa mönster återkommer trots att du försöker göra annorlunda. Fokus ligger på varaktig förändring av djupa mönster.',
        forWhoTitle: 'När schematerapi ofta är särskilt hjälpsam',
        forWhoItems: [
          'Relationer präglade av rädsla för övergivenhet, avvisande eller distans.',
          'Hög självkritik, kronisk skuld och ständig självpålagd press.',
          'Känslan av att hamna i samma emotionella loopar om och om igen.',
        ],
        approachTitle: 'Hur vi arbetar med schemafokus',
        approachText:
          'Vi identifierar centrala scheman, emotionella lägen och otillgodosedda behov för att skapa mer flexibla svar och sundare relationella val.',
        ctaTitle: 'När mönstret blir tydligt blir förändring möjlig.',
        ctaBody:
          'Terapi kan hjälpa dig lämna upprepning och välja med större frihet.',
      },
    },
  },
};

export const getServiceContent = (locale, serviceSlug) => {
  const safeLocale = servicePages[locale] ? locale : DEFAULT_LOCALE;
  const services = servicePages[safeLocale].services;

  return services[serviceSlug] ?? null;
};

export const getServicesHubContent = (locale) => {
  const safeLocale = servicePages[locale] ? locale : DEFAULT_LOCALE;
  const { hub, services } = servicePages[safeLocale];

  return {
    ...hub,
    items: Object.entries(services).map(([slug, item]) => ({
      slug,
      anchorId: getServiceAnchorId(slug),
      label: item.label,
      description: item.cardDescription,
      routePath: `/services/${slug}`,
    })),
  };
};
