---
layout: post
title: "WebSocket tra Flutter e Laravel: la nostra esperienza con Reverb"
date: 2025-03-22
author: "Alexandru Ungureanu"
linkedin: "alexandru-ungureanu-6b83a6235"
tags: [Flutter, Laravel, WebSocket, Open Source]
reading_time: 6
excerpt: "Come abbiamo costruito una comunicazione real-time tra Flutter e Laravel per ActiveAge, e perché abbiamo deciso di rendere open source la libreria."
image: /assets/images/dartflutterreverb.jpeg
---

Qualche mese fa ci siamo trovati di fronte a una di quelle sfide che sembrano semplici sulla carta ma poi ti fanno perdere più tempo del previsto. Stavamo lavorando su [ActiveAge](https://web.activeage.it/), una piattaforma per il benessere degli anziani, e avevamo bisogno di una comunicazione real-time tra la nostra app Flutter e il backend Laravel.

Sì, lo so, websocket è una tecnologia che esiste da anni. Ma quando hai un'app mobile che deve rimanere connessa, gestire riconnessioni automatiche, sincronizzare lo stato e farlo tutto in modo affidabile, beh, le cose si complicano un po'.

## Il problema delle soluzioni esistenti

Laravel Reverb era uscito da poco e ci piaceva molto l'idea di usarlo. È leggero, veloce, si integra perfettamente con l'ecosistema Laravel. Il problema? Le librerie Dart per connettersi a Reverb erano o troppo limitate o troppo complicate per quello che ci serviva.

Ci serviva qualcosa che funzionasse e basta. Qualcosa che gestisse automaticamente le disconnessioni (che su mobile capita spesso), che non perdesse messaggi, che fosse facile da usare per il resto del team.

## Costruire qualcosa di nostro

Così abbiamo iniziato a scrivere la nostra libreria. All'inizio era solo un wrapper attorno ai websocket base di Dart, ma piano piano abbiamo aggiunto tutte quelle piccole cose che fanno la differenza quando lavori in produzione.

La riconnessione automatica con backoff esponenziale, per esempio. Quando l'utente passa sotto una galleria o cambia da wifi a 4G, l'app deve riconnettersi da sola senza che l'utente se ne accorga. Sembra banale, ma gestire tutti i casi edge richiede più codice di quanto pensassi.

```dart
final reverb = ReverbClient(
  host: 'wss://api.activeage.it',
  authEndpoint: '/api/broadcasting/auth',
);

await reverb.connect();

reverb.channel('notifications')
  .listen('NewMessage', (event) {
    // Gestisci il messaggio
  });
```

Volevamo che fosse semplice così. Tre righe di codice e sei connesso. Poi ovviamente sotto il cofano c'è tutta la gestione degli errori, dei timeout, delle riconnessioni, ma l'utente della libreria non deve pensarci.

## Perché open source

Dopo un paio di mesi di utilizzo in test su [ActiveAge](https://web.activeage.it/), la libreria era stabile. Funzionava bene, gestiva tutti i casi che ci interessavano, e onestamente ci sembrava uno spreco tenerla solo per noi.

Non è che sia il miglior codice mai scritto, eh. Ci sono sicuramente modi per migliorarlo, pattern da ottimizzare, edge case che non abbiamo considerato. Ma fa il suo lavoro, e forse può essere utile anche ad altri che si trovano nella nostra stessa situazione.

Quindi l'abbiamo pubblicata. È su [pub.dev](https://pub.dev/packages/laravel_reverb), il codice è su [GitHub](https://github.com/Oltrematica/laravel_reverb), documentato quanto basta per capire come funziona. Se qualcuno vuole usarla, perfetto. Se qualcuno trova bug o ha suggerimenti, ancora meglio.

## Cosa abbiamo imparato

Sviluppare una libreria per il real-time ti insegna ad avere umiltà. Pensavi di aver gestito tutti i casi possibili, poi in produzione scopri che c'è sempre qualcosa che non avevi previsto. Un timeout troppo corto, una race condition nascosta, un evento che arriva nell'ordine sbagliato.

La cosa bella di lavorare su un progetto vivissimo è che abbiamo avuto feedback immediato. Quando qualcosa non funzionava, lo vedevamo subito. E questo ci ha permesso di iterare velocemente, di fixare i problemi appena si presentavano.

## Un pezzo del puzzle

Alla fine, questa libreria è solo un piccolo pezzo del puzzle più grande che è un intero progetto. Ma è un pezzo importante, perché è quello che permette alle notifiche di arrivare in tempo reale, ai messaggi di essere istantanei, all'app di sentirsi reattiva e moderna.

E se può aiutare qualcun altro a costruire qualcosa di utile, beh, questo mi fa piacere. Non è il progetto del secolo, ma è solido, funziona, e risolve un problema concreto. A volte non serve altro.

Se vi capita di lavorare con Flutter e Laravel Reverb, [dateci un'occhiata](https://github.com/Oltrematica/laravel_reverb). E se trovate modi per migliorarla, le pull request sono sempre benvenute. Nel frattempo, noi continuiamo a usarla e a mantenerla su [ActiveAge](https://web.activeage.it/), che è il miglior modo per assicurarsi che continui a funzionare bene.
