# Always, you.

A candlelit romantic site for Golu, designed for everyday visits. The wide cover photo switches to the supplied portrait on phones. Plain HTML, CSS and JavaScript, with no build step or package installation. The existing Vercel static deployment can serve the repository root.

## Preview locally

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this folder, then open http://127.0.0.1:4173.

## Personal details

- The relationship start date remains 12 March 2025 at 00:00 UTC, as recorded in the previous site.
- Letters, daily notes and date ideas are in `script.js`. Visible headings and photo captions are in `index.html`.
- Daily notes and the anniversary calendar use Europe/London dates. There are 31 notes in a repeating daily rotation; the button can reveal more immediately.
- Three AI-created imagined scenes are in `images/`: a Lake Como proposal, a wedding portrait and a camping trip. The page uses the revised `proposal-smiling.png`, `wedding-smiling.png` and `camping-smiling.png` portraits with warmer expressions. Earlier versions remain in the repository. The page labels the scenes as imagined and opens them in a keyboard-accessible image viewer.
- The two supplied candlelit images are in `images/candlelit-wide.jpg` and `images/candlelit-portrait.jpg`. Originals are copied without editing.
- The four original album pictures open at full size with their captions. The fifth original photograph remains in the repository. The standalone cat illustration remains in the repository but is unused.
- All letters open as an envelope with a G & S wax seal. Activating the seal reveals the letter inside the same native dialog. Escape, the close button and an outside click close them. The previous focus is restored.
- The Open when collection contains 12 letters. Nine extra envelopes sit inside a keyboard-accessible expandable collection, covering sleep, self-doubt, celebrations, hugs, the future, disagreements, flirting, mornings and reassurance.
- A saved date idea stays in that browser on that device. It is not sent to another person or synchronised between devices. Storage errors are handled without breaking the rest of the page.
- Reduced-motion preferences disable letter and hover animations. Interactive elements support keyboards and touch.
- Search engines are asked not to index the page. That is not access control: the existing public repository and website remain public.

## Games

Truth or Dare, Same Wavelength and Date Roulette each have Sweet and A little naughty modes. Prompts live in `game-data.mjs`; the interface is handled by `games.mjs`. Switching moods starts a fresh round. Answers stay in memory for the current visit and are never saved or sent anywhere. Each game supports skipping without a penalty.

A little naughty mode also reveals two fully clothed AI couple portraits: a candlelit slow dance and a rooftop whisper. Each has a matching dare and opens in the existing image viewer. Switching back to Sweet hides that gallery; it is a display preference, not access control.

Run `node --test tests/games.test.mjs` to check deck cycling, turn-taking, scoring and roulette selection.

## Deploy

Merge the reviewed branch into the branch connected to Vercel. No environment variables, paid services or external APIs are needed. Google Fonts is optional; local serif and sans-serif fallbacks are provided.
