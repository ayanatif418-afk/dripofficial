# DRIP — INDUSTRIAL ROYALTY

Premium streetwear e-commerce website built with vanilla JavaScript, HTML, and CSS.

## 🎨 Design Philosophy

**CRAFTED FOR THE EMPIRE.**

This website embodies industrial luxury with:
- **Obsidian Black** (#0A0A0A) — Primary background
- **Empire Gold** (#D4AF37) — CTAs, highlights, accents
- **Concrete Grey** (#E0E0E0) — Secondary text
- **Surgical White** (#FFFFFF) — Headlines
- **Urgency Red** (#FF3333) — Stock timers only

## 🚀 Features

### Home Page (index.html)
- **Liquid Vault Navigation**: Glassmorphic floating navbar that morphs on scroll
- **Hero Slider**: Manual cinematic transitions between three drops
- **Featured Carousel**: Horizontal scrolling product showcase
- **About Section**: Brand philosophy and purpose
- **Responsive Footer**: Complete site navigation and social links

### Products Page (products.html)
- **Advanced Filtering**: Collection, Weight, Fit, Price, Availability
- **Sorting Options**: Price (Low/High), Name (A-Z/Z-A)
- **Product Grid**: 12 curated products with hover animations
- **Stock Urgency**: Live countdown timers for limited items
- **Quick View Modal**: Instant product details without page reload

### Universal Features
- **Shopping Cart**: Glassmorphic dropdown with live updates
- **WhatsApp Integration**: Direct checkout to +92 335 2723423
- **Local Storage**: Cart persists across sessions
- **Smooth Animations**: Apple-style easing throughout
- **Dark Mode**: Pure obsidian black — no white flashes

## 📁 File Structure

```
drip-website/
├── index.html          # Homepage
├── products.html       # Products catalog
├── styles.css          # Complete styling
├── script.js           # Homepage JavaScript
├── products.js         # Products page JavaScript
└── README.md           # This file
```

## 🛠️ Setup

1. Open the `drip-website` folder
2. Open `index.html` in a modern browser
3. No server required — pure vanilla JavaScript

## 💡 Key Interactions

### Navigation
- Scroll to see navbar morph from pill to notch
- Hover menu items for smooth transitions
- Cart icon shows live item count

### Hero Section
- Click DROP I/II/III buttons to change slides
- Smooth cinematic fade transitions
- No auto-play — user control only

### Products
- Hover cards for gold outline and zoom
- Click "QUICK VIEW" for modal preview
- Click "ADD TO VAULT" to add to cart
- Filter by multiple criteria simultaneously
- Sort products dynamically

### Cart
- Auto-opens briefly when adding items
- Click outside to close
- WhatsApp button formats order message
- Persists using localStorage

## 🎯 Brand Voice

- **Confident, not cocky**
- **Craft over hype**
- **Quality over quantity**
- **Empire over masses**

## 📱 Responsive Breakpoints

- Desktop: Full experience (1200px+)
- Tablet: Stacked filters (768px-1200px)
- Mobile: Optimized layout (<768px)

## 🔧 Customization

### Update Products
Edit the `allProducts` array in `products.js`:
```javascript
{
    id: 13,
    name: 'YOUR PRODUCT',
    price: 0000,
    image: 'url',
    badge: 'NEW DROP',
    stock: 10,
    collection: 'essentials',
    weight: 'winter',
    fit: 'oversized',
    availability: 'available'
}
```

### Change WhatsApp Number
Update in both `script.js` and `products.js`:
```javascript
const whatsappNumber = '923352723423'; // Your number
```

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --obsidian-black: #0A0A0A;
    --empire-gold: #D4AF37;
    --concrete-grey: #E0E0E0;
    --surgical-white: #FFFFFF;
    --urgency-red: #FF3333;
}
```

## 📊 Tech Stack

- **HTML5**: Semantic structure
- **CSS3**: Modern features (Grid, Flexbox, Animations)
- **JavaScript ES6+**: Clean, modular code
- **Google Fonts**: League Spartan, Space Mono, Cinzel
- **No frameworks**: Pure vanilla implementation

## 🎨 Typography

- **League Spartan** (Extra Bold): Headlines, nav, buttons
- **Space Mono** (Regular): Body text, specs, filters
- **Cinzel** (Accent): Prestige labels (EST. 2026, etc.)

## 🔥 Performance

- No jQuery or heavy frameworks
- Minimal dependencies (only fonts)
- Optimized animations with GPU acceleration
- Efficient event delegation
- LocalStorage for cart persistence

## 📞 Contact Integration

All WhatsApp messages pre-format to:
```
Hello! I want to order:

PRODUCT NAME x1 - Rs. X,XXX

Total: Rs. X,XXX
```

## 🚧 Future Enhancements

- Add real product images
- Implement size selection
- Add checkout page
- Email newsletter integration
- Customer gallery ("Tagged by the Empire")
- Backend API integration

## 📝 License

© DRIP 2026 — INDUSTRIAL ROYALTY

---

**Built with precision. No templates. No mass-market energy.**

*Only Industrial Royalty.*
