# Verdant Time Store - Testing Guide

## Quick Test Checklist

### Navigation & Scrolling
1. **Navbar Collection Link**
   - Click "Collection" in navbar
   - ✅ Should smoothly scroll to product grid section

2. **Navbar Story Link**
   - Click "Story" in navbar
   - ✅ Should smoothly scroll to story section with watch image

3. **Navbar Craftsmanship Link**
   - Click "Craftsmanship" in navbar
   - ✅ Should smoothly scroll to bento grid section

4. **Navbar Technology Link**
   - Click "Technology" in navbar
   - ✅ Should smoothly scroll to video section

5. **Navbar Contact Link**
   - Click "Contact" in navbar
   - ✅ Should smoothly scroll to footer/CTA section

6. **Hero Buttons**
   - Click "Explore Collection" button
   - ✅ Should scroll to collection section
   - Click "Discover Our Story" button
   - ✅ Should scroll to story section

---

### Search Functionality
1. **Open Search**
   - Click search icon (magnifying glass) in navbar
   - ✅ Full-screen search overlay appears with blur background
   - ✅ Search input is focused and ready for typing

2. **Search Products**
   - Type "Verdant" in search
   - ✅ Results show products matching name
   - Type "GMT"
   - ✅ Shows Obsidian GMT and other GMT products
   - Type "Tourbillon"
   - ✅ Shows Solstice Tourbillon

3. **Category Filters**
   - Click category buttons (e.g., "Chronograph")
   - ✅ Results filter by category
   - Click "All"
   - ✅ Shows all products

4. **Empty Results**
   - Type "xyz123abc"
   - ✅ Shows "No results for 'xyz123abc'" message

5. **Close Search**
   - Press ESC key
   - ✅ Search closes
   - Or click backdrop
   - ✅ Search closes

---

### Favorites (Saved)
1. **Heart Icon**
   - Click heart icon in navbar
   - ✅ FavoritesDrawer slides in from right

2. **Add to Favorites**
   - Scroll to product cards
   - Click heart on any product card
   - ✅ Heart turns green
   - ✅ Favorites count badge appears (top right of heart icon)
   - ✅ Product appears in FavoritesDrawer

3. **Remove from Favorites**
   - In FavoritesDrawer, click heart button on product
   - ✅ Product removed from favorites
   - ✅ Heart icon in card turns back to outline
   - ✅ Badge count decreases

4. **Empty Favorites**
   - Remove all favorites
   - ✅ Shows "No saved pieces" message

5. **Add from Favorites**
   - Click "Add to Cart" in FavoritesDrawer
   - ✅ Product added to cart
   - ✅ Cart opens automatically

---

### Cart Functionality
1. **Open Cart**
   - Click cart/bag icon in navbar
   - ✅ CartDrawer slides in from right
   - ✅ Shows cart count badge

2. **Add to Cart**
   - From product card, click "Add to Cart" button
   - ✅ Product added with first color
   - ✅ Cart opens automatically
   - ✅ Cart count badge increases

3. **Quantity Controls**
   - In CartDrawer, click + button next to quantity
   - ✅ Quantity increases
   - ✅ Total price updates
   - Click − button
   - ✅ Quantity decreases

4. **Color Preservation**
   - In CartDrawer, view product item
   - ✅ Shows small colored dot indicating selected color

5. **Remove from Cart**
   - Click X button on cart item
   - ✅ Item removed from cart
   - ✅ Total updates
   - ✅ Badge count decreases

6. **Empty Cart**
   - Remove all items
   - ✅ Shows "Your cart is empty" message
   - ✅ Shows "Explore Collection" button

7. **Cart Total**
   - ✅ Subtotal displays correctly
   - ✅ Shipping shows "Complimentary"
   - ✅ Total = Subtotal + $0 shipping

---

### Video Section
1. **Play Video**
   - Scroll to "Crafted to be Remembered" section
   - ✅ Shows video thumbnail with play button overlay
   - Click play button
   - ✅ Video element appears with play/pause controls
   - ✅ Play button icon changes to pause
   - ✅ Button turns green with glow

2. **Pause Video**
   - Click anywhere on the video
   - ✅ Video pauses
   - ✅ Thumbnail reappears
   - ✅ Button changes back to play icon

3. **Video Controls**
   - While playing, use native video controls
   - ✅ Can seek/scrub through video
   - ✅ Can control volume
   - ✅ Can fullscreen

---

### Product Details Modal
1. **Open Modal**
   - On any product card, click "View Details"
   - ✅ ProductModal opens (bottom sheet on mobile, centered on desktop)

2. **View Product Info**
   - ✅ Shows product name, subtitle, price
   - ✅ Shows full description
   - ✅ Shows specifications grid

3. **Image Gallery**
   - ✅ Main image displays
   - ✅ Click thumbnail images below
   - ✅ Main image updates
   - Hover image carousel, click left/right arrows
   - ✅ Images cycle through product.images

4. **Color Selection**
   - Click color swatch in modal
   - ✅ Selected color has green border
   - ✅ Swatch scales up (110%)
   - ✅ Color name displays: "Color — [Color Name]"

5. **Quantity Selection**
   - Click + button in quantity
   - ✅ Increases up to stock limit
   - Click − button
   - ✅ Decreases down to 1
   - ✅ Shows stock available

