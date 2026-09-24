Create a premium, modern, cinematic **single-page luxury watch store website** called **"VERDANT TIME"**.

The website must be designed as a real production-ready ecommerce landing page for a future **MERN Stack project (React + Express + MongoDB)**.

The main goal is to create a visually impressive but clean website that can later be implemented in React.

## DESIGN DIRECTION

Use a dark luxury aesthetic with black and deep green as the main visual identity.

### Color palette

* Primary background: #0A0A0A
* Secondary background: #1A1A1A
* Primary accent green: #00C896
* Dark green accent: #1B3B2B
* White text: #FFFFFF
* Secondary text: #A0A0A0
* Green charcoal sections: #1F332C

Use green mainly for important actions, highlights, active states, borders, and small visual accents.

Do not make the entire website green. Keep the design mostly black and dark, with green used carefully as an accent.

The visual style should feel:

* Luxury
* Minimal
* Cinematic
* Premium
* Modern
* Sophisticated
* Technology-focused

Avoid a generic ecommerce template.

Use large typography, strong spacing, high-quality watch photography, subtle gradients, glass effects only when useful, and elegant micro-interactions.

---

# PAGE STRUCTURE

## 1. HEADER / NAVBAR

Create a sticky transparent/dark navbar.

Left:

* Minimal luxury logo: "VERDANT TIME"

Center:

* Collection
* Story
* Craftsmanship
* Technology
* Contact

Right:

* Search icon
* Favorite/heart icon
* Shopping bag icon
* "Shop Collection" green button

The navbar should become more solid/dark when scrolling.

For mobile:

* Logo
* Favorite icon
* Shopping bag icon
* Hamburger menu

Make the navigation responsive and clean.

---

# 2. HERO SECTION

Create a full-width cinematic hero section.

Layout:

Left side:

* Small uppercase label: "PRECISION IN EVERY SECOND"
* Large headline:
  "TIME, REIMAGINED."
* Short premium description about the watch.
* Primary CTA: "Explore Collection"
* Secondary CTA: "Discover Our Story"

Right side:

* Large premium luxury watch image or 3D-style watch render.
* The watch should be the visual focus.
* Use a dark background with subtle green glow around selected details.

Add small product information around the watch:

* Automatic movement
* Sapphire crystal
* 100M water resistance

The hero should feel like a luxury watch advertisement rather than a normal ecommerce website.

Add subtle entrance animations and hover effects.

---

# 3. FEATURED WATCHES SECTION

Create a section titled:

"THE COLLECTION"

Subtitle:
"Designed for those who value every second."

Display several premium watch product cards.

Each card should include:

* Large watch image
* Product name
* Short description
* Price
* Available colors
* Favorite/heart button
* Left and right image navigation arrows
* Small image indicators/dots
* "View Details" button

IMPORTANT:

Each watch product can have multiple images.

The card should visually support changing between product images using left/right arrows.

Example:
Image 1 → front view
Image 2 → side view
Image 3 → wrist view
Image 4 → detail view

Add subtle transitions between images.

Make the cards premium and spacious, not crowded.

Use dark charcoal cards with subtle borders and green hover states.

On desktop:

* Show 3 product cards per row.

On tablet:

* Show 2 cards per row.

On mobile:

* Show 1 card per row.

---

# 4. CINEMATIC WATCH VIDEO SECTION

Create a full-width cinematic section.

Use a large rounded rectangular container occupying almost the entire page width.

This section will later contain a **4K AI-generated watch advertisement video**.

Design it as a real video presentation area.

Add:

* Large video placeholder
* Dark cinematic overlay
* Play button
* Small "WATCH THE FILM" label
* Large title:
  "CRAFTED TO BE REMEMBERED."
* Short description

The video should visually dominate the section.

Use subtle green lighting/glow and dark gradients.

The design must work with either a landscape video or a cinematic 16:9 video.

---

# 5. BRAND / CRAFTSMANSHIP BENTO SECTION

Create a modern bento-grid section.

Title:
"ENGINEERED WITH PURPOSE."

Create:

One large card:

* 100% width
* Large watch visual
* Short story about the brand/craftsmanship
* Premium editorial composition

Under it, create two cards:

* 50% width each

Card 1:
"PRECISION"
Show a close-up of the watch movement/details.

Card 2:
"MATERIALS"
Show premium materials such as sapphire crystal, stainless steel, leather, or titanium.

Use different image compositions and subtle green accents.

Add small technical specifications where appropriate.

The bento grid should feel editorial and premium, not like a normal ecommerce grid.

---

# 6. PRODUCT PHILOSOPHY / STORY SECTION

Add a short editorial section explaining the philosophy of the brand.

Example headline:

"BUILT FOR EVERY MOMENT."

Use a large typography layout with a premium watch image.

Keep the text short and elegant.

Add a small green accent line or decorative element.

---

# 7. FINAL CTA SECTION

Create a strong final call-to-action before the footer.

Headline:

"FIND YOUR TIME."

Description:
"Discover the collection created for those who never compromise on precision."

Add:
"Explore Collection"

Use a dark green/black background with a subtle premium watch visual.

Make this section visually memorable.

---

# 8. FOOTER

Create a premium dark footer.

Include:

Logo:
"VERDANT TIME"

Navigation:

* Collection
* Story
* Craftsmanship
* Technology
* Contact

Customer:

* Shipping
* Returns
* FAQ

Social:

* Instagram
* Facebook
* TikTok

Newsletter:
"Stay in time."
Email input
"Subscribe" button

Bottom:
"© 2026 Verdant Time. All rights reserved."

---

# RESPONSIVE DESIGN

The website MUST be fully responsive.

Create desktop, tablet, and mobile layouts.

Desktop:

* Large cinematic compositions
* Spacious sections
* 3 product cards per row

Tablet:

* 2 product cards per row
* Adjust typography and spacing

Mobile:

* 1 product card per row
* Collapsed navigation
* Properly scaled hero
* Video remains responsive
* Bento grid becomes a vertical layout
* Buttons become easy to tap
* No horizontal scrolling

Do not simply shrink the desktop design. Reorganize sections intelligently for mobile.

---

# INTERACTIONS AND ANIMATIONS

Design the UI so it can later be implemented with React and an animation library such as Framer Motion or GSAP.

Include ideas for:

* Smooth hero entrance
* Product card hover animations
* Image carousel transitions
* Button hover effects
* Navbar scroll behavior
* Smooth section transitions
* Subtle parallax effects
* Video play interaction
* Favorite button interaction
* Scroll reveal animations

Keep animations elegant and premium.

Avoid excessive animations.

---

# UI DETAILS

Use:

* Large premium typography
* Rounded corners around 12–24px
* Thin subtle borders
* Dark gradients
* Soft green glow
* High-quality watch imagery
* Strong visual hierarchy
* Generous whitespace
* Consistent spacing

Buttons should have clear hover and active states.

Use accessible contrast between text and background.

Do not use excessive cards everywhere.

The page should feel like a **luxury watch brand website**, not a generic dashboard or basic ecommerce template.

---

# FUTURE MERN IMPLEMENTATION

The design should be structured so that later the static content can be replaced by API data.

Products will eventually come from:

GET /api/products

Each product can contain:

* name
* price
* description
* colors
* images
* specifications
* featured status

The hero video can later come from a backend/API setting.

The product image carousel should be designed so its images can later come from an array returned by the API.

The final design should therefore clearly separate:

* reusable product components
* hero section
* video section
* bento sections
* CTA
* footer

Make the final result polished enough to be presented as a professional junior developer portfolio project.
