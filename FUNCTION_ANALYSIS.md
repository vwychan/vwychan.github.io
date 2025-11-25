# Function Analysis - Current Implementation

## Overview

This document provides a detailed analysis of all JavaScript functions in `index.html` and their current implementation.

---

## Function Inventory

### 1. Dark Mode Detection (Lines 1925-1935)

**Purpose**: Automatically detect and apply system dark mode preference

**Implementation**:
```javascript
// Initial detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

// Dynamic listener
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
```

**Issues**:
- ❌ No manual toggle option
- ❌ No persistence (preference not saved)
- ❌ No dark mode styles defined (class added but no CSS)
- ❌ No user control

**Dependencies**: None

**Complexity**: Low

---

### 2. Navigation System (Lines 1937-1953)

**Purpose**: Handle tab-based page navigation

**Implementation**:
```javascript
const tabs = document.querySelectorAll('.nav-tab');
const pages = document.querySelectorAll('.page');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPage = tab.dataset.page;
        
        // Remove active from all
        tabs.forEach(t => t.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        
        // Add active to selected
        tab.classList.add('active');
        document.getElementById(targetPage).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
```

**Issues**:
- ❌ Direct DOM manipulation (not reactive)
- ❌ No URL routing (no browser history)
- ❌ No deep linking support
- ❌ No keyboard navigation
- ❌ Query selector runs on every click (inefficient)

**Dependencies**: 
- HTML structure (`.nav-tab`, `.page` classes)
- `data-page` attributes

**Complexity**: Low-Medium

**Refactor Priority**: Medium

---

### 3. Time Adjustment System

#### 3.1 `timeToMinutes(timeStr)` (Lines 1959-1963)

**Purpose**: Convert time string (HH:MM) to minutes

**Implementation**:
```javascript
function timeToMinutes(timeStr) {
    if (timeStr === '自由') return null;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}
```

**Issues**:
- ⚠️ No input validation
- ⚠️ No error handling for invalid formats
- ⚠️ Hard-coded special case ('自由')

**Input Examples**:
- `"15:35"` → `935`
- `"自由"` → `null`
- `"9:05"` → `545`

**Complexity**: Low

**Refactor Priority**: Low (but add validation)

---

#### 3.2 `minutesToTime(minutes)` (Lines 1966-1970)

**Purpose**: Convert minutes to time string (HH:MM)

**Implementation**:
```javascript
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
```

**Issues**:
- ⚠️ No validation for negative numbers
- ⚠️ No handling for > 24 hours (wraps around)
- ⚠️ No handling for null/undefined

**Input Examples**:
- `935` → `"15:35"`
- `1440` → `"00:00"` (wraps)
- `-30` → `"23:30"` (incorrect behavior)

**Complexity**: Low

**Refactor Priority**: Low (but add validation)

---

#### 3.3 `initializeTimeAdjustment()` (Lines 1973-1997)

**Purpose**: Initialize time adjustment feature for all pages

**Implementation**:
```javascript
function initializeTimeAdjustment() {
    document.querySelectorAll('.page').forEach(page => {
        const pageId = page.id;
        const timeElements = page.querySelectorAll('.timeline-time');
        
        timeElements.forEach((timeEl, index) => {
            const originalTime = timeEl.textContent.trim();
            const storageKey = `${pageId}-${index}`;
            
            // Store original time
            if (!timeStorage[storageKey]) {
                timeStorage[storageKey] = originalTime;
            }
            
            // Skip "自由" times
            if (originalTime === '自由') return;
            
            // Add click handler
            timeEl.addEventListener('click', function(e) {
                e.stopPropagation();
                showTimeAdjuster(timeEl, pageId, index, timeElements);
            });
        });
    });
}
```

**Issues**:
- ❌ Global state (`timeStorage`)
- ❌ No cleanup mechanism
- ❌ Event listeners added on every call (no check for existing)
- ❌ No persistence (adjustments lost on refresh)
- ❌ Query selector runs multiple times

**Dependencies**:
- `timeStorage` global object
- `showTimeAdjuster()` function
- HTML structure (`.page`, `.timeline-time`)

**Complexity**: Medium

**Refactor Priority**: High

---

#### 3.4 `showTimeAdjuster(timeEl, pageId, index, allTimes)` (Lines 2000-2068)

**Purpose**: Display modal dialog for time adjustment

**Implementation**:
```javascript
function showTimeAdjuster(timeEl, pageId, index, allTimes) {
    const currentTime = timeEl.textContent.trim();
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'time-adjuster-overlay';
    
    // Create adjuster dialog
    const adjuster = document.createElement('div');
    adjuster.className = 'time-adjuster';
    adjuster.innerHTML = `...`; // HTML template
    
    document.body.appendChild(overlay);
    document.body.appendChild(adjuster);
    
    // Event handlers for cancel, reset, apply
    // Enter key support
}
```

**Issues**:
- ❌ Creates DOM elements on every call (no reuse)
- ❌ No cleanup if modal already open
- ❌ Inline HTML template (hard to maintain)
- ❌ No escape key handler
- ❌ No focus trap (accessibility issue)
- ❌ Direct DOM manipulation

**Dependencies**:
- `adjustTimesFromIndex()`
- `resetTimesFromIndex()`
- CSS classes (`.time-adjuster-overlay`, `.time-adjuster`)

**Complexity**: High

**Refactor Priority**: High

---

#### 3.5 `adjustTimesFromIndex(pageId, startIndex, delayMinutes, allTimes)` (Lines 2071-2086)

