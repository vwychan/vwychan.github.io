# iPhone Home Screen Icon Troubleshooting

## Issue: Icon Not Showing as Nagosaka.PNG

### Changes Made

1. **Reordered Apple Touch Icons**
   - Put `180x180` first (most important for modern iPhones)
   - iOS prioritizes the first matching size

2. **Verified Image**
   - Image exists: `public/img/Nagosaka.PNG`
   - Size: 1024x1024 pixels (perfect for icons)
   - Format: PNG (correct)

---

## Troubleshooting Steps

### Step 1: Clear Safari Cache
1. Go to **Settings** > **Safari**
2. Tap **Clear History and Website Data**
3. Confirm

### Step 2: Remove Old Home Screen Icon
1. Long press the existing home screen icon
2. Tap **Remove App** or delete it
3. This removes the cached icon

### Step 3: Re-add to Home Screen
1. Open Safari
2. Navigate to your site
3. Tap **Share** button (square with arrow)
4. Scroll down and tap **Add to Home Screen**
5. Verify the icon preview shows Nagosaka.PNG
6. Tap **Add**

### Step 4: Verify Icon Path
Check that the icon loads correctly:
1. In Safari, go to your site
2. Open Developer Tools (if available)
3. Check Network tab for `/img/Nagosaka.PNG`
4. Should return 200 OK (not 404)

---

## Common Issues & Solutions

### Issue: Icon Still Not Showing
**Possible Causes:**
- Path not resolving correctly
- Image not accessible
- Cache issues

**Solutions:**
1. **Check Image Path**
   - Verify: `public/img/Nagosaka.PNG` exists
   - Path in HTML: `/img/Nagosaka.PNG`
   - Should work with Vite's public folder

2. **Test Image Directly**
   - Open: `http://localhost:3000/img/Nagosaka.PNG`
   - Should display the image
   - If 404, path is wrong

3. **Check File Permissions**
   - Ensure file is readable
   - Check file exists in `public/img/` folder

### Issue: Wrong Icon Showing
**Solution:**
- Clear Safari cache (Step 1 above)
- Remove old home screen icon (Step 2)
- Re-add to home screen (Step 3)

### Issue: Icon is Generic/Default
**Possible Causes:**
- Image not loading
- Path incorrect
- Image format issue

**Solutions:**
1. Verify image loads in browser
2. Check console for errors
3. Ensure image is PNG format
4. Try accessing image directly via URL

---

## Icon Requirements for iOS

### Recommended Specifications
- **Size**: 180x180 pixels (minimum for modern iPhones)
- **Format**: PNG
- **Aspect Ratio**: Square (1:1)
- **Transparency**: Supported (iOS adds white background if needed)
- **File Size**: Under 1MB recommended (your file is 1.0M, which is fine)

### Current Configuration
- ✅ Image: 1024x1024 (perfect, will scale down)
- ✅ Format: PNG
- ✅ Path: `/img/Nagosaka.PNG`
- ✅ All sizes defined (57x57 to 180x180)
- ✅ 180x180 prioritized (first in list)

---

## Testing Checklist

- [ ] Image exists at `public/img/Nagosaka.PNG`
- [ ] Image is accessible via `/img/Nagosaka.PNG` in browser
- [ ] Image displays correctly when accessed directly
- [ ] Safari cache cleared
- [ ] Old home screen icon removed
- [ ] Re-added to home screen
- [ ] Icon preview shows Nagosaka.PNG before adding
- [ ] Icon appears correctly on home screen after adding

---

## Alternative: Use Absolute URL

If relative path doesn't work, you can try absolute URL:

```html
<link rel="apple-touch-icon" sizes="180x180" href="https://yourdomain.com/img/Nagosaka.PNG">
```

But this should only be needed for production, not development.

---

## Next Steps

1. **Clear cache and re-add** (most common fix)
2. **Verify image loads** in browser directly
3. **Check console** for any errors
4. **Test on different iPhone** if available
5. **Try different browser** (Chrome on iOS) to isolate Safari issue

---

## Notes

- iOS caches icons aggressively
- Must remove old icon before new one appears
- 180x180 is the most important size for modern iPhones
- Image should be square (1024x1024 is perfect)
- PNG format is required

If still not working after these steps, let me know and we can try alternative approaches!

