# Refactor Plan for Travel Booklet Application

## Executive Summary

The current `index.html` is a monolithic 2,100+ line file containing HTML, CSS, and JavaScript. While functional, it lacks scalability, maintainability, and separation of concerns. This plan outlines a comprehensive refactoring strategy to transform it into a modern, scalable, and maintainable application.

---

## Current Architecture Analysis

### Functions Identified

1. **Dark Mode Detection** (lines 1925-1935)
   - Detects system color scheme preference
   - Adds/removes 'dark' class dynamically
   - **Issues**: No persistence, no manual toggle

2. **Navigation System** (lines 1937-1953)
   - Tab-based page switching
   - Active state management
   - Scroll to top on navigation
   - **Issues**: Direct DOM manipulation, no routing, no history

3. **Time Adjustment Feature** (lines 1955-2101)
   - `timeToMinutes()` - Converts time string to minutes
   - `minutesToTime()` - Converts minutes to time string
   - `initializeTimeAdjustment()` - Sets up time adjustment handlers
   - `showTimeAdjuster()` - Displays time adjustment modal
   - `adjustTimesFromIndex()` - Adjusts times from a specific index
   - `resetTimesFromIndex()` - Resets times to original values
   - **Issues**: Global state, no persistence, complex DOM manipulation

### Current Problems

1. **Monolithic Structure**: Single 2,100+ line file
2. **No Separation of Concerns**: HTML, CSS, JS intertwined
3. **Hard-coded Data**: All itinerary data embedded in HTML
4. **No Modularity**: All functions are global
5. **No Data Layer**: No structured data format
6. **Repeated HTML**: Each day page duplicates structure
7. **No Build System**: No bundling, minification, or optimization
8. **No Component System**: No reusable components
9. **No State Management**: Global variables for state
10. **No Testing**: No test structure
11. **No Type Safety**: Pure JavaScript, no TypeScript
12. **No Error Handling**: No error boundaries or validation
13. **Accessibility Issues**: Limited ARIA labels, keyboard navigation
14. **Performance**: No code splitting, lazy loading, or optimization

---

## Proposed Architecture

### Phase 1: Foundation & Structure (Week 1-2)

#### 1.1 Project Structure
```
/
├── public/
│   ├── index.html
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Cover/
│   │   ├── Navigation/
│   │   ├── DayPage/
│   │   ├── Timeline/
│   │   ├── InfoCard/
│   │   ├── TimeAdjuster/
│   │   └── Accommodation/
│   ├── data/
│   │   ├── itinerary.json
│   │   └── config.json
│   ├── services/
│   │   ├── ThemeService.js
│   │   ├── NavigationService.js
│   │   ├── TimeAdjustmentService.js
│   │   └── StorageService.js
│   ├── utils/
│   │   ├── timeUtils.js
│   │   ├── dateUtils.js
│   │   └── domUtils.js
│   ├── styles/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── components/
│   │   └── pages/
│   ├── App.js
│   └── main.js
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── build/
├── package.json
├── webpack.config.js (or vite.config.js)
├── .eslintrc.js
├── .prettierrc
└── README.md
```

#### 1.2 Technology Stack Options

**Option A: Vanilla JS (Recommended for simplicity)**
- Webpack/Vite for bundling
- ES6+ modules
- CSS Modules or PostCSS
- Jest for testing

**Option B: Lightweight Framework**
- Vue 3 (Composition API) - Small, performant
- React (with hooks) - More popular, larger ecosystem
- Svelte - Compile-time optimization

**Option C: Build Tool Only**
- Vite + Vanilla JS
- Modern ES modules
- Native CSS or SCSS

**Recommendation**: Start with **Option C (Vite + Vanilla JS)** for minimal overhead, then migrate to Option B if needed.

---

### Phase 2: Data Extraction & Structure (Week 2-3)

#### 2.1 Create Data Layer

**`src/data/itinerary.json`**
```json
{
  "trip": {
    "title": "日本中部之旅",
    "subtitle": "名古屋・金澤・伊勢・大阪",
    "dateRange": "2024.11.29 - 12.09",
    "days": [
      {
        "id": "day1",
        "date": "2024-11-29",
        "weekday": "（五）",
        "location": "名古屋",
        "weather": {
          "temp": "10°C - 16°C",
          "condition": "晴天或多雲",
          "clothing": "長袖上衣 + 薄外套"
        },
        "tips": [...],
        "transport": {...},
        "timeline": [
          {
            "time": "15:35",
            "title": "✈️ 香港國際機場起飛",
            "description": "準備開始精彩的日本之旅！",
            "note": null
          }
        ],
        "accommodation": {...}
      }
    ]
  }
}
```

#### 2.2 Configuration File

