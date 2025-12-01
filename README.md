# Pool-Costs-Calculator

This is a small demo project for a PWA-style Pool Costs Calculator. The repo now includes:

- `index.html` — entry page that registers a `service-worker.js` and links to `manifest.json`.
- `service-worker.js` — a Service Worker to cache main assets for offline functionality.
- `manifest.json` — simple PWA manifest with placeholder icons.
- `icon-generator.html` — a small page which creates two app icons (192×192 and 512×512) and lets you download them.

How to use
1. Open `index.html` in a browser (preferably via `http://` or a local dev server — service workers only work over secure contexts).
2. Click "Open Icon Generator" and click the download buttons to save `icon-192.png` and `icon-512.png`.
3. Optionally replace the icons used in `manifest.json` or place saved images at `./icon-192.png` and `./icon-512.png`.
4. Install the PWA (in supported browsers) or test the offline behavior by disabling network and refreshing the page after the service worker has cached files.

Notes
- The included `manifest.json` uses data-URI placeholders for icons. Replace these with actual files by placing the icon files in the project root or modifying `manifest.json` accordingly.
- Service workers require secure context (https) or `localhost` to work — run a quick local dev server to test, e.g., `python -m http.server`.
