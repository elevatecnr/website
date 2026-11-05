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
| Founder bios and photos | `src/pages/founders.astro` (photos go in `src/assets/founders/`) |
| Logo and favicon | `public/logo.png` (header), `public/logo-full.png` (footer, shown white), `public/favicon.png`, `public/og.png` (link preview); original logo file in `brand/` |
| Header, footer, WhatsApp button | `src/layouts/Layout.astro` |
| Form submission logic | `src/scripts/forms.ts` |
| Colours and fonts | `src/styles/global.css` (`@theme`) |

Search for `TODO` to find everything still waiting on the client.

## Deploy (Netlify)

Build settings are in `../netlify.toml` (base `website`, command `npm run build`, publish `dist`, Node 24). Connect the GitHub repo in Netlify and every push to `main` deploys automatically.

Then point `elevatecnr.com` at Netlify in GoDaddy DNS: change only the `@` A record and the `www` CNAME. Leave the MX/TXT records alone, because they run the Google Workspace email.

## Before launch

- [x] Logo
- [x] Company email, Instagram, Facebook
- [x] Full address, hours, phone
- [ ] Exact Google Maps pin (currently found by address search), office days, WhatsApp on +91 74777 22707, company LinkedIn page (if any)
- [x] Santosh's photos
- [x] Santosh's CV details
- [ ] Anand's photo and bio
- [ ] Client OK to show the 6% fee publicly (`employers.astro`)
- [x] Apps Script deployed and `appsScriptUrl` set; all three forms tested end to end (5 Nov)
- [ ] Domain `elevatecnr.com` pointed at the host (`site.url` is already set)
