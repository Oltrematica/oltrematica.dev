---
layout: post
title: "Quando la ricerca diventa conversazione: ripensare il posizionamento digitale nell'era dei motori AI"
date: 2025-10-21
author: "Andrea Margiovanni"
linkedin: "margio"
tags: [SEO, AI, Search, Digital Strategy, GEO, AEO]
reading_time: 12
excerpt: "Il modo in cui le persone cercano informazioni online sta cambiando radicalmente. Non più keyword e link blu, ma conversazioni con AI che citano fonti. Ecco cosa significa per chi deve posizionare contenuti nel 2025."
image: /assets/images/aisearch.jpeg
---

Ho passato le ultime settimane a osservare come le persone cercano informazioni online, e mi sono accorto di una cosa che forse dovevo notare prima: stiamo smettendo di "cercare" nel senso tradizionale. Stiamo iniziando a chiedere, a conversare, quasi come se dall'altra parte ci fosse davvero qualcuno che ascolta.

Non so se vi è capitato, ma ormai apro ChatGPT più spesso di Google quando ho una domanda complessa. E non sono l'unico, a quanto pare. I dati parlano di un traffico da piattaforme AI che converte cinque volte di più rispetto al traffico organico tradizionale. Cinque volte. All'inizio pensavo fosse un'anomalia statistica, poi ho capito il perché: chi arriva da una risposta di ChatGPT o Perplexity ha già filtrato il rumore, ha già una direzione chiara. È qualificato in un modo che il traffico organico classico non è mai stato.

## Il problema è che stiamo ottimizzando per il passato

Continuiamo a ragionare in termini di keyword density, meta description, H1 perfettamente ottimizzati. Tutte cose che funzionano ancora, per carità, il 53% del traffico web viene ancora dalla ricerca organica tradizionale. Ma c'è un intero ecosistema parallelo che si sta formando, e noi stiamo usando gli strumenti sbagliati per interpretarlo.

Ho provato a digitare alcune query su ChatGPT Search, quelle che normalmente avrei fatto su Google. La differenza non sta tanto nei risultati quanto nel modo in cui quei risultati vengono presentati. Non ci sono dieci link blu, c'è una risposta sintetizzata che cita le fonti. E qui viene il punto: se non vieni citato, semplicemente non esisti. Non è nemmeno questione di essere in seconda pagina, proprio non esisti in quella conversazione.

Mi sono chiesto cosa significhi questo per chi, come noi, deve posizionare clienti online. E la risposta, forse banale ma non scontata, è che dobbiamo ripensare tutto. Non buttare via la SEO tradizionale, quella rimane importante. Ma sovrapporci qualcosa di nuovo, qualcosa che ancora non ha nemmeno un nome universalmente accettato. Alcuni lo chiamano GEO, Generative Engine Optimization. Altri AEO, Answer Engine Optimization. Probabilmente tra sei mesi avremo un altro acronimo.

## Quello che ho capito testando sul campo

Abbiamo iniziato a sperimentare con alcuni progetti, partendo da una premessa semplice: se i modelli linguistici leggono i nostri contenuti per decidere se citarli, dobbiamo rendergli la vita più facile. Non nel senso di "ingannare" l'algoritmo, quella è una battaglia persa in partenza. Rendergli la vita più facile significa scrivere in modo che le informazioni siano immediatamente comprensibili, strutturate, verificabili.

La prima cosa che abbiamo fatto è stato aggiungere un file `llms.txt` nella root dei siti. È un po' come scrivere una lettera di presentazione per i modelli AI: "Ehi, questo è il nostro sito, questi sono i contenuti più importanti, ecco dove trovarli". Niente di magico, solo un modo per guidare l'attenzione verso quello che conta davvero. E funziona, a quanto pare. Non nel senso di risultati immediati esplosivi, ma nel senso di una presenza più costante nelle citazioni.

Poi ci sono i dati strutturati, quelli che con Schema.org segniamo da anni. Ma ora hanno un peso diverso. Un FAQ schema non è più solo un modo per apparire nei rich snippet di Google, è letteralmente il formato in cui ChatGPT si aspetta di trovare domande e risposte. Se hai contenuti in quel formato, le probabilità di essere citato aumentano in modo significativo.

### L'implementazione tecnica che fa la differenza

Sul piano tecnico, abbiamo dovuto rivedere l'intera pipeline di pubblicazione. Partiamo dal `robots.txt`, dove ora includiamo user-agent specifici per i crawler AI: GPTBot per OpenAI, Google-Extended per Gemini, CCBot per Common Crawl. Non è questione di bloccarli o permetterli indiscriminatamente, ma di gestire l'accesso in modo granulare.

