# Oltrematica Dev Team Website

Sito web ufficiale del team Oltrematica, costruito con Jekyll e Tailwind CSS.

## Caratteristiche

- Design moderno e responsive
- Blog integrato con paginazione
- SEO ottimizzato
- Performance elevate
- Tailwind CSS per styling utility-first
- Componenti riutilizzabili

## Prerequisiti

- Ruby 2.7 o superiore
- Node.js 18 o superiore
- Bundler

## Installazione

### 1. Installa le dipendenze Ruby

```bash
bundle install
```

### 2. Installa le dipendenze Node

```bash
npm install
```

## Sviluppo

### Avvio del server di sviluppo

```bash
# Avvia Jekyll con livereload e Tailwind in watch mode
npm run dev
```

Il sito sarà disponibile su `http://localhost:4000`

### Solo Jekyll (senza Tailwind watch)

```bash
npm run serve
```

### Solo compilazione CSS

```bash
npm run watch:css
```

## Build per Produzione

```bash
npm run build
```

Questo comando:
1. Compila e minifica il CSS con Tailwind
2. Genera il sito statico in `_site/`

## Struttura del Progetto

```
/
├── _config.yml              # Configurazione Jekyll
├── _data/                   # Dati strutturati
│   ├── navigation.yml       # Menu di navigazione
│   └── services.yml         # Servizi offerti
├── _includes/               # Componenti riutilizzabili
│   ├── components/          # Componenti atomici
│   ├── head.html           # SEO e meta tags
│   ├── header.html         # Header del sito
│   ├── navigation.html     # Menu di navigazione
│   ├── footer.html         # Footer
│   ├── hero-section.html   # Sezione hero
│   ├── services-grid.html  # Griglia servizi
│   └── blog-preview.html   # Anteprima blog
├── _layouts/                # Template di pagina
│   ├── default.html        # Layout base
│   ├── home.html           # Layout homepage
│   ├── post.html           # Layout articolo blog
│   └── blog.html           # Layout lista blog
├── _posts/                  # Articoli del blog
├── assets/                  # Asset statici
│   ├── css/
│   │   └── main.css        # CSS con Tailwind
│   ├── js/
│   └── images/             # Immagini
├── blog/                    # Sezione blog
│   └── index.html          # Pagina lista articoli
├── index-new.html          # Nuova homepage
├── Gemfile                 # Dipendenze Ruby
├── package.json            # Dipendenze Node
└── tailwind.config.js      # Configurazione Tailwind
```

## Creazione di Contenuti

### Nuovo Post del Blog

Crea un nuovo file in `_posts/` con il formato: `YYYY-MM-DD-titolo.md`

```markdown
---
layout: post
title: "Titolo del Post"
date: 2025-01-15
author: "Nome Cognome"
tags: [tag1, tag2, tag3]
reading_time: 5
excerpt: "Breve descrizione del post"
image: /assets/images/post-image.jpg
---

Contenuto del post in markdown...
```

### Aggiungere un Servizio

Modifica `_data/services.yml`:

```yaml
- title: "Nome Servizio"
  description: "Descrizione del servizio"
  icon: '<path stroke-linecap="round"...></path>'
  features:
    - "Feature 1"
    - "Feature 2"
    - "Feature 3"
```

## Deployment

### GitHub Pages

1. Esegui il build: `npm run build`
2. Commit e push su GitHub
3. Configura GitHub Pages per usare la branch `main` e la cartella `_site/`

### Netlify

1. Collega il repository
2. Comando build: `npm run build`
3. Directory publish: `_site`

### Vercel

1. Importa il repository
2. Framework preset: Jekyll
3. Build command: `npm run build`
4. Output directory: `_site`

## Personalizzazione

### Colori

Modifica i colori brand in `tailwind.config.js`:

```javascript
colors: {
  'brand-primary': '#1e40af',
  'brand-secondary': '#64748b',
  'brand-accent': '#3b82f6'
}
```

### Configurazione Sito

Modifica `_config.yml` per cambiare:
- Titolo e descrizione
- URL del sito
- Link social
- Informazioni di contatto

### Fonts

I fonts sono caricati da Google Fonts in `_includes/head.html`. Puoi modificare il font in:
1. `_includes/head.html` (link Google Fonts)
2. `tailwind.config.js` (configurazione font family)

## Plugin Jekyll Utilizzati

- **jekyll-paginate**: Paginazione blog
- **jekyll-sitemap**: Sitemap XML automatica
- **jekyll-seo-tag**: Meta tags SEO automatici
- **jekyll-feed**: RSS feed automatico

## Performance

Il sito è ottimizzato per:
- Caricamento veloce (< 1s)
- SEO (100/100 su Lighthouse)
- Accessibilità (WCAG 2.1)
- Best practices

## Browser Support

- Chrome (ultime 2 versioni)
- Firefox (ultime 2 versioni)
- Safari (ultime 2 versioni)
- Edge (ultime 2 versioni)

## Licenza

MIT License - vedi LICENSE per dettagli

## Contatti

- Email: devteam@oltrematica.it
- Website: https://oltrematica.dev
- GitHub: https://github.com/Oltrematica

---

Realizzato con ❤️ dal team Oltrematica usando Jekyll e Tailwind CSS
