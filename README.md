# Mingfan Xie - Portfolio Website

Modern, minimalist portfolio website showcasing my work in software engineering and AI systems.

🌐 **Live Site:** https://iiiiviii.github.io/MingfanX.github.io/

## 🚀 Tech Stack

- **React** - UI Framework
- **Lenis** - Buttery smooth scrolling
- **Framer Motion** - Scroll-linked & reveal animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **GitHub Pages** - Hosting

## 🎨 Features

- **Fluid smooth scroll** - Lenis-powered momentum scrolling
- **Horizontal "sliding" project gallery** - Scroll-driven on desktop, stacked on mobile
- **Kinetic typography** - Word-by-word reveals, marquees, animated impact counters
- **Editorial design** - Warm paper palette, grotesque + serif type, custom cursor & grain texture
- **Responsive** - Optimized across desktop and mobile

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── Portfolio.jsx   # Page composition / all sections
│   ├── ui.jsx          # Reusable motion primitives (cursor, reveals, marquee, counters)
│   ├── data.js         # Résumé content (single source of truth)
│   ├── index.js        # Entry point
│   └── index.css       # Design tokens & global styles
├── package.json
└── tailwind.config.js
```

## 🎯 Sections

- **Hero** - Name, role, value proposition
- **About + Impact** - Positioning with animated impact metrics
- **Experience** - Juneng Robotics & Xiaomi (expandable details)
- **Projects** - OfferWise AI & CommuneKit (horizontal slide gallery)
- **Skills + Education** - Toolkit, UCLA & Purdue
- **Contact** - Email, LinkedIn, GitHub, availability

> ✏️ To update content, edit `src/data.js` — no component changes needed.

## 📝 License

MIT License - feel free to use this as inspiration for your own portfolio!

---

Built with 💙 by Mingfan Xie