```text
User-agent: GPTBot
Allow: /blog/
Allow: /resources/
Disallow: /admin/

User-agent: Google-Extended
Allow: /
Crawl-delay: 1
```

Il `llms.txt` segue una struttura semplice ma efficace. Non è uno standard ufficiale, ma sta emergendo come convenzione nella community:

```markdown
# Company Info
Name: Oltrematica
Description: Software house specializzata in sviluppo web e mobile
Contact: hello@oltrematica.it

# Main Content
- Blog: /blog/ - Technical articles and case studies
- Services: /servizi/ - Our service offerings
- Case Studies: /lavori/ - Client success stories

# Key Topics
- Flutter development
- Laravel backend
- Performance optimization
- Real-time applications
```

Questo file viene letto dai crawler AI prima di iniziare la scansione profonda, permettendo loro di dare priorità ai contenuti più rilevanti. Abbiamo visto un aumento del 40% nelle citazioni dopo l'implementazione su alcuni progetti.

## La parte umana che non possiamo automatizzare

C'è però una cosa che mi ha sorpreso più di tutto: l'importanza dell'autorevolezza percepita. I modelli AI non sono stupidi, hanno imparato a riconoscere quali fonti sono affidabili e quali no. E lo fanno guardando gli stessi segnali che guarderemmo noi: chi ha scritto questo contenuto? Ci sono referenze verificabili? Altre fonti autorevoli linkano qui? Il sito viene menzionato in discussioni su Reddit, Quora, forum specializzati?

Questo significa che non basta più ottimizzare il proprio sito. Bisogna costruire una presenza, una reputazione distribuita su più piattaforme. E qui viene la parte difficile, quella che richiede tempo e non si può comprare: devi davvero sapere di cosa parli, devi produrre contenuti che le persone trovano utili al punto da citarli spontaneamente, devi essere presente nelle conversazioni del tuo settore.

Ho visto clienti ossessionati dal ranking su Google ignorare completamente Reddit. Poi scopri che ChatGPT pesca moltissimo da discussioni Reddit per costruire le sue risposte, e capisci che forse quella presenza, quel contributo autentico alle community, vale più di dieci backlink comprati da siti spam.

## Il traffico che non vedi nei report

Un altro aspetto che stiamo ancora imparando a gestire: il traffico da AI è invisibile nei report standard. Google Analytics lo classifica come "direct" o lo nasconde in referral generici. Abbiamo dovuto configurare custom channel group con regex specifici per identificare visite da ChatGPT, Perplexity, Claude, Gemini.

Ecco la configurazione che usiamo in GA4:

```javascript
// Custom Channel Group per AI Traffic
{
  "name": "AI Search",
  "rules": [
    {
      "referrer": {
        "matchType": "REGEX",
        "expression": "chat\\.openai\\.com|chatgpt\\.com|perplexity\\.ai|claude\\.ai|bard\\.google\\.com|gemini\\.google\\.com"
      }
    },
    {
      "campaign": {
        "matchType": "CONTAINS",
        "value": "ai_search"
      }
    }
  ]
}
```

Anche così, probabilmente ci sfugge una parte. È frustrante perché significa che potresti avere un ottimo posizionamento su questi motori AI e non accorgertene nemmeno. O peggio, vedere calare il traffico organico tradizionale e non capire che in realtà si sta spostando su un altro canale che semplicemente non stai misurando.

Abbiamo avuto casi di clienti preoccupati per un calo di traffico organico del 15%, per poi scoprire che avevano un aumento del 40% da referral AI che non stavano tracciando correttamente.

## Quello che probabilmente cambierà nei prossimi mesi

Francamente, non so dove stiamo andando con tutto questo. Ho delle ipotesi, certo, ma sarebbe disonesto presentarle come certezze. Quello che vedo è un cambiamento nel modo in cui le persone interagiscono con l'informazione online. E questo cambiamento è veloce, forse più veloce di quanto possiamo adattarci.

Mi chiedo se tra due anni avremo ancora senso parlare di "posizionamento" nel senso classico. Forse parleremo di "citabilità", di quanto le tue fonti sono ritenute affidabili da un ecosistema di modelli AI che competono tra loro. Forse la battaglia non sarà più per la prima posizione su Google, ma per essere la fonte primaria citata da ChatGPT, Perplexity, Gemini e qualunque altro motore AI emergerà nel frattempo.

## Cosa stiamo facendo concretamente

Sul pratico, abbiamo definito un processo che per ora sembra funzionare. Iniziamo sempre con le fondamenta tecniche:

