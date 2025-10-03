# 🛠️ Tech Stack Deep Dive

> Comprehensive overview of technologies, patterns, and architectural decisions

---

## 🏗️ Core Technologies

### Frontend Framework
- **React 19.1.1** — Latest React with concurrent features
  - Modern hooks API (useState, useEffect, useCallback, useMemo)
  - Custom hooks for game logic separation
  - React.memo for performance optimization
  
### Routing
- **React Router 7.9.0** — Client-side navigation
  - SPA routing with history API
  - 404 fallback handling for GitHub Pages
  - Navigation component abstraction

### Internationalization
- **react-i18next 16.0.0** — Translation management
  - 3 languages: English, Russian, French
  - localStorage persistence for language preference
  - Custom pluralization rules for Russian grammar
  
### Build Tools
- **Webpack 5.101.3** — Module bundling
  - Code splitting by route and vendor
  - Tree shaking for unused code elimination
  - Asset optimization (images, fonts, SVGs)
  - Source maps for debugging

---

## 🎨 CSS Architecture

### Design System
- **CSS Custom Properties** (CSS Variables)
  - Design tokens for colors, spacing, typography
  - Dynamic theming support
  - Consistent visual language

### Methodology
- **BEM-inspired** naming conventions
- **Mobile-first** responsive design
- **Component-scoped** styles

### Layout Techniques
- **CSS Grid** for card layouts
- **Flexbox** for navigation and headers
- **CSS Containment** for rendering optimization

### Animations
- **Hardware-accelerated** 3D transforms
  - `transform: rotateY()` for card flips
  - `will-change` for optimized animations
  - `backface-visibility: hidden` for smooth transitions

---

## ⚡ Performance Optimizations

### React Level
```javascript
// Component memoization
const Card = React.memo(({ item, isVisible, isFinished, onCardClick }) => {
  // Component only re-renders when props change
});

// Callback memoization
const handleCardClick = useCallback((id) => {
  // Stable reference prevents child re-renders
}, [dependencies]);

// Set-based lookups (O(1) instead of O(n))
const finishedItemsSet = useMemo(
  () => new Set(finishedItems),
  [finishedItems]
);
```

### Webpack Optimizations
- **Code Splitting:**
  - React vendor bundle: 51.39 KB
  - Router vendor bundle: 11.53 KB
  - Application code: 29.42 KB
  
- **Tree Shaking:** Eliminates unused exports
- **Minification:** Terser for JS, cssnano for CSS
- **Asset Optimization:** Images compressed, SVGs inlined

### CSS Performance
- **Containment:** `contain: layout style paint`
- **Transform over position:** Hardware acceleration
- **Reduced specificity:** Flat selector structure

---

## 📁 Project Structure

```
memory-game/
├── public/                    # Static assets
│   ├── img/                  # Theme images (cats, cars, flowers)
│   ├── fonts/                # Web fonts (Nunito)
│   ├── data/                 # Game data (results.json)
│   └── docs/                 # Documentation
│       └── testing/          # Testing checklists
├── src/
│   ├── components/
│   │   ├── App.jsx          # Root component with routing
│   │   ├── pages/           # Route-level components
│   │   │   ├── StartScreen.jsx
│   │   │   ├── GameScreen.jsx
│   │   │   └── ResultScreen.jsx
│   │   └── ui/              # Reusable UI components
│   │       ├── Card.jsx
│   │       ├── GameBoard.jsx
│   │       ├── GameHeader.jsx
│   │       ├── GameModal.jsx
│   │       ├── Navigation.jsx
│   │       ├── Logo.jsx
│   │       └── LanguageSwitcher.jsx
│   ├── hooks/
│   │   └── useGame.js       # Game state management hook
│   ├── data/
│   │   └── themes.js        # Card themes configuration
│   ├── utils/
│   │   ├── helpers.js       # Utility functions
│   │   ├── pluralization.js # i18n plural rules
│   │   ├── settings.js      # Game configuration
│   │   ├── paths.js         # Asset path resolution
│   │   └── i18n.js          # i18next setup
│   ├── locales/             # Translation files
│   │   ├── en.json
│   │   ├── ru.json
│   │   └── fr.json
│   └── styles/
│       └── style.css        # Global styles
├── webpack.config.js
├── package.json
└── README.md
```

