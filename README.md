# 🍿 SnackBox — Snack Ordering Website

A colorful, mobile-friendly snack ordering website with WhatsApp checkout.

## 📁 File Structure

```
snack-shop/
├── index.html      ← Main page
├── style.css       ← All styles
├── app.js          ← Menu data, cart, language, WhatsApp logic
├── README.md       ← This file
└── images/         ← Put your food images here
    ├── chips.jpg
    ├── tempeh.jpg
    ├── cheese-sticks.jpg
    ├── brownies.jpg
    ├── donut.jpg
    ├── mochi.jpg
    ├── lemonade.jpg
    ├── matcha.jpg
    └── milkshake.jpg
```

## 🚀 Setup Steps

### 1. Set Your WhatsApp Number
Open `app.js` and change line 8:
```js
const WHATSAPP_NUMBER = "628123456789";
// Format: country code + number, no + or spaces
// Indonesia example: 6281234567890
```

### 2. Add Your Food Images
- Create an `images/` folder in the project root
- Add your photos with these exact filenames (JPG or PNG):
  `chips.jpg`, `tempeh.jpg`, `cheese-sticks.jpg`, `brownies.jpg`,
  `donut.jpg`, `mochi.jpg`, `lemonade.jpg`, `matcha.jpg`, `milkshake.jpg`
- If an image is missing, an emoji placeholder shows automatically ✅

### 3. Add Your Google Maps Embed
Open `index.html` and find the `<iframe id="mapEmbed">` tag (~line 80).
Replace the `src="..."` value with your actual Google Maps embed URL.

To get your embed link:
1. Go to Google Maps → find your location
2. Click Share → Embed a map → Copy HTML
3. Paste just the `src="..."` URL value into the iframe

### 4. Customize the Menu
Open `app.js` and edit the `menuData` array (starts ~line 20).
Each item has:
- `nameEn` / `nameId` — English and Indonesian names
- `descEn` / `descId` — English and Indonesian descriptions
- `price` — in IDR (numbers only)
- `img` — image path (e.g. `"images/mysnack.jpg"`)
- `emoji` — fallback emoji if image missing
- `category` — `"snack"`, `"sweet"`, or `"drink"`

### 5. Deploy to GitHub Pages
1. Push all files to a GitHub repository
2. Go to **Settings → Pages**
3. Set Source to **Deploy from branch → main → / (root)**
4. Your site will be live at `https://yourusername.github.io/repo-name`

## ✨ Features
- 🌐 One-click English ↔ Indonesian language switch
- 🛒 Shopping cart with quantity controls
- 💰 Auto price calculator in IDR
- 📲 WhatsApp order with pre-filled message
- 📍 Google Maps embed section
- 🎨 Colorful, animated design
- 📱 Mobile responsive

## 💡 Tips
- Recommended image size: **800×600px** or **square 600×600px**
- Use JPG for photos (smaller file size = faster load)
- Test on mobile before going live!
