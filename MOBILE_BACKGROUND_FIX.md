# Mobile Background Fix

## Issues Fixed

### 1. Background Moving with Content ❌ → ✅
**Problem**: Background was scrolling with page content on mobile
**Solution**: 
- Removed `background-attachment: scroll` 
- Used `position: fixed` on `body::after` pseudo-element
- Added iOS Safari-specific fixes to ensure fixed positioning works

### 2. Full Image Not Visible ❌ → ✅
**Problem**: Background image was cropped or not fully visible on mobile
**Solution**:
- Changed `background-size: cover` → `background-size: contain`
- Ensures entire image is visible without cropping
- Added fallback background color for empty spaces

---

## Technical Implementation

### Desktop (base.css)
```css
body {
    background-image: url('/img/Nagosaka_bg.jpeg');
    background-size: contain; /* Full image visible */
    background-attachment: fixed; /* Doesn't scroll */
}
```

### Mobile (responsive.css)
```css
/* Remove background from body */
body {
    background-image: none;
}

/* Use fixed pseudo-element instead */
body::after {
    position: fixed; /* Stays in place */
    background-size: contain; /* Full image visible */
    z-index: -2; /* Behind everything */
}
```

---

## Why This Approach?

### iOS Safari Limitation
- iOS Safari doesn't support `background-attachment: fixed` well
- Solution: Use `position: fixed` pseudo-element instead
- This ensures the background stays fixed on all mobile browsers

### Full Image Display
- `contain` ensures the entire image is visible
- Image scales to fit within viewport
- Maintains aspect ratio
- No cropping occurs

---

## Z-Index Layering

```
z-index: 1    → .booklet (content)
z-index: 0    → body::before (overlay)
z-index: -1   → (reserved)
z-index: -2   → body::after (background image)
```

This ensures:
1. Background image is behind everything
2. Overlay is above background but below content
3. Content is on top

---

## Testing Checklist

- [ ] Background image shows fully on mobile (no cropping)
- [ ] Background doesn't move when scrolling content
- [ ] Image is centered and visible
- [ ] Works on iPhone Safari
- [ ] Works on Android Chrome
- [ ] Works in landscape orientation
- [ ] Works in portrait orientation

---

## Notes

- Background uses `contain` to show full image
- If you want image to fill space (with possible cropping), change to `cover`
- Fixed positioning ensures background doesn't scroll
- iOS Safari requires special handling with pseudo-elements

---

## Troubleshooting

### Image Still Moving?
- Check that `position: fixed` is applied
- Verify `z-index: -2` is set
- Ensure no parent elements have `transform` or `will-change`

### Image Not Fully Visible?
- Verify `background-size: contain` is set
- Check image aspect ratio vs screen aspect ratio
- Empty spaces are normal with `contain` (use fallback color)

### Image Not Showing?
- Check image path: `/img/Nagosaka_bg.jpeg`
- Verify image exists in `public/img/` folder
- Check browser console for 404 errors

