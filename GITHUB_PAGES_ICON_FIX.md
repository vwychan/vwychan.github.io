# GitHub Pages Icon Fix

## The Problem

GitHub Pages can have path issues with icons, especially when:
1. Using a base path in `vite.config.js`
2. Files in `public/` folder need correct paths
3. iOS Safari caches icons aggressively

## Solution: Use Relative Paths or Correct Base Path

### Option 1: Check Your GitHub Pages URL

**If your repo is named `vwychan.github.io`:**
- Your site is at: `https://vwychan.github.io/`
- Use `base: '/'` in vite.config.js

**If your repo is named something else (e.g., `my-travel-site`):**
- Your site is at: `https://vwychan.github.io/my-travel-site/`
- Use `base: '/my-travel-site/'` in vite.config.js

### Option 2: Use Absolute Paths in HTML

For icons, you can use absolute paths that work on both dev and production:

```html
<!-- Use full URL for production -->
<link rel="apple-touch-icon" sizes="180x180" href="https://vwychan.github.io/img/Nagosaka.PNG">
```

But this only works for production, not development.

### Option 3: Use Relative Paths (Recommended)

Change icon paths to be relative (without leading slash):

```html
<link rel="apple-touch-icon" sizes="180x180" href="img/Nagosaka.PNG">
```

This works because:
- Development: Vite serves from root
- Production: Vite handles base path automatically

---

## Current Configuration

Your `vite.config.js` has:
```javascript
base: '/vwychan.github.io/'
```

This means:
- **Development**: Icons at `/img/Nagosaka.PNG` (works)
- **Production**: Icons need to be at `/vwychan.github.io/img/Nagosaka.PNG`

**But** files in `public/` folder should work at root regardless of base path.

---

## Recommended Fix

### Step 1: Verify Your GitHub Pages URL

Check what your actual GitHub Pages URL is:
- Go to your repo on GitHub
- Settings → Pages
- Check the URL shown

### Step 2: Update vite.config.js

**If repo is `vwychan.github.io` (served at root):**
```javascript
base: '/'
```

**If repo is something else (served at `/repo-name/`):**
```javascript
base: '/repo-name/'
```

### Step 3: Keep Icon Paths as `/img/Nagosaka.PNG`

Files in `public/` folder are always served at root, so `/img/Nagosaka.PNG` should work.

---

## Testing

### Development
1. Run `npm run dev`
2. Check: `http://localhost:3000/img/Nagosaka.PNG`
3. Should display the image

### Production (GitHub Pages)
1. Build: `npm run build`
2. Deploy to GitHub Pages
3. Check: `https://vwychan.github.io/img/Nagosaka.PNG`
4. Should display the image

### iPhone
1. Clear Safari cache
2. Remove old home screen icon
3. Visit your GitHub Pages site
4. Add to home screen
5. Icon should appear

---

## Alternative: Use Base Tag

You can also add a `<base>` tag in HTML:

```html
<head>
    <base href="/vwychan.github.io/">
    <!-- or -->
    <base href="/">
</head>
```

But this can cause issues with routing, so use with caution.

---

## Quick Fix

The easiest solution is to:

1. **Check your actual GitHub Pages URL**
2. **Update `base` in vite.config.js** to match
3. **Keep icon paths as `/img/Nagosaka.PNG`** (public folder files work at root)
4. **Clear iPhone cache and re-add** to home screen

---

## Why This Happens

- GitHub Pages serves files differently based on repo name
- Vite's base path affects how assets are resolved
- Files in `public/` should work at root, but base path can interfere
- iOS caches icons, so changes might not appear immediately

---

## Next Steps

1. Verify your GitHub Pages URL
2. Update `base` in vite.config.js if needed
3. Test icon loads at: `https://your-github-pages-url/img/Nagosaka.PNG`
4. Clear iPhone cache and re-add to home screen

If still not working, we can try using relative paths or a different approach!

