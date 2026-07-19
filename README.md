# FoodCheck 🛒

Personal grocery good/bad database. Snap a photo, mark **Good** (whitelist) or **Bad** (blacklist), search it in the store.

**Live app:** https://cnitschelm.github.io/foodcheck/

## Use at the store
- **Search box** — type any part of the name/brand/notes/barcode
- **Chips** — filter All / ✓ Good / ✕ Bad
- Tap a card for photo, notes, and nutrition

## Add an item
1. Tap **＋ Add**
2. **Package photo** — front of the product (becomes the card image)
3. **Barcode photo** — app reads the barcode and auto-fills name, brand, and nutrition from Open Food Facts (or type the barcode number)
4. Toggle **Good** / **Bad**, add notes, save

## Run locally
- Quickest: double-click `index.html` (Chrome/Edge)
- Proper local server (needed for the offline service worker):
  - Windows: `py -m http.server 8000` in this folder, then open http://localhost:8000

## Deploy to GitHub Pages
1. Push this folder to a **public** GitHub repo
2. Repo → Settings → Pages → Source: `main` branch, `/ (root)` → Save
3. Open `https://<user>.github.io/<repo>/` on your phone
4. Phone browser menu → **Add to Home Screen** (works offline in the store)

The app repo contains no personal data — your items live in the browser and (optionally) in your private data repo.

## Cross-device sync (optional)
Data is stored per device (IndexedDB). To sync phone + desktop:

1. Create a **private** repo for data, e.g. `foodcheck-data`
2. GitHub → Settings → Developer settings → Fine-grained tokens → new token:
   - Repository access: **only** `foodcheck-data`
   - Permissions: **Contents: Read and write**
3. In the app: Settings → enter `youruser/foodcheck-data` + token → **Save & test**
4. Repeat step 3 once on each device

Sync runs on app start, after every save, and via the **Sync** button. Devices merge by newest-edit-wins. Photos upload to `data/images/`, item data to `data/items.json`.

**Security note:** the token is stored in the browser only. Scope it to the single data repo so it can't touch anything else.

## Backup
Settings → **Export JSON** (includes photos) / **Import JSON**.

## Stack
Single-file vanilla JS PWA. IndexedDB storage. Barcode: native BarcodeDetector, ZXing fallback. Nutrition: Open Food Facts API. No build step, no server.
