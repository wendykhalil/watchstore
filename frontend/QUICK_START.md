# Quick Start Guide - Verdant Time Store Frontend

## Running the Frontend

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Development Mode

```bash
cd frontend
npm install          # Install dependencies (only needed once)
npm run dev          # Start development server
```

The dev server will be available at:
- **Local**: `http://localhost:8443`
- **Network**: `http://0.0.0.0:8443`

The server includes:
- Hot Module Replacement (HMR) for instant updates
- Tailwind CSS with JIT compilation
- React Fast Refresh for component updates

### Production Build

```bash
npm run build        # Build for production
npm run preview      # Preview production build locally
```

Output will be in the `dist/` folder, ready for deployment.

### Code Formatting

```bash
npm run format       # Format code with oxfmt
```

---

## Project Info

- **Type**: React 19 + Vite 8 + Tailwind CSS 4
- **Language**: JavaScript (converted from TypeScript)
- **Styling**: Tailwind CSS with custom fonts
- **Build Tool**: Vite
- **Package Manager**: npm with pnpm lock file

---

## What's Inside

### Main Components
- `src/App.jsx` - Main application component
- `src/main.jsx` - Entry point
- `src/context/` - React Context providers (Store, Admin)
- `src/data/mockData.js` - Mock data for products, orders, customers

### Styling
- `src/index.css` - Tailwind CSS configuration and custom styles
- Responsive design (mobile-first)
- Dark theme with emerald accents (#00C896)

### Build Artifacts
- `dist/` - Production build output
- Development builds use Vite's default optimization

---

## Environment Variables

Optional environment variables:
- `PORT` - Port number (default: 8443)
- `FIGMA_PUBLIC_URL` - Base URL for deployment
- `FIGMA_DEV_SERVER_HOST` - Dev server host (default: 0.0.0.0)

Example:
```bash
PORT=3000 npm run dev
```

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari 12+
- Android Chrome

---

## Troubleshooting

### Port Already in Use
If port 8443 is already in use:
```bash
PORT=3000 npm run dev
```

### Cache Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Errors
```bash
npm run build -- --force
```

### Clean Build
```bash
rm -rf dist/
npm run build
```

---

## Deployment

The `dist/` folder contains static HTML, CSS, and JavaScript files ready to deploy to any static host:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any CDN or static hosting service

---

## Development Tips

- **Fast Refresh**: Changes to components update instantly without losing state
- **Source Maps**: Development builds include inline source maps for debugging
- **CSS Hot Update**: Tailwind CSS changes compile and inject without page reload
- **Network Tab**: Use browser DevTools to inspect network requests and responses

---

## Next Steps

1. **Development**: Run `npm run dev` and start building features
2. **Backend Integration**: Connect to your API endpoints
3. **Testing**: Set up testing framework (Jest, Vitest, etc.)
4. **Deployment**: Build with `npm run build` and deploy the `dist/` folder

---

For more details, see `CONVERSION_SUMMARY.md` for the TypeScript → JavaScript conversion details.
