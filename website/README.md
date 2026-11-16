# ELEVATE Consulting & Recruitment: website

A static site built with Astro and Tailwind CSS. Forms and job listings run on a Google Apps Script backend (see [`../apps-script`](../apps-script/README.md)).

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Where things live

| What | File |
|---|---|
| Company details, phone, email, socials, map, backend URL | `src/config.ts` |
| Pages | `src/pages/*.astro` |
| Founder bios and photos | `src/components/Founders.astro`, shown on the About page (photos go in `src/assets/founders/`); `/founders` redirects to `/about#founders` (`../firebase.json`) |
| Home page photos | `src/assets/home/` (stock photos, sources in `SOURCES.md`; replace with own photos using the same file names) |
| Logo and favicon | `public/logo.png` (header), `public/logo-full.png` (footer, shown white), `public/favicon.png`, `public/og.png` (link preview); original logo file in `brand/` |
| Header, footer, WhatsApp button | `src/layouts/Layout.astro` |
| Form submission logic | `src/scripts/forms.ts` |
| Colours and fonts | `src/styles/global.css` (`@theme`) |

Search for `TODO` to find everything still waiting on the client.

## Deploy (Firebase Hosting)

Hosting settings are in `../firebase.json` (serves `website/dist` at clean URLs: `/about`, not `/about.html`); `../.firebaserc` points at the Firebase project `elevate-cnr`. From the repo root:

```sh
npm --prefix website run build
npx firebase-tools login                 # once, with the ELEVATE Google account
npx firebase-tools deploy --only hosting
```

Domain: in the Firebase console, Hosting → Add custom domain → `elevatecnr.com` (and `www.elevatecnr.com` redirecting to it). In GoDaddy DNS, replace only the `@` A records with the ones Firebase shows and add its `hosting-site=` TXT record. Leave MX, DKIM (`google._domainkey`), DMARC (`_dmarc`) and the existing TXT records alone, because they run the Google Workspace email.

## Before launch

- [x] Logo
- [x] Company email, Instagram, Facebook
- [x] Full address, hours, phone
- [x] Exact Google Maps pin
- [x] WhatsApp on +91 74777 22707
- [ ] Office days, company LinkedIn page (if any)
- [x] Santosh's photos
- [x] Santosh's CV details
- [x] Anand's photo
- [ ] Anand's bio and LinkedIn
- [x] Client OK to show the 6% fee publicly (`employers.astro`)
- [x] Apps Script deployed and `appsScriptUrl` set; all three forms tested end to end (5 Nov)
- [ ] Domain `elevatecnr.com` pointed at the host (`site.url` is already set)
