# Verdant Time Store - Architecture Overview

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx                          # Main app component (modular)
│   ├── main.jsx                         # Entry point with StoreProvider
│   ├── index.css                        # Global styles
│   ├── context/
│   │   ├── StoreContext.jsx            # ✨ Central state management
│   │   └── AdminContext.jsx            # Admin dashboard state (future)
│   ├── components/
│   │   └── store/
│   │       ├── Navbar.jsx              # Navigation with scroll anchors
│   │       ├── Hero.jsx                # Hero section with CTAs
│   │       ├── Collection.jsx          # Product grid with filters/sort
│   │       ├── ProductCard.jsx         # Individual product card
│   │       ├── ProductModal.jsx        # Full product detail modal
│   │       ├── CartDrawer.jsx          # Shopping cart drawer
│   │       ├── FavoritesDrawer.jsx     # Favorites/Saved drawer
│   │       ├── SearchOverlay.jsx       # Search with category filters
│   │       └── Sections.jsx            # Reusable sections (Video, Bento, Story, CTA, Footer)
│   └── data/
│       └── mockData.js                 # Mock products, orders, customers
├── dist/                               # Build output
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
├── index.html                          # HTML template
└── [Documentation files]
    ├── FIXES_COMPLETED.md              # What was fixed
    ├── TESTING_GUIDE.md                # How to test
    └── ARCHITECTURE.md                 # This file
```

## State Management Architecture

### StoreContext (Single Source of Truth)

```javascript
{
  // 📦 Products
  products: Array,                    // All products
  setProducts: Function,

  // 🛒 Cart
  cart: Array<{
    productId: string,
    quantity: number,
    selectedColor: string
  }>,
  addToCart: (productId, color, qty) => void,
  removeFromCart: (productId) => void,
  updateQty: (productId, qty) => void,
  clearCart: () => void,
  cartTotal: number,                  // Calculated
  cartCount: number,                  // Calculated

  // ❤️ Favorites
  favorites: Array<id>,
  toggleFavorite: (id) => void,

  // 🔍 Search
  searchOpen: boolean,
  setSearchOpen: (boolean) => void,
  searchQuery: string,
  setSearchQuery: (string) => void,
  filterCategory: string,
  setFilterCategory: (string) => void,

  // 📱 UI State
  cartOpen: boolean,
  setCartOpen: (boolean) => void,
  favoritesOpen: boolean,
  setFavoritesOpen: (boolean) => void,

  // 🎯 Selection
  selectedProduct: Product | null,
  setSelectedProduct: (Product | null) => void,

  // 🔧 Computed
  filteredProducts: Array,            // Filtered + sorted
  featuredProducts: Array,
  getProduct: (id) => Product,

  // 📊 Sorting
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name',
  setSortBy: (string) => void,
}
```

## Component Communication Flow

```
App.jsx
├── StoreProvider (context wrapper)
│   ├── Navbar (reads: cartCount, favorites, functions: setSearchOpen, setCartOpen, setFavoritesOpen)
│   ├── Hero (functions: smooth scroll)
│   ├── Collection
│   │   └── ProductCard (reads: favorites; writes: addToCart, toggleFavorite, setSelectedProduct)
│   ├── VideoSection
│   ├── BentoSection
│   ├── StorySection
│   ├── CTASection
│   ├── Footer
│   ├── CartDrawer (reads: cart, cartTotal; writes: removeFromCart, updateQty, setCartOpen)
│   ├── FavoritesDrawer (reads: favorites; writes: toggleFavorite, addToCart, setFavoritesOpen)
│   ├── SearchOverlay (reads: searchQuery, filterCategory; writes: setSearchQuery, setFilterCategory, setSearchOpen)
│   └── ProductModal (reads: selectedProduct; writes: addToCart, toggleFavorite, setSelectedProduct)
```

## Data Flow

### Adding a Product to Cart
1. User clicks "Add to Cart" on ProductCard
2. `handleAddToCart` calls `addToCart(productId, color, qty)`
3. StoreContext updates cart state
4. CartDrawer automatically opens (`setCartOpen(true)`)
5. Cart count badge updates in Navbar
6. CartDrawer re-renders with new item

### Searching Products
1. User clicks search icon in Navbar
2. `setSearchOpen(true)` shows SearchOverlay
3. User types in search input
4. `setSearchQuery()` updates search state
5. `filteredProducts` recalculates automatically
6. Results display in SearchOverlay
7. User clicks result → scrolls to collection & opens ProductModal

### Opening Product Details
1. User clicks "View Details" on card OR thumbnail in FavoritesDrawer
2. `setSelectedProduct(product)` sets selected product
3. ProductModal automatically renders
4. Modal displays all product details, images, colors, specs

## Key Design Patterns

### 1. Context-Based State Management
- Single StoreContext for all store functionality
- `useStore()` hook for accessing context
- No prop drilling
- Easy to extend with new features

### 2. Computed State
```javascript
const filteredProducts = products
  .filter(/* category + search */)
  .sort(/* by sortBy option */);