6. **Add to Cart from Modal**
   - Select color and quantity
   - Click "Add to Cart"
   - ✅ Shows "✓ Added to Cart" feedback
   - ✅ Button temporarily changes appearance

7. **Favorites in Modal**
   - Click heart button in modal
   - ✅ Heart fills with green
   - ✅ Product added to favorites
   - Click again
   - ✅ Heart becomes outline

8. **Close Modal**
   - Click X button
   - ✅ Modal closes
   - Or click outside modal area
   - ✅ Modal closes

---

### Product Cards
1. **Image Carousel**
   - Hover product card
   - ✅ Left/right arrows appear
   - Click arrow
   - ✅ Image changes smoothly with fade effect

2. **Image Dots**
   - Look for dots at bottom of image
   - Click dot
   - ✅ Jumps to that image

3. **Stock Badge**
   - On low stock product (≤5)
   - ✅ Shows "Only X left" badge (amber)
   - On sold out product
   - ✅ Shows "Sold out" badge (red)

4. **Color Swatches**
   - ✅ Shows all available colors as small circles
   - Hover color swatch
   - ✅ Scales up for better visibility

---

### Responsive Design
1. **Desktop (>1024px)**
   - ✅ 3-column product grid
   - ✅ Desktop navbar with all links
   - ✅ Modal centered on screen

2. **Tablet (768px-1024px)**
   - ✅ 2-column product grid
   - ✅ All features work
   - ✅ Modal responsive

3. **Mobile (<768px)**
   - ✅ 1-column product grid
   - ✅ Hamburger menu in navbar
   - ✅ Search, cart, favorites icons work
   - ✅ Modal is bottom sheet
   - ✅ Drawers responsive
   - ✅ Overlays properly sized

---

### Mobile Specific
1. **Hamburger Menu**
   - Click menu icon (3 lines)
   - ✅ Mobile menu slides down
   - ✅ Shows all navigation links
   - ✅ Shows "Shop Collection" button
   - Click link
   - ✅ Menu closes
   - ✅ Scrolls to section

2. **Mobile Search**
   - Click search icon
   - ✅ Search overlay works
   - ✅ Input focused
   - ✅ Results show (only first 6)

3. **Mobile Drawers**
   - Click favorites icon
   - ✅ FavoritesDrawer slides in from right
   - ✅ Takes full width
   - Click cart icon
   - ✅ CartDrawer slides in from right
   - ✅ Takes full width

---

### Build & Performance
1. **Build Status**
   - Run: `npm run build`
   - ✅ Should complete with no errors
   - ✅ 27 modules transformed
   - ✅ Assets generated (CSS & JS)

2. **Gzip Compression**
   - ✅ CSS: ~8.3 kB gzipped
   - ✅ JS: ~82 kB gzipped
   - ✅ Total: ~90 kB (reasonable for this app)

---

## Known Behavior

### Search & Filter
- Search is case-insensitive
- Searches product name, subtitle, and category
- Category filters are case-sensitive ("All", "Chronograph", etc.)
- Results limited to first 6 items in search overlay

### Cart
- Adding same product multiple times increases quantity
- Can only add to cart with one color at a time
- Must remove and re-add to change color (by design)

### Video
- Uses Unsplash video URL (may vary in availability)
- Has native browser video controls when playing
- Can go fullscreen on desktop

### State
- All state is in-memory (resets on page refresh)
- No persistence (as expected with mock data)
- Cart, favorites, search reset on refresh

---

## Troubleshooting

### Search not opening?
- Check if `setSearchOpen` is properly connected in Navbar
- Verify SearchOverlay is rendered in App.jsx

### Favorites not updating?
- Clear browser cache
- Check StoreContext provides `toggleFavorite`
- Verify `favorites` state in context

### Cart not persisting?
- This is expected behavior with mock data
- Cart resets on refresh (designed this way)

### Modal not closing?
- Check if clicking outside or X button registers
- Verify `setSelectedProduct(null)` is called

### Smooth scroll not working?
- Browser must support `scrollIntoView({ behavior: 'smooth' })`
- Check if section IDs exist in HTML
- Some older browsers need polyfill

---

## Feature Completeness

✅ = Implemented and working
🟡 = Partially implemented
❌ = Not implemented (out of scope)

| Feature | Status | Notes |
|---------|--------|-------|
| Navbar Links | ✅ | All 5 links work with smooth scroll |
| Search | ✅ | Full search with category filters |
| Favorites | ✅ | Add/remove/drawer fully functional |
| Cart | ✅ | Add/remove/qty/total all working |
| Video Play/Pause | ✅ | Toggle works with actual video |
| Product Modal | ✅ | Full details, color, qty, add to cart |
| Responsive | ✅ | Desktop, tablet, mobile all working |
| Product Filter/Sort | ✅ | Category and sort options available |
| Smooth Scrolling | ✅ | All CTA buttons and nav use smooth scroll |
| Mobile Menu | ✅ | Hamburger menu with all features |

---

## Start Testing!

1. Run `npm run build` to verify no errors
2. Run `npm run dev` to start dev server
3. Open http://localhost:5173 (or whatever port shows)
4. Go through each section of this checklist
5. Test on different screen sizes (desktop, tablet, mobile)

All features should now be working perfectly! 🎉
