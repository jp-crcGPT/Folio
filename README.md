# Folio

A personal portfolio tracker for Indian stocks and mutual funds, with paper trading. Runs entirely in the browser; data is stored in this browser's local storage and never leaves the phone.

## Put it online (GitHub Pages)

1. Create a new repository and upload every file in this folder to its root.
2. Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.
3. Open `https://<your-username>.github.io/<repo-name>/` in Chrome on your phone → ⋮ menu → **Add to Home screen** → **Install**.

## Prices

- **Mutual funds**: pick the fund from search when adding it; its NAV updates automatically from [MFapi.in](https://www.mfapi.in/).
- **Stocks**: either type prices in **Update prices**, or link a Google Sheet that uses `GOOGLEFINANCE` (steps are in the app under Settings → Automatic prices).

## Backup

Settings → Export backup saves a `.json` file. Import it on any device to restore.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `sw.js` | Offline support |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Install as an app |
| `anek-latin.woff2`, `anek-rupee.woff2`, `OFL.txt` | Anek Latin font by Ek Type (SIL Open Font License) |