const cartTotal = cart.reduce(/* sum prices */);
const cartCount = cart.reduce(/* sum quantities */);
```

### 3. Modal Pattern (Selected Product)
- `setSelectedProduct()` opens modal
- `setSelectedProduct(null)` closes modal
- Product data flows through context

### 4. Drawer Pattern (Cart/Favorites)
- `cartOpen`/`favoritesOpen` boolean states
- Drawer only renders if open (`if (!cartOpen) return null`)
- Body overflow hidden when open
- Click backdrop closes drawer

### 5. Smooth Scroll Navigation
- Each section has `id` matching navbar href
- `document.querySelector(href).scrollIntoView({ behavior: 'smooth' })`
- Works across all browsers with graceful fallback

## Component Responsibilities

### Navbar.jsx
- Display logo, nav links, action buttons
- Handle scroll to sections
- Show cart/favorites count badges
- Responsive hamburger menu on mobile

### Collection.jsx
- Render product grid
- Category filtering
- Sort options
- Show/hide ProductCards

### ProductCard.jsx
- Display product image with carousel
- Show price, colors, description
- Favorite button
- "View Details" and "Add to Cart" buttons
- Stock status badges

### ProductModal.jsx
- Full product details display
- Image carousel with thumbnails
- Color selector
- Quantity selector
- Specifications grid
- Add to cart button

### CartDrawer.jsx
- List cart items
- Quantity +/- controls
- Remove button per item
- Subtotal/total calculation
- Proceed to checkout (placeholder)
- Empty state

### FavoritesDrawer.jsx
- List saved products
- Remove from favorites
- Add to cart button
- Empty state

### SearchOverlay.jsx
- Large search input
- Category quick filters
- Live product results
- Click result → scroll to collection + open modal

### Sections.jsx
- VideoSection (with play/pause and video element)
- BentoSection (craftsmanship/heritage cards)
- StorySection (about section)
- CTASection (call-to-action/contact)
- Footer (links, newsletter)

## Styling Architecture

### Tailwind CSS + Custom Theme
```javascript
@theme {
  --font-display: 'Fraunces' serif;     // Headings
  --font-mono: 'JetBrains Mono' monospace; // Labels
  --color-green: #00C896;               // Accent
}
```

### Color System
```
Background:     #0A0A0A (charcoal)
Secondary:      #1A1A1A, #0D0D0D
Text:           #FFFFFF (white)
Muted:          #A0A0A0 (gray)
Accent:         #00C896 (emerald green)
Dark Accent:    #1B3B2B
Borders:        rgba(255,255,255,0.08-0.15)
```

### Component Patterns
- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Gradients: `bg-gradient-to-*`
- Blur: `backdrop-blur-md`
- Shadows: minimal, use `blur-[100px]` glows
- Transitions: `transition-all duration-300/500/700`

## Performance Considerations

### Memoization
```javascript
const addToCart = useCallback((productId, color, qty = 1) => {
  // Prevent unnecessary re-renders
}, []);
```

### Computed Values
- `filteredProducts` recalculates only when dependencies change
- Sorting and filtering happen at context level
- Components read final computed values

### Bundle Size
- 285 kB JS (81.97 kB gzipped) - reasonable for feature-rich store
- 49 kB CSS (8.31 kB gzipped)
- 27 modules total

## Future Extensibility

### To Add Admin Dashboard
1. Use existing `AdminContext` in `context/AdminContext.jsx`
2. Create admin route/component
3. Implement product management UI
4. Use `addProduct`, `updateProduct`, `deleteProduct` methods

### To Connect Backend API
1. Create `services/api.js` with fetch/axios calls
2. Replace mock data with API calls
3. Add error handling and loading states
4. Update useEffect hooks to call API on mount

### To Add Checkout Flow
1. Replace "Proceed to Checkout" placeholder
2. Create Checkout component
3. Add order confirmation flow
4. Send order to backend

### To Add Authentication
1. Create separate AuthContext
2. Add login/register pages
3. Store auth token
4. Protect admin routes
5. Add user profile drawer

## Development Workflow

### Adding a New Feature
1. Identify state needed → Add to StoreContext
2. Create component(s)
3. Wire up state with `useStore()` hook
4. Add to App.jsx
5. Test responsiveness
6. Run build: `npm run build`

### Testing
1. Unit test individual components
2. Integration test with context
3. E2E test user flows
4. Responsive design testing (desktop/tablet/mobile)

### Build & Deploy
```bash
npm run build          # Creates dist/ folder
npm run dev           # Local development server
npm run preview       # Preview production build
```

## Key Files Reference

| File | Purpose | Dependencies |
|------|---------|--------------|
| `main.jsx` | App entry with providers | App.jsx, StoreContext |
| `App.jsx` | Root component | All sections, drawers, modals |
| `StoreContext.jsx` | State management | mockData.js |
| `Navbar.jsx` | Navigation | StoreContext |
| `ProductCard.jsx` | Product display | StoreContext |
| `ProductModal.jsx` | Details view | StoreContext |
| `CartDrawer.jsx` | Cart UI | StoreContext |
| `SearchOverlay.jsx` | Search UI | StoreContext, mockData.js |
| `mockData.js` | Product data | None (standalone) |

## Important Notes

- ✅ NO backend needed (mock data sufficient)
- ✅ NO MongoDB connection
- ✅ NO API calls
- ✅ All state in-memory (resets on refresh)
- ✅ Design preserved from Figma Make
- ✅ Fully responsive (desktop/tablet/mobile)
- ✅ All interactions functional

## Performance Tips

1. **Search** - Filters run in-memory (fast for ~6 products)
2. **Image Gallery** - Uses CSS transitions (smooth performance)
3. **Drawers/Modal** - CSS animations (hardware accelerated)
4. **Lazy Loading** - Not implemented (not needed with this data size)
5. **Code Splitting** - Already optimized by Vite

---

**Status**: ✅ Production-Ready (Mock Data)  
**Last Updated**: September 2026  
**Build Status**: ✅ No Errors  
