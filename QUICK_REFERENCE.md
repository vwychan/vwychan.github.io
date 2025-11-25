# Quick Reference - Refactor Plan Summary

## Current State

```
index.html (2,100+ lines)
├── HTML (1,900 lines)
├── CSS (800 lines)
└── JavaScript (180 lines)
    ├── Dark Mode Detection
    ├── Navigation System
    └── Time Adjustment (6 functions)
```

## Functions Overview

| Function | Lines | Complexity | Priority | Issues |
|----------|-------|------------|----------|--------|
| Dark Mode Detection | 1925-1935 | Low | Medium | No persistence, no toggle |
| Navigation | 1937-1953 | Low-Med | Medium | No routing, no history |
| `timeToMinutes()` | 1959-1963 | Low | Low | No validation |
| `minutesToTime()` | 1966-1970 | Low | Low | Edge cases |
| `initializeTimeAdjustment()` | 1973-1997 | Medium | High | Global state, no cleanup |
| `showTimeAdjuster()` | 2000-2068 | High | High | DOM manipulation, no reuse |
| `adjustTimesFromIndex()` | 2071-2086 | Medium | Medium | No persistence |
| `resetTimesFromIndex()` | 2089-2098 | Low | Low | No error handling |

## Key Problems

### 🔴 Critical
- Monolithic structure (single 2,100+ line file)
- Global state (`timeStorage`)
- No persistence (adjustments lost on refresh)
- No error handling
- Hard-coded data in HTML

### 🟡 Important
- No separation of concerns
- Direct DOM manipulation
- No component reusability
- No build system
- No testing

### 🟢 Nice to Have
- No TypeScript
- Limited accessibility
- No performance optimization

## Proposed Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Cover/
│   ├── Navigation/
│   ├── DayPage/
│   ├── Timeline/
│   └── TimeAdjuster/
├── services/           # Business logic
│   ├── ThemeService.js
│   ├── NavigationService.js
│   ├── TimeAdjustmentService.js
│   └── StorageService.js
├── data/               # Data layer
│   ├── itinerary.json
│   └── config.json
├── utils/              # Helper functions
│   ├── timeUtils.js
│   └── dateUtils.js
└── styles/             # CSS organization
    ├── variables.css
    ├── components/
    └── pages/
```

## Migration Phases

### Phase 1: Foundation (Week 1-2)
- ✅ Set up project structure
- ✅ Choose build tool (Vite recommended)
- ✅ Extract data to JSON

### Phase 2: Components (Week 3-5)
- ✅ Create base components
- ✅ Implement services
- ✅ Refactor styling

### Phase 3: Enhancement (Week 6-8)
- ✅ Add testing
- ✅ Performance optimization
- ✅ Additional features

## Quick Wins (Do First)

1. **Extract CSS** → `styles/` directory
2. **Extract JavaScript** → `src/` directory  
3. **Extract Data** → `data/itinerary.json`
4. **Add Build System** → Vite/Webpack

## Technology Recommendations

### Option A: Vanilla JS + Vite (Recommended)
- ✅ Minimal overhead
- ✅ Fast development
- ✅ Easy to understand
- ✅ No framework lock-in

### Option B: Vue 3
- ✅ Lightweight framework
- ✅ Good performance
- ✅ Easy learning curve

### Option C: React
- ✅ Large ecosystem
- ✅ Many resources
- ⚠️ More overhead

**Recommendation**: Start with **Option A**, migrate to Option B if needed.

## File Size Targets

| File Type | Current | Target | Reason |
|-----------|---------|--------|--------|
| HTML | 2,100 lines | < 100 lines | Template only |
| CSS | 800 lines | < 300 lines/file | Modular |
| JavaScript | 180 lines | < 200 lines/file | Modular |
| Total Files | 1 | 30-40 | Separation |

## Success Metrics

### Code Quality
- ✅ Code coverage > 80%
- ✅ ESLint errors = 0
- ✅ File size < 300 lines

### Performance
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Bundle size < 200KB

### Maintainability
- ✅ Cyclomatic complexity < 10
- ✅ Clear documentation
- ✅ Modular structure

## Estimated Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Foundation | 2 weeks | Project setup, data extraction |
| Components | 3 weeks | Base components, services |
| Styling | 1 week | CSS architecture |
| Testing | 1 week | Unit & integration tests |
| Optimization | 1 week | Performance, features |
| **Total** | **8 weeks** | **Production-ready app** |

## Risk Assessment

| Risk | Level | Mitigation |
|------|-------|------------|
| Complete rewrite | High | Gradual migration |
| Data loss | Medium | Backup original |
| User acceptance | Low | A/B testing |
| Timeline overrun | Medium | Phased approach |

## Next Steps

1. **Review** this plan with team
2. **Choose** technology stack
3. **Set up** development environment
4. **Start** with data extraction (easiest win)
5. **Iterate** on components

## Documentation Files

- 📄 `REFACTOR_PLAN.md` - Detailed refactoring plan
- 📄 `FUNCTION_ANALYSIS.md` - Function-by-function analysis
- 📄 `QUICK_REFERENCE.md` - This file

---

**Last Updated**: 2024
**Status**: Proposal
**Priority**: High

