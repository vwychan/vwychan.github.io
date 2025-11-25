# Quick Start Guide

## 🚀 Starting the Development Server

### Step 1: Install Dependencies (if not already done)
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The server will:
- Start on `http://localhost:3000`
- Automatically open in your browser
- Hot-reload when you make changes

### Step 3: View Your Site
Open your browser and navigate to:
- **Local**: `http://localhost:3000`
- The page should display your travel booklet with:
  - Background image (Nagosaka_bg.jpeg)
  - Navigation tabs
  - All day pages
  - Time adjustment functionality

---

## 📋 Available Commands

### Development
```bash
npm run dev          # Start development server (port 3000)
```

### Build for Production
```bash
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

---

## 🔍 Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically try the next available port (3001, 3002, etc.)

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Background Image Not Showing
- Check that `public/img/Nagosaka_bg.jpeg` exists
- Verify the path in `src/styles/base.css` is correct
- Check browser console for 404 errors

### JavaScript Errors
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

---

## 📁 Project Structure

```
.
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── public/                 # Static assets
│   ├── img/               # Images (background, icons)
│   └── manifest.json      # PWA manifest
├── src/                    # Source code
│   ├── main.js            # Entry point
│   ├── services/          # JavaScript services
│   │   ├── NavigationService.js
│   │   ├── TimeAdjustmentService.js
│   │   └── StorageService.js
│   ├── utils/             # Utility functions
│   │   └── timeUtils.js
│   └── styles/            # CSS files
│       ├── main.css       # Main stylesheet (imports all)
│       ├── variables.css  # CSS variables
│       ├── base.css       # Base styles
│       ├── components.css # Component styles
│       └── responsive.css # Mobile styles
└── dist/                   # Production build (generated)
```

---

## ✅ What to Check

When the dev server starts, verify:

1. **Page Loads**: The travel booklet appears
2. **Background Image**: Nagosaka_bg.jpeg displays correctly
3. **Navigation**: Click tabs to switch between days
4. **Time Adjustment**: Click on time elements to adjust
5. **Mobile View**: Resize browser or use DevTools mobile view
6. **No Console Errors**: Check browser console (F12)

---

## 🎯 Next Steps

Once the dev server is running:

1. Make changes to files in `src/`
2. Changes will hot-reload automatically
3. Check the browser to see updates
4. Use browser DevTools to debug

---

## 📝 Notes

- **Development**: Uses `npm run dev` (Vite dev server)
- **Production**: Uses `npm run build` (creates optimized `dist/` folder)
- **Base Path**: Configured for GitHub Pages (`/vwychan.github.io/`)
- **Port**: Default is 3000 (auto-increments if busy)