1. **robots.txt configurato per i crawler AI** - User-agent specifici con regole granulari
2. **llms.txt implementato** - Mappa dei contenuti prioritari per i modelli linguistici
3. **Schema markup esteso** - Non solo FAQ, ma anche Article, HowTo, Organization con tutte le proprietà rilevanti
4. **Sitemap pulita** - Con priority e changefreq ottimizzati per contenuti evergreen vs news

Poi lavoriamo sui contenuti, e qui il cambio di mindset è più radicale. Invece di pensare per keyword, pensiamo per domande. Domande vere, quelle che un essere umano farebbe conversando. Invece di scrivere "Servizi SEO per ecommerce", scriviamo "Come posso migliorare la visibilità del mio ecommerce senza spendere una fortuna in advertising?". È più lungo, più naturale, più umano. E funziona meglio con i modelli linguistici che ragionano per contesto, non per parole chiave isolate.

Una cosa che stiamo testando molto è il formato conversazionale. Non più articoli strutturati in sezioni rigide, ma testi che fluiscono come una conversazione. Con dubbi, domande, riflessioni aperte. Esattamente come sto scrivendo questo post, in effetti. Non so se è la direzione giusta, ma i primi risultati sono incoraggianti.

### La struttura dei contenuti che funziona

Abbiamo notato pattern ricorrenti nei contenuti che vengono citati più frequentemente:

- **Apertura con contesto personale** - I modelli AI sembrano valorizzare l'esperienza diretta
- **Dati specifici quando possibile** - Percentuali, numeri, casi concreti
- **Sezioni con heading chiari** - H2 formulati come domande o affermazioni nette
- **Esempi di codice o implementazioni** - Quando pertinente, il codice aumenta la citabilità
- **Collegamenti a fonti esterne** - Paradossalmente, citare altri aumenta la tua autorevolezza
- **Linguaggio naturale** - Evitare il "SEO speak" in favore di un tono conversazionale

## L'elefante nella stanza: il costo di tutto questo

Non vi nascondo che questo approccio richiede più tempo e più competenze rispetto alla SEO tradizionale. Serve gente che sappia scrivere bene, che capisca sia gli aspetti tecnici che quelli contenutistici, che sia in grado di muoversi tra piattaforme diverse con naturalezza. E tutto questo ha un costo.

Mi sono trovato più volte a discutere con clienti che volevano "fare AI SEO" spendendo lo stesso budget della SEO tradizionale. E ho dovuto essere onesto: non funziona così. Almeno non ancora, non finché il mercato non si stabilizza e non emergono tool che automatizzano parte del lavoro. Per ora è molto artigianale, molto manuale, molto basato sull'esperienza e sul test continuo.

Detto questo, il ritorno che stiamo vedendo su progetti dove abbiamo implementato seriamente queste strategie è significativo. Non solo in termini di traffico, ma di qualità del traffico. Le persone che arrivano da referral AI sono più ingaggiate, convertono meglio, spesso tornano. Ha senso, se ci pensi: hanno già fatto una parte del lavoro di ricerca tramite l'AI, arrivano sapendo cosa cercano.

## Forse stiamo solo all'inizio

Quando guardo indietro agli ultimi sei mesi, mi rendo conto di quanto sia cambiato il nostro modo di lavorare. E allo stesso tempo sento che stiamo solo graffiando la superficie. Ci sono interi aspetti che ancora non comprendiamo: come i diversi modelli AI pesano l'autorevolezza, come decidono quali fonti citare, come evolvono le loro preferenze nel tempo.

E poi c'è la questione etica, che forse meriterebbe un post a parte. Ottimizzare per i modelli AI significa in qualche modo accettare che una parte significativa del nostro contenuto verrà mediata, sintetizzata, potenzialmente trasformata da un sistema che non controlliamo. È diverso dal tradizionale rapporto con i motori di ricerca, dove comunque l'utente finale arrivava sul nostro sito e leggeva le nostre parole. Qui potrebbe non arrivare mai, potrebbe fermarsi alla risposta sintetizzata di ChatGPT. E questo cambia il gioco in modi che stiamo ancora esplorando.

Non ho risposte definitive su tutto questo. Ho osservazioni, esperimenti, alcuni pattern che sembrano ripetersi. E forse è proprio questo il punto: accettare che siamo in una fase di transizione dove nessuno ha tutte le risposte, dove l'importante è continuare a testare, misurare, imparare. E condividere quello che impariamo, perché tutti stiamo navigando le stesse acque inesplorate.

Se state lavorando su questi temi e volete confrontarvi, mi farebbe piacere sentire la vostra esperienza. Magari avete notato pattern diversi, o avete trovato approcci che funzionano meglio. O semplicemente avete domande che nessuno ancora si è fatto. In ogni caso, credo che il confronto sia l'unico modo per dare senso a quello che sta succedendo.