**`src/data/config.json`**
```json
{
  "app": {
    "name": "日本中部之旅",
    "theme": {
      "colors": {
        "paperLight": "#faf8f3",
        "accentRed": "#c1272d"
      }
    }
  },
  "features": {
    "timeAdjustment": true,
    "darkMode": true,
    "persistence": true
  }
}
```

---

### Phase 3: Component Architecture (Week 3-5)

#### 3.1 Component Breakdown

**Cover Component**
```javascript
// src/components/Cover/Cover.js
export class Cover {
  constructor(data) {
    this.data = data;
  }
  
  render() {
    return `
      <div class="cover">
        <h1>${this.data.title}</h1>
        <p class="subtitle">${this.data.subtitle}</p>
        <div class="date-range">${this.data.dateRange}</div>
      </div>
    `;
  }
}
```

**Navigation Component**
```javascript
// src/components/Navigation/Navigation.js
export class Navigation {
  constructor(pages, activePage = 'overview') {
    this.pages = pages;
    this.activePage = activePage;
    this.onPageChange = null;
  }
  
  render() {
    return this.pages.map(page => `
      <button 
        class="nav-tab ${page.id === this.activePage ? 'active' : ''}"
        data-page="${page.id}"
      >
        ${page.label}
      </button>
    `).join('');
  }
  
  attachEventListeners() {
    // Event delegation pattern
  }
}
```

**Timeline Component**
```javascript
// src/components/Timeline/Timeline.js
export class Timeline {
  constructor(items, onTimeClick) {
    this.items = items;
    this.onTimeClick = onTimeClick;
  }
  
  render() {
    return this.items.map((item, index) => `
      <div class="timeline-item">
        <div 
          class="timeline-time ${item.adjusted ? 'adjusted' : ''}"
          data-index="${index}"
        >
          ${item.time}
        </div>
        <div class="timeline-content">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      </div>
    `).join('');
  }
}
```

**TimeAdjuster Component**
```javascript
// src/components/TimeAdjuster/TimeAdjuster.js
export class TimeAdjuster {
  constructor() {
    this.isOpen = false;
  }
  
  show(timeEl, onApply, onReset) {
    // Modal rendering and event handling
  }
  
  hide() {
    // Cleanup
  }
}
```

#### 3.2 Service Layer

**ThemeService**
```javascript
// src/services/ThemeService.js
export class ThemeService {
  constructor() {
    this.currentTheme = 'light';
    this.storage = new StorageService();
  }
  
  init() {
    // Detect system preference
    // Load saved preference
    // Apply theme
  }
  
  toggle() {
    // Switch theme
    // Persist preference
  }
  
  apply(theme) {
    // Apply theme to DOM
  }
}
```

**TimeAdjustmentService**
```javascript
// src/services/TimeAdjustmentService.js
export class TimeAdjustmentService {
  constructor() {
    this.adjustments = new Map();
    this.storage = new StorageService();
  }
  
  adjust(pageId, startIndex, delayMinutes) {
    // Calculate new times
    // Store adjustments
    // Persist to storage
  }
  
  reset(pageId, startIndex) {
    // Reset to original times
  }
  
  getAdjustedTime(pageId, index) {
    // Return adjusted time if exists
  }
}
```

**NavigationService**
```javascript
// src/services/NavigationService.js
export class NavigationService {
  constructor() {
    this.currentPage = 'overview';
    this.history = [];
  }
  
  navigate(pageId) {
    // Update active page
    // Update URL (if using routing)
    // Emit event
    // Update history
  }
  
  goBack() {
    // Navigate to previous page
  }
}
```

**StorageService**
```javascript
// src/services/StorageService.js
export class StorageService {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  get(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }
  
  remove(key) {
    localStorage.removeItem(key);
  }
}
```

---

### Phase 4: Styling Architecture (Week 4-5)

#### 4.1 CSS Organization

**`src/styles/variables.css`**
```css
:root {
  --paper-light: #faf8f3;
  --accent-red: #c1272d;
  /* ... */
}

[data-theme="dark"] {
  --paper-light: #1a1a1a;
  /* ... */
}
```

**`src/styles/components/timeline.css`**
```css
.timeline-item {
  /* Component-specific styles */
}
```

**`src/styles/pages/day-page.css`**
```css
.day-page {
  /* Page-specific styles */
}
```

#### 4.2 CSS Methodology
- **BEM** (Block Element Modifier) for naming
- **CSS Custom Properties** for theming
- **PostCSS** for autoprefixing and optimization
- **CSS Modules** (optional) for scoped styles

---

### Phase 5: Build System & Tooling (Week 5-6)

#### 5.1 Build Configuration

