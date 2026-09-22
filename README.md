# Always, you.

A personal romantic site for Golu, designed for everyday visits. Plain HTML, CSS and JavaScript, with no build step or package installation. The existing Vercel static deployment can serve the repository root.

## Preview locally

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this folder, then open http://127.0.0.1:4173.

## Personal details

- The relationship start date remains 12 March 2025 at 00:00 UTC, as recorded in the previous site.
- Letters, daily notes and date ideas are in `script.js`. Visible headings and photo captions are in `index.html`.
- Daily notes and the anniversary calendar use Europe/London dates. There are 31 notes in a repeating daily rotation; the button can reveal more immediately.
- Three AI-created imagined scenes are in `images/`: a Lake Como proposal, a wedding portrait and a camping trip. The page labels them as imagined and opens them in a keyboard-accessible image viewer.
- All five existing couple photographs are retained. The standalone cat illustration remains in the repository but is unused.
- The main letter and three “open when” letters use native dialogs. Escape, the close button and an outside click close them. The previous focus is restored.
- A saved date idea stays in that browser on that device. It is not sent to another person or synchronised between devices. Storage errors are handled without breaking the rest of the page.
- Reduced-motion preferences disable entrance and flip animations. Interactive elements support keyboards and touch.
- Search engines are asked not to index the page. That is not access control: the existing public repository and website remain public.

## Deploy

Merge the reviewed branch into the branch connected to Vercel. No environment variables, paid services or external APIs are needed. Google Fonts is optional; local serif and sans-serif fallbacks are provided.
