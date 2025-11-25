# Background Image Size Adjustment Guide

## 📍 Where to Adjust Background Image Size

### Desktop: `src/styles/base.css`

**Location**: Lines 16-20

```css
body {
    background-image: url('/img/Nagosaka_bg.jpeg');
    background-size: contain;  /* ← ADJUST THIS */
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
```

### Mobile: `src/styles/responsive.css`

**Location**: Lines 30-31 (inside `body::after`)

```css
body::after {
    background-image: url('/img/Nagosaka_bg.jpeg');
    background-size: contain;  /* ← ADJUST THIS */
    background-position: center center;
}
```

---

## 🎯 Options for `background-size`

### Option 1: Contain (Current - Shows Full Image)
```css
background-size: contain;
```
- Shows entire image without cropping
- Image fits within viewport
- May have empty spaces if aspect ratios don't match

### Option 2: Cover (Fills Space, May Crop)
```css
background-size: cover;
```
- Fills entire viewport
- May crop parts of image
- No empty spaces

### Option 3: Specific Percentage (Zoom Out)
```css
background-size: 80%;  /* 80% of viewport size */
background-size: 70%;  /* 70% of viewport size */
background-size: 60%;  /* 60% of viewport size */
```
- **Recommended for zooming out**
- Smaller percentage = more zoomed out
- Shows more of the image
- Image will be smaller with more background color visible

### Option 4: Specific Dimensions
```css
background-size: 1200px 800px;  /* Fixed width and height */
background-size: 100% auto;     /* Full width, auto height */
background-size: auto 100%;    /* Auto width, full height */
```

### Option 5: Multiple Values (Width and Height)
```css
background-size: 80% 80%;  /* 80% width, 80% height */
```

---

## 🔍 Recommended: Zoom Out Settings

To zoom out and see more of the image, use a percentage less than 100%:

### For Desktop (`src/styles/base.css`):
```css
body {
    background-size: 70%;  /* Zoom out to 70% */
    /* or */
    background-size: 60%;  /* Zoom out to 60% */
}
```

### For Mobile (`src/styles/responsive.css`):
```css
body::after {
    background-size: 70%;  /* Zoom out to 70% */
    /* or */
    background-size: 60%;  /* Zoom out to 60% */
}
```

---

## 📐 Examples

### Example 1: Zoom Out to 70%
```css
background-size: 70%;
```
- Image is 70% of viewport size
- More background color visible around edges
- Entire image still visible

### Example 2: Zoom Out to 50%
```css
background-size: 50%;
```
- Image is 50% of viewport size
- Much more background color visible
- Image appears smaller, more "zoomed out"

### Example 3: Keep Aspect Ratio, Zoom Out
```css
background-size: 80% auto;  /* 80% width, auto height */
```
- Maintains aspect ratio
- Width is 80% of viewport
- Height adjusts automatically

---

## 🎨 Complete Example

### Desktop (`src/styles/base.css`):
```css
body {
    font-family: 'Noto Sans TC', sans-serif;
    color: var(--ink-dark);
    line-height: 1.8;
    min-height: 100vh;
    padding: 2rem 1rem;
    transition: all 0.3s ease;
    background-color: var(--paper-light);
    background-image: url('/img/Nagosaka_bg.jpeg');
    background-size: 70%;  /* ← Change this value to zoom in/out */
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    -webkit-background-size: 70%;  /* iOS Safari */
    position: relative;
    -webkit-overflow-scrolling: touch;
}
```

### Mobile (`src/styles/responsive.css`):
```css
body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    height: -webkit-fill-available;
    background-image: url('/img/Nagosaka_bg.jpeg');
    background-size: 70%;  /* ← Change this value to zoom in/out */
    background-position: center center;
    background-repeat: no-repeat;
    background-color: var(--paper-light);
    z-index: -2;
    /* ... rest of styles ... */
}
```

---

## 💡 Tips

1. **Start with 70%** - Good balance between showing full image and not being too small
2. **Adjust incrementally** - Try 80%, 70%, 60% to find what looks best
3. **Match desktop and mobile** - Use same percentage for consistency
4. **Test on actual device** - Mobile screens may need different values

---

## 🔄 Quick Reference

| Value | Effect |
|-------|--------|
| `contain` | Full image, fits in viewport (current) |
| `cover` | Fills viewport, may crop |
| `100%` | Full viewport size |
| `80%` | Slightly zoomed out |
| `70%` | Moderately zoomed out |
| `60%` | More zoomed out |
| `50%` | Very zoomed out |

---

## 📝 Step-by-Step Instructions

1. **Open** `src/styles/base.css`
2. **Find** line with `background-size: contain;`
3. **Change** to `background-size: 70%;` (or your preferred percentage)
4. **Also change** `-webkit-background-size: contain;` to `-webkit-background-size: 70%;`
5. **Open** `src/styles/responsive.css`
6. **Find** `body::after` section
7. **Change** `background-size: contain;` to `background-size: 70%;`
8. **Save** both files
9. **Refresh** browser to see changes

---

## ⚠️ Notes

- Lower percentage = more zoomed out (smaller image)
- Higher percentage = more zoomed in (larger image)
- `contain` automatically fits image (may not be what you want)
- Percentage values give you precise control
- Test on both desktop and mobile for best results