**`vite.config.js`** (Recommended)
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './public/index.html'
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
});
```

**`package.json`**
```json
{
  "name": "travel-booklet",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "lint": "eslint src",
    "format": "prettier --write src"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "jest": "^29.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

#### 5.2 Development Tools
- **ESLint** for code quality
- **Prettier** for formatting
- **Jest** for testing
- **Husky** for git hooks
- **Lighthouse CI** for performance monitoring

---

### Phase 6: Testing Strategy (Week 6-7)

#### 6.1 Unit Tests

**`tests/unit/timeUtils.test.js`**
```javascript
import { timeToMinutes, minutesToTime } from '../../src/utils/timeUtils';

describe('timeUtils', () => {
  test('converts time string to minutes', () => {
    expect(timeToMinutes('15:35')).toBe(935);
  });
  
  test('converts minutes to time string', () => {
    expect(minutesToTime(935)).toBe('15:35');
  });
});
```

#### 6.2 Integration Tests
- Component rendering
- Service interactions
- State management

#### 6.3 E2E Tests (Optional)
- Playwright or Cypress
- User flow testing

---

### Phase 7: Performance Optimization (Week 7-8)

#### 7.1 Code Splitting
- Lazy load day pages
- Dynamic imports for components
- Route-based code splitting

#### 7.2 Asset Optimization
- Image optimization (WebP, lazy loading)
- Font subsetting
- CSS minification
- JavaScript minification and tree-shaking

#### 7.3 Caching Strategy
- Service Worker for offline support
- LocalStorage for data persistence
- Cache API for assets

---

### Phase 8: Enhanced Features (Week 8-9)

#### 8.1 Additional Features
- **Export to PDF**: Generate printable version
- **Share functionality**: Share specific days
- **Search**: Search across itinerary
- **Filters**: Filter by location, activity type
- **Map integration**: Show locations on map
- **Offline mode**: Service Worker for offline access
- **Multi-language**: i18n support
- **Accessibility**: ARIA labels, keyboard navigation
- **PWA**: Progressive Web App features

#### 8.2 State Management (if needed)
- **Redux/Zustand** for complex state
- **Context API** for React
- **Event Bus** for vanilla JS

---

## Migration Strategy

### Step-by-Step Migration

1. **Week 1**: Set up project structure, build system
2. **Week 2**: Extract data to JSON, create data layer
3. **Week 3**: Create base components (Cover, Navigation)
4. **Week 4**: Create page components (DayPage, Timeline)
5. **Week 5**: Implement services (Theme, Navigation, Time)
6. **Week 6**: Refactor styling, implement CSS architecture
7. **Week 7**: Add testing, optimize performance
8. **Week 8**: Enhance features, add accessibility
9. **Week 9**: Polish, documentation, deployment

### Backward Compatibility
- Keep original `index.html` as backup
- Gradual migration (feature flags)
- A/B testing for new version

---

## Benefits of Refactoring

### Maintainability
- ✅ Modular code structure
- ✅ Clear separation of concerns
- ✅ Easy to locate and fix bugs
- ✅ Simple to add new features

### Scalability
- ✅ Easy to add new days/pages
- ✅ Reusable components
- ✅ Data-driven architecture
- ✅ Performance optimizations

### Developer Experience
- ✅ Modern tooling
- ✅ Hot module replacement
- ✅ Type safety (if TypeScript)
- ✅ Testing infrastructure

### User Experience
- ✅ Faster load times
- ✅ Better accessibility
- ✅ Offline support
- ✅ Enhanced features

---

## Risk Assessment

### Low Risk
- Data extraction (straightforward)
- Component creation (well-defined)
- Service layer (standard patterns)

### Medium Risk
- State management complexity
- Performance optimization
- Browser compatibility

### High Risk
- Complete rewrite (mitigate with gradual migration)
- Data migration (backup original)
- User acceptance (A/B testing)

---

## Success Metrics

### Code Quality
- Code coverage > 80%
- ESLint errors = 0
- Lighthouse score > 90

### Performance
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Bundle size < 200KB (gzipped)

### Maintainability
- Cyclomatic complexity < 10 per function
- File size < 300 lines
- Clear documentation

---

## Recommendations

### Immediate Actions
1. **Start with data extraction** - Easiest win, immediate benefit
2. **Set up build system** - Enables modern development
3. **Create component structure** - Foundation for everything else

### Long-term Considerations
1. **Consider TypeScript** - Type safety, better IDE support
2. **Evaluate frameworks** - Vue/React if complexity grows
3. **Add CI/CD** - Automated testing and deployment
4. **Monitor performance** - Real User Monitoring (RUM)

### Quick Wins
1. Extract CSS to separate files
2. Extract JavaScript to modules
3. Create data JSON file
4. Add basic build system (Vite)

---

## Conclusion

This refactoring plan transforms a monolithic HTML file into a modern, scalable, and maintainable application. The phased approach allows for gradual migration while maintaining functionality. The new architecture supports future growth, easier maintenance, and enhanced user experience.

**Estimated Timeline**: 8-9 weeks for full refactoring
**Effort**: Medium to High
**ROI**: High (long-term maintainability and scalability)

