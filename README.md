# FoodCheck 🛒

Personal grocery good/bad database. Snap a photo, mark **Good** (whitelist) or **Bad** (blacklist), search it in the store.

**Live app:** https://cnitschelm.github.io/foodcheck/

## Use at the store
- **Search box** — type any part of the name/brand/notes/barcode
- **Chips** — filter All / ✓ Good / ✕ Bad
- Tap a card for photo, notes, and nutrition

## Quick check (nothing saved) 🔍
For something you haven't bought — "is this actually healthy?" in the aisle.

1. Tap **🔍 Check** in the bottom bar
2. Snap the **front** and/or the **barcode / label** — or just type the barcode number
3. Tap **Check it**

You get a verdict banner (Great choice → Avoid), the 1–5 star rating, why it scored that way, and the full nutrition table. **Nothing is written to your database** — no item, no photo, no sync. If it turns out to be a keeper, tap **Save as Good / Save as Bad** on the result and it drops into the normal add form already filled in.

If it can't identify the product (no barcode match, no AI key), you can type the numbers off the label yourself and it rates them on the spot — still without saving.

## Add an item
1. Tap **＋ Add**
2. **Package photo** — front of the product (becomes the card image)
3. **Barcode photo** — app reads the barcode and auto-fills name, brand, and nutrition from Open Food Facts (or type the barcode number)
4. Toggle **Good** / **Bad**, add notes, save

## Your own list (for someone new)
A new phone opens on a short setup screen: type a name, paste a free AI key (optional), and tap **Start**. That person gets a separate list of their own — nothing is shared with anyone else's list.

- **AI key (optional, free):** aistudio.google.com/apikey → Create API key. It lets a photo fill in the product; without it, barcode lookup and typing still work. It can be added later in Settings.
- **iPhone:** add the app to the home screen first and set it up from the icon — the icon and Safari keep separate data.
- **Saved on that phone only:** no syncing and no online backup. Settings → **Download backup** saves a copy.
- Their phone shows nothing about syncing: no Sync button, and Settings shows just the name, the AI key, and the backup file.
- Invited people and the owner's own phones tap **Invited or already set up? Sign in** on the setup screen.

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

## AI auto-fill (optional)
Add an AI key in Settings → AI auto-fill. Two options, auto-detected by key format:
- **Google Gemini** (free, no card): aistudio.google.com → Get API key (`AIza…`)
- **Anthropic** (pay-per-use): console.anthropic.com (`sk-ant…`)

A front-of-package photo is enough — AI identifies the product and fills typical nutrition values (marked as estimate); if the nutrition label is in the shot it reads exact values. You just pick Good/Bad and save. Key stays in the browser.

## Backup
Settings → **Export JSON** (includes photos) / **Import JSON**.

## Stack
Single-file vanilla JS PWA. IndexedDB storage. Barcode: native BarcodeDetector, ZXing fallback. Nutrition: Open Food Facts API. No build step, no server.
