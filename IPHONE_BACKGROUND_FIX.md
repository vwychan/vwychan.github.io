# iPhone Background Fix

## Changes Made

### Enhanced iOS Safari Support
- Added `!important` flags to ensure styles aren't overridden
- Improved z-index layering (-10 for background, -1 for overlay)
- Added hardware acceleration properties
- Enhanced fixed positioning with multiple fallbacks

### Key Fixes Applied

1. **Forced Fixed Positioning**
   ```css
   position: fixed !important;
   top: 0 !important;
   left: 0 !important;
   right: 0 !important;
   bottom: 0 !important;
   ```

2. **Hardware Acceleration**
   ```css
   -webkit-transform: translateZ(0) !important;
   transform: translateZ(0) !important;
   -webkit-perspective: 1000;
   ```

3. **Proper Z-Index Layering**
   ```css
   body::after (background) → z-index: -10
   body::before (overlay) → z-index: -1
   .booklet (content) → z-index: 1
   ```

4. **iOS Viewport Fixes**
   ```css
   height: -webkit-fill-available !important;
   min-height: -webkit-fill-available !important;
   ```

---

## Testing on iPhone

### What to Check:
1. ✅ Background image appears
2. ✅ Full image is visible (not cropped)
3. ✅ Background stays fixed when scrolling
4. ✅ Image is centered
5. ✅ Works in portrait orientation
6. ✅ Works in landscape orientation

---

## If Still Not Working

### Option 1: Check Image Path
Verify the image exists and path is correct:
- Path: `/img/Nagosaka_bg.jpeg`
- Location: `public/img/Nagosaka_bg.jpeg`
- Check browser console for 404 errors

### Option 2: Clear Cache
- Hard refresh: Hold Shift and click Reload
- Or clear Safari cache in Settings

### Option 3: Check Viewport Meta Tag
Ensure `index.html` has:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover">
```

### Option 4: Alternative Approach (If Needed)
If pseudo-elements don't work, we can use a wrapper div approach instead.

---

## Debugging Steps

1. **Open Safari on iPhone**
2. **Enable Web Inspector** (Settings > Safari > Advanced > Web Inspector)
3. **Connect to Mac** and use Safari DevTools
4. **Check Console** for errors
5. **Inspect Elements** to see if `body::after` exists
6. **Check Computed Styles** for background-image

---

## Common iOS Safari Issues

### Issue: Background Not Showing
- **Cause**: Pseudo-element not rendering
- **Fix**: Added `display: block !important` and `visibility: visible !important`

### Issue: Background Scrolling
- **Cause**: Fixed positioning not working
- **Fix**: Added multiple positioning properties with `!important`

### Issue: Image Not Full Size
- **Cause**: Viewport height issues
- **Fix**: Added `-webkit-fill-available` and multiple height fallbacks

---

## Current Implementation

The background uses `body::after` pseudo-element with:
- Fixed positioning (doesn't scroll)
- `contain` sizing (shows full image)
- Hardware acceleration (smooth rendering)
- Proper z-index (behind everything)

---

## Next Steps

If the background still doesn't work on iPhone after these fixes:

1. **Check browser console** for errors
2. **Verify image loads** (check Network tab)
3. **Test in different Safari versions**
4. **Try alternative implementation** (wrapper div)

Let me know what you see on iPhone and I can provide additional fixes!