**Purpose**: Adjust all times from a specific index onwards

**Implementation**:
```javascript
function adjustTimesFromIndex(pageId, startIndex, delayMinutes, allTimes) {
    for (let i = startIndex; i < allTimes.length; i++) {
        const timeEl = allTimes[i];
        const storageKey = `${pageId}-${i}`;
        const originalTime = timeStorage[storageKey];
        
        if (originalTime === '自由') continue;
        
        const originalMinutes = timeToMinutes(originalTime);
        const newMinutes = originalMinutes + delayMinutes;
        const newTime = minutesToTime(newMinutes);
        
        timeEl.textContent = newTime;
        timeEl.classList.add('adjusted');
    }
}
```

**Issues**:
- ❌ No validation of delayMinutes
- ❌ No handling for overflow (> 24 hours)
- ❌ No persistence
- ❌ Direct DOM manipulation
- ❌ No undo mechanism

**Dependencies**:
- `timeStorage` global object
- `timeToMinutes()`
- `minutesToTime()`

**Complexity**: Medium

**Refactor Priority**: Medium

---

#### 3.6 `resetTimesFromIndex(pageId, startIndex, allTimes)` (Lines 2089-2098)

**Purpose**: Reset times to original values from a specific index

**Implementation**:
```javascript
function resetTimesFromIndex(pageId, startIndex, allTimes) {
    for (let i = startIndex; i < allTimes.length; i++) {
        const timeEl = allTimes[i];
        const storageKey = `${pageId}-${i}`;
        const originalTime = timeStorage[storageKey];
        
        timeEl.textContent = originalTime;
        timeEl.classList.remove('adjusted');
    }
}
```

**Issues**:
- ⚠️ No error handling if originalTime is missing
- ⚠️ No persistence update

**Dependencies**:
- `timeStorage` global object

**Complexity**: Low

**Refactor Priority**: Low

---

## Global State

### `timeStorage` Object (Line 1956)

**Purpose**: Store original time values for each timeline item

**Structure**:
```javascript
{
    "day1-0": "15:35",
    "day1-1": "20:05",
    "day2-0": "10:00",
    // ...
}
```

**Issues**:
- ❌ Global variable (pollutes namespace)
- ❌ No persistence (lost on refresh)
- ❌ No validation
- ❌ No type safety

**Refactor Priority**: High

---

## Event Flow

### Initialization Flow
```
DOMContentLoaded
  └─> initializeTimeAdjustment()
        └─> For each page:
              └─> For each timeline-time:
                    └─> Store original time
                    └─> Add click listener
                          └─> showTimeAdjuster()
```

### Time Adjustment Flow
```
User clicks time
  └─> showTimeAdjuster()
        └─> User enters delay
              └─> adjustTimesFromIndex()
                    └─> Update DOM
                    └─> Add 'adjusted' class
```

### Reset Flow
```
User clicks reset
  └─> resetTimesFromIndex()
        └─> Restore from timeStorage
        └─> Remove 'adjusted' class
```

---

## Dependencies Map

```
Navigation
  └─> HTML: .nav-tab, .page, data-page attributes
  └─> CSS: .active class

Time Adjustment
  └─> timeStorage (global)
  └─> timeToMinutes()
  └─> minutesToTime()
  └─> showTimeAdjuster()
  └─> adjustTimesFromIndex()
  └─> resetTimesFromIndex()
  └─> HTML: .timeline-time, .time-adjuster
  └─> CSS: .adjusted class

Dark Mode
  └─> CSS: .dark class (not implemented)
```

---

## Code Metrics

### Lines of Code
- **Total JavaScript**: ~180 lines
- **Functions**: 6
- **Global Variables**: 1 (`timeStorage`)
- **Event Listeners**: ~20+ (dynamic)

### Complexity
- **Average Cyclomatic Complexity**: 3-4
- **Highest Complexity**: `showTimeAdjuster()` (8-10)
- **Lowest Complexity**: `minutesToTime()` (1)

### Maintainability Index
- **Current**: ~60/100 (moderate)
- **Target**: >80/100

---

## Refactoring Recommendations by Function

### High Priority
1. **`showTimeAdjuster()`** - Extract to component, add accessibility
2. **`initializeTimeAdjustment()`** - Use service pattern, add cleanup
3. **`timeStorage`** - Move to service, add persistence

### Medium Priority
1. **`adjustTimesFromIndex()`** - Add validation, error handling
2. **Navigation system** - Add routing, keyboard support

### Low Priority
1. **`timeToMinutes()`** - Add input validation
2. **`minutesToTime()`** - Add edge case handling
3. **`resetTimesFromIndex()`** - Add error handling

---

## Testing Requirements

### Unit Tests Needed
- ✅ `timeToMinutes()` - Various input formats
- ✅ `minutesToTime()` - Edge cases (negative, >24h)
- ✅ Time adjustment calculations
- ✅ Time reset functionality

### Integration Tests Needed
- ✅ Navigation flow
- ✅ Time adjustment modal
- ✅ State persistence

### E2E Tests Needed
- ✅ Complete user journey
- ✅ Time adjustment workflow
- ✅ Navigation between pages

---

## Summary

**Total Functions**: 6
**Global State**: 1 object
**Event Listeners**: 20+
**Issues Identified**: 25+
**Refactoring Priority**: High

The current implementation is functional but lacks:
- Modularity
- Persistence
- Error handling
- Accessibility
- Testability
- Maintainability

All functions should be refactored into a service-based architecture with proper separation of concerns.