---

## 🔧 Development Tools

### Code Quality
- **ESLint** — JavaScript linting (planned)
- **Prettier** — Code formatting (planned)
- **Babel** — ES6+ transpilation

### Testing Strategy
- **Manual Testing** — Cross-browser validation
- **Accessibility Testing** — WCAG AA compliance
- **Performance Testing** — Lighthouse audits

### Version Control
- **Git** — Version control
- **GitHub Pages** — Static hosting
- **gh-pages** — Automated deployment

---

## 🎯 Architectural Patterns

### Component Patterns
- **Container/Presentational** separation
- **Composition over inheritance**
- **Controlled components** for forms
- **Custom hooks** for logic reusability

### State Management
- **Local state** with useState
- **Lifted state** for shared data
- **Custom hooks** for complex logic
- **localStorage** for persistence

### Code Organization
- **Feature-based** folder structure
- **Separation of concerns** (UI/logic/data)
- **DRY principle** — reusable utilities
- **SOLID principles** — clean code

---

## 🌐 Browser Support

### Target Browsers
```json
{
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

### Tested Platforms
- ✅ Chrome 120+ (Desktop & Mobile)
- ✅ Firefox 121+ (Desktop & Mobile)
- ✅ Safari 17+ (Desktop & iOS)
- ✅ Edge 120+ (Desktop)

---

## 📊 Bundle Analysis

### Production Build Breakdown
```
Total Bundle Size: 115.44 KB (gzipped)

react-vendor.js        51.39 KB  (44.5%)  — React core
main.js                29.42 KB  (25.5%)  — Application code
vendors.js             16.64 KB  (14.4%)  — Other dependencies
router-vendor.js       11.53 KB  (10.0%)  — React Router
react-vendor-2.js       5.30 KB   (4.6%)  — React DOM
runtime.js              0.96 KB   (0.8%)  — Webpack runtime
```

### Optimization Strategies Applied
1. **Code Splitting** — Separate vendor bundles
2. **Tree Shaking** — Eliminate unused code
3. **Minification** — Terser for JS compression
4. **Asset Optimization** — Image compression
5. **Caching** — Content hash in filenames

---

## 🚀 Deployment Pipeline

### Build Process
```bash
1. Install dependencies:     npm install
2. Run production build:     npm run build
3. Optimize assets:          Webpack optimizes automatically
4. Deploy to GitHub Pages:   npm run deploy
```

### GitHub Pages Configuration
- **Base URL:** `/memory-game/`
- **SPA Routing:** 404.html fallback
- **Asset Paths:** Dynamic PUBLIC_URL resolution
- **Caching:** Content hash in filenames

---

## 🔐 Security Considerations

### Best Practices Implemented
- ✅ No hardcoded secrets or API keys
- ✅ Input sanitization (XSS prevention)
- ✅ Secure localStorage usage
- ✅ HTTPS enforcement (GitHub Pages)
- ✅ Content Security Policy headers

---

## 📈 Performance Metrics

### Lighthouse Scores
- **Performance:** 98/100 (Desktop), 95+/100 (Mobile)
- **Accessibility:** 100/100
- **Best Practices:** 96/100
- **SEO:** 100/100

### Core Web Vitals
- **FCP:** 0.4s (Desktop), 1.0s (Mobile) — Excellent
- **LCP:** 0.6s (Desktop), 2.3s (Mobile) — Good
- **CLS:** 0 — Perfect (no layout shifts)
- **TBT:** Minimal (optimized rendering)

---

## 🎓 Learning Resources

If you're interested in how this project was built:

- **React Docs:** https://react.dev/
- **Webpack Guides:** https://webpack.js.org/guides/
- **Web Performance:** https://web.dev/performance/
- **Accessibility:** https://www.w3.org/WAI/

---

## 🔄 Future Enhancements

See **[ROADMAP.md](public/docs/ROADMAP.md)** for planned features and improvements.