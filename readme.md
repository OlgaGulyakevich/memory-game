# 🎮 Memory Game

> Professional React application showcasing modern frontend development practices

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Webpack](https://img.shields.io/badge/Webpack-5.101.3-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)](https://webpack.js.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34C26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)

## 🌐 Live Demo

🎮 **[Play the Game](https://olgagulyakevich.github.io/memory-game/)** 

![Game Screenshot](https://olgagulyakevich.github.io/memory-game/img/game-preview.jpg)


Experience the full application with all features:
- Choose the langguage RU/EN/FR
- Choose from 3 different card themes
- Play with responsive touch and keyboard controls  
- View your results in the leaderboard
- Try on different devices to see responsive design

## 📖 About

**Memory** is an multilingual interactive memory training application that challenges users to match pairs of cards across different themes. Built with modern React patterns, the game demonstrates professional frontend development practices including *component architecture*, *state management*, *responsive design*, and *accessibility compliance*.

### 🎯 Core Gameplay
- **Find Pairs**: Match identical cards by flipping them two at a time
- **Visual Memory**: Remember card positions to minimize moves
- **Progressive Difficulty**: Three themed card sets with varying complexity
- **Score Tracking**: Personal best tracking with persistent storage

## ✨ Key Features

### 🎨 **User Experience**
- **3 Themed Card Sets**: Cats, Cars, and Flowers with custom artwork
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Smooth Animations**: 3D CSS card flip effects with hardware acceleration
- **Progress Tracking**: Real-time game statistics and completion percentage
- **Accessibility First**: Full keyboard navigation and screen reader support


## 🛠️ Tech Stack & Architecture 

### **Frontend Framework**
- **React 19.1.1** - Latest React with concurrent features
- **React Router 7.9.0** - Client-side routing with history support
- **Modern JavaScript (ES6+)** - Arrow functions, destructuring, modules

### **Build & Development**
- **Webpack 5.101.3** - Module bundling with optimization
- **Babel** - JSX transformation and ES6+ compilation  
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Hot Module Replacement** - Fast development workflow 

### Internationalization
- 3 languages: Russian, English, French
- localStorage persistence
- Responsive language switcher
- Full keyboard navigation
- WCAG AA compliant

### **Code Quality & Performance**
- **React.memo** - Component memoization for performance
- **Custom Hooks** - Reusable game logic abstraction
- **CSS Containment** - Optimized rendering performance
- **Semantic HTML** - Proper document structure and accessibility

### **Deployment & Infrastructure** 
- **GitHub Pages** - Static hosting with custom domain
- **SPA Routing** - 404 fallback for client-side routes
- **Asset Optimization** - Image optimization and lazy loading

## 📁 Project Structure

```
memory-game/
├── public/                 # Static assets
│   ├── img/               # Game images by theme (cats, cars, flowers)
│   ├── fonts/             # Custom typography files
│   ├── data/              # Game data and results (results.json)
│   ├── docs/              # Documentation & testing
│   │   └── testing/       # Manual testing resources
│   ├── 404.html           # SPA routing fallback
│   ├── index.html         # Application entry point with SEO meta tags
│   ├── favicon.ico        # Browser icon
│   └── og-image.jpg       # Social sharing preview
├── src/
│   ├── components/        # React components
│   │   ├── App.jsx        # Main application component with routing
│   │   ├── pages/         # Route-level components  
│   │   │   ├── StartScreen.jsx    # Welcome screen with theme selection
│   │   │   ├── GameScreen.jsx     # Main game interface
│   │   │   └── ResultScreen.jsx   # Leaderboard with game history
│   │   └── ui/            # Reusable UI components
│   │       ├── Card.jsx           # Animated flip card component
│   │       ├── GameBoard.jsx      # Card grid layout
│   │       ├── GameHeader.jsx     # Progress and stats display
│   │       ├── GameModal.jsx      # Win/lose modal dialog
│   │       ├── Navigation.jsx     # App navigation bar
            ├── Logo.jsx           # Application's main logo component.
│   │       └── LanguageSwitcher.jsx # i18n language switcher 
│   │      
│   │       
│   ├── hooks/             # Custom React hooks
│   │   └── useGame.js     # Game state and logic management
│   ├── data/              # Game themes and configuration
│   │   └── themes.js      # Card themes data (cats, cars, flowers)
│   ├── utils/             # Helper functions and utilities
│   │   ├── helpers.js     # Game logic helpers (shuffle, sort, localStorage)
│   │   ├── pluralization.js # Multilingual plural forms (RU/EN/FR)
│   │   ├── settings.js    # Game configuration constants
│   │   │── path.js        # Path and asset URL utilities
│   │   └── i18n.js        # react-i18next configuration
│   ├── locales/           # Translation files
│   │   ├── en.json        # English translations
│   │   ├── fr.json        # French translations
│   │   └── ru.json        # Russian translations
│   ├── index.js           # Application entry point with routing
│   └── styles/
│       └── style.css      # Global styles with CSS custom properties
├── package.json           # Dependencies & scripts
├── webpack.config.js      # Build configuration with optimizations
└── README.md              # Project documentation
```

### **Component Architecture**
- **App Component**: Main application wrapper with React Router and i18n setup
- **Page Components**: Route-level containers (StartScreen, GameScreen, ResultScreen)
- **UI Components**: Reusable elements (Card, GameBoard, GameModal, LanguageSwitcher, Logo)
- **Custom Hooks**: Business logic abstraction (useGame for game state management)
- **Utility Functions**: Pure functions for calculations, pluralization, and data manipulation
- **Internationalization**: react-i18next with 3 languages (EN/FR/RU) and centralized translations

## 🌐 Internationalization

**Supported Languages:**
- 🇬🇧 English (EN) - Default
- 🇫🇷 French (FR)
- 🇷🇺 Russian (RU)

**Features:**
- Seamless language switching without page reload
- Persistent language preference via localStorage
- Fallback to English for missing translations
- Lightweight implementation (~25KB added to bundle)

**Technical Implementation:**
- **react-i18next** for translation management
- JSON-based translation files for easy maintenance
- React Context for global language state
- Custom hook for translation utilities


### **Performance Optimizations**
- **Memoized Components**: Prevent unnecessary re-renders
- **Set-based Lookups**: O(1) card state checking
- **Optimized Event Handlers**: useCallback for stable references
- **CSS Containment**: Isolate rendering to card elements

## 🎨 Design System

### **CSS Architecture**
- **Design Tokens**: CSS custom properties for colors, spacing, typography
- **Mobile-First**: Progressive enhancement from 320px to desktop
- **Component-Based**: BEM methodology with CSS modules approach
- **Animation Layer**: Hardware-accelerated 3D transforms


### **Accessibility Features**
- **WCAG AA Compliance**: Proper color contrast and focus indicators
- **Keyboard Navigation**: Full game playable without mouse
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Semantic HTML**: Proper heading hierarchy and landmark roles

## 🔧 Development Setup

### **Prerequisites**
- Node.js 16+ and npm
- Modern browser with ES6+ support

### **Installation**
```bash
# Clone repository
git clone https://github.com/olgagulyakevich/memory-game.git
cd memory-game

# Install dependencies
npm install

# Start development server
npm start
```

### **Available Scripts**
```bash
npm start          # Development server on http://localhost:3001
npm run build      # Production build to dist/
npm run serve      # Serve production build locally
npm run deploy     # Deploy to GitHub Pages
```



## 📊 Performance & Quality

### **Current Benchmarks**
- **Lighthouse Score**: 95+/100 overall performance
- **First Contentful Paint**: < 1.2s on 3G
- **Time to Interactive**: < 2.5s on average hardware
- **Bundle Size**: < 250KB gzipped total
- **Core Web Vitals**: All metrics in "Good" range

### **Optimization Techniques**
- **Code Splitting**: Lazy loading for different routes
- **Asset Optimization**: Compressed images and fonts
- **Render Optimization**: React.memo and useCallback usage
- **CSS Performance**: Hardware acceleration and containment

## 🧪 Testing Strategy

### **Current Testing**
- **Manual Testing**: Cross-browser and device compatibility
- **Accessibility Testing**: Screen reader and keyboard navigation
- **Performance Testing**: Lighthouse audits and Core Web Vitals
- **User Acceptance**: Game flow validation

### **Testing Documentation**
- 📋 **[Manual Testing Checklist](public/docs/testing/manual-testing-checklist.md)** - Comprehensive testing scenarios
- ♿ **[Accessibility Audit](public/docs/testing/accessibility-checklist.md)** - WCAG AA compliance verification
- ⚡ **[Performance Benchmarks](public/docs/testing/performance-benchmarks.md)** - Core Web Vitals tracking

### **Quality Assurance Process**
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness validation (iOS Safari, Chrome Mobile)
- Keyboard navigation and screen reader compatibility
- Game logic edge cases and error scenarios

## 📈 Development Journey

### **Phase 1: Foundation (Completed)**
- ✅ React application architecture
- ✅ Component-based design system
- ✅ Game logic implementation
- ✅ Responsive mobile-first design

### **Phase 2: Enhancement (Completed)**
- ✅ React Router integration
- ✅ Performance optimizations  
- ✅ Accessibility compliance (WCAG AA)
- ✅ Cross-browser compatibility

### **Phase 3: Production (Completed)**
- ✅ Webpack build optimization
- ✅ GitHub Pages deployment
- ✅ SEO and metadata optimization

### **Future Enhancements (Roadmap)**
- 🔄 TypeScript migration for type safety
- 🔄 Unit testing with Jest and React Testing Library
- 🔄 E2E testing with Cypress or Playwright
- 🔄 Advanced animations and micro-interactions
- 🔄 Sound effects and haptic feedback
- 🔄 Multiple difficulty levels
- 🔄 Multiplayer functionality
- 🔄 Global leaderboards

## 💡 Key Learnings

### **React Expertise**
- **Modern Patterns**: Hooks, context, composition over inheritance
- **Performance**: Memoization, render optimization, bundle splitting
- **State Management**: Local state, lifting state up, custom hooks
- **Component Design**: Reusability, prop interfaces, children patterns

### **Professional Development**
- **Build Tools**: Webpack configuration, asset optimization
- **Developer Experience**: Hot reloading, source maps, error boundaries
- **Code Quality**: ESLint rules, consistent formatting, file organization
- **Deployment**: CI/CD pipelines, static hosting, domain configuration

### **Modern Web Standards**
- **Accessibility**: ARIA, semantic HTML, keyboard navigation
- **Performance**: Core Web Vitals, lazy loading, critical CSS
- **Progressive Enhancement**: Mobile-first, graceful degradation
- **SEO**: Meta tags, structured data, social sharing

## 🤝 Contributing

This is a portfolio project demonstrating modern React development practices. The codebase serves as an example of:
- Clean, maintainable component architecture
- Performance-focused development approach  
- Accessibility-first design principles
- Professional development workflow

## 📄 License

MIT License - feel free to use this code for learning and inspiration.

---

<div align="center">

**🎮 [Play Memory Game](https://olgagulyakevich.github.io/memory-game/) • 👩‍💻 [View Source Code](https://github.com/olgagulyakevich/memory-game) • 📧 [Contact Developer](mailto:olga.gulyakevi4@gmail.com)**

*Built with ❤️ using React 19, modern JavaScript, and professional development practices*

</div>

### 🧠 Memory Game
*React 19 • React Router • Webpack 5 • i18n (EN/FR/RU)*

**Professional memory training application with production-ready architecture:**

**Core Features:**
- 3 themed card sets with smooth 3D CSS flip animations
- Multilingual interface with react-i18next (English, French, Russian)
- React Router SPA with optimized client-side navigation
- Mobile-first responsive design with accessibility focus

**Technical Implementation:**
- Custom Webpack configuration with code splitting and bundle optimization
- React hooks architecture for clean, maintainable game logic
- Memoized components for optimal render performance
- Hardware-accelerated CSS animations (60fps+)
- Comprehensive manual testing and performance benchmarks

**Quality Metrics:**
- Lighthouse Performance: 95+/100
- WCAG AA accessibility compliant
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile-optimized (iOS Safari, Chrome Mobile)

**[Live Demo](https://olgagulyakevich.github.io/memory-game/)** • **[Source Code](https://github.com/OlgaGulyakevich/memory-game)** • **[Documentation](https://github.com/OlgaGulyakevich/memory-game#-tech-stack--architecture)**