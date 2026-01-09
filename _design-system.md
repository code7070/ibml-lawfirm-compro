# CUSTOM INSTRUCTIONS: LAW FIRM WEBSITE DESIGN SYSTEM

## Specialized in Game, eSports & Social Media Law

---

## 🎯 PROJECT OVERVIEW

Create a modern, sophisticated law firm website specializing in Game Industry, eSports, and Social Media law services. The design must reflect professionalism with a contemporary edge that appeals to digital-native clients while maintaining legal gravitas.

---

## 🎨 VISUAL DESIGN SYSTEM

### **Color Palette (STRICT)**

```css
/* Primary Colors */
--navy-darkest: #0b1b3b;
--navy-primary: #1a2f5a;
--navy-medium: #2e4472;
--navy-light: #4a639d;
--navy-accent: #76abff;

/* Gold/Brass Accent */
--gold-dark: #c0b181;
--gold-medium: #d4c5a0;
--gold-light: #e8dbbf;
--gold-pale: #fff0cc;

/* Supporting Colors */
--black-knight: #020814;
--white: #ffffff;
--gray-light: #f5f5f7;
--gray-medium: #e0e0e3;
```

**Usage Guidelines:**

- Navy spectrum: Primary backgrounds, headers, text
- Gold spectrum: Accents, CTAs, highlights, hover states
- Black Knight: Deep contrasts, footers, overlay backgrounds
- Never use colors outside this palette

---

## 📐 TYPOGRAPHY SYSTEM

### **Font Hierarchy**

```
Primary: Geometrica Sans Regular (or similar: Inter, Outfit, Space Grotesk)
Secondary: Museo 300 (or similar: Merriweather, Playfair Display)
Alternative: Roboto (for body text, forms)

Fallback Stack:
font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
```

### **Type Scale**

```css
/* Headings */
--h1: 3.5rem / 4rem (56-64px) - font-weight: 300
--h2: 2.5rem / 3rem (40-48px) - font-weight: 400
--h3: 2rem / 2.25rem (32-36px) - font-weight: 400
--h4: 1.5rem / 1.75rem (24-28px) - font-weight: 500

/* Body */
--body-large: 1.125rem (18px) - line-height: 1.7
--body-regular: 1rem (16px) - line-height: 1.6
--body-small: 0.875rem (14px) - line-height: 1.5

/* Special */
--caption: 0.75rem (12px) - letter-spacing: 0.05em
--quote: 1.25rem (20px) - font-style: italic
```

**Typography Rules:**

- Use thin/light weights (300-400) for headlines
- All-caps for section labels with letter-spacing: 0.1em
- Gold color for emphasized text, never use bold gold on dark navy
- Maintain generous line-height (1.6-1.8) for readability

---

## 🏗️ LAYOUT PRINCIPLES

### **Grid System**

- 12-column grid with 24px gutters
- Max content width: 1400px
- Responsive breakpoints: 320px, 768px, 1024px, 1440px

### **Spacing Scale**

```css
--space-xs: 8px
--space-sm: 16px
--space-md: 24px
--space-lg: 48px
--space-xl: 72px
--space-2xl: 120px
```

### **Section Padding**

- Desktop: 120px top/bottom
- Tablet: 80px top/bottom
- Mobile: 48px top/bottom

### **White Space Philosophy**

- Embrace generous negative space (like the reference images)
- Minimum 80px between major sections
- Cards/boxes should "breathe" with internal padding of 40-48px
- Never crowd elements - "sophisticated spaciousness"

---

## 🎭 COMPONENT DESIGN PATTERNS

### **1. Hero Section**

```
Style: Full-viewport height, centered content
Background: Navy gradient (#0B1B3B → #1A2F5A)
Typography: Thin headline (300 weight), gold accent line
Image treatment: Subtle overlay, conceptual photography
CTA: Gold border button with hover fill animation
```

### **2. Service Cards (3-Column Grid)**

```
Layout: Equal height cards, slight shadow
Style: White background, navy border (1px)
Icon: Geometric symbols (like compass, scales) - gold color
Typography: Navy headline, gray body text
Hover: Lift effect (translateY -8px) + shadow increase
Padding: 48px internal
```

### **3. Logo/Brand Mark Usage**

```
Primary: Abstract geometric mark (like the cross/flower symbol)
Combination: Symbol + "LAW GROUP" text
Placement: Top-left, gold on navy or navy on white
Size: 180-240px wide in header
```

### **4. Navigation Bar**

```
Style: Transparent overlay on hero, solid navy on scroll
Height: 80px
Typography: Uppercase, letter-spacing: 0.1em, 14px
Hover: Gold underline (2px, animated)
Mobile: Hamburger menu with full-screen overlay
```

### **5. Footer Pattern**

```
Background: Geometric pattern (diamond grid) on #020814
Content: 4-column layout (About, Services, Contact, Legal)
Typography: White text, gold links
Social icons: Outlined circles, gold on hover
```

### **6. Buttons & CTAs**

```css
/* Primary Button */
background: transparent;
border: 2px solid var(--gold-medium);
color: var(--gold-medium);
padding: 16px 40px;
transition: all 0.3s ease;

/* Hover State */
background: var(--gold-medium);
color: var(--navy-darkest);
transform: translateY(-2px);
```

### **7. Content Sections**

```
Pattern: Alternating white and light gray (#F5F5F7) backgrounds
Image placement: 50/50 split, image on alternating sides
Text alignment: Left-aligned, never centered for body
Max text width: 680px for optimal readability
```

---

## 📸 IMAGERY GUIDELINES

### **Photography Style**

- Conceptual/symbolic imagery (like compass, law books, abstract hands)
- Monochromatic or duo-tone treatments (navy + gold tints)
- High contrast, dramatic lighting
- Avoid generic stock photos of offices/handshakes
- Gaming context: Controllers, screens, eSports arenas (treated artistically)

### **Image Treatments**

```css
/* Overlay for text legibility */
background: linear-gradient(rgba(11, 27, 59, 0.7), rgba(11, 27, 59, 0.9));

/* Duotone effect */
filter: grayscale(100%) sepia(20%) hue-rotate(190deg) saturate(300%);

/* Hover zoom */
transform: scale(1.05);
transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
```

### **Iconography**

- Geometric, line-based icons (2px stroke weight)
- Gold color (#C0B181) for active states
- Navy (#2E4472) for inactive/default states
- 48x48px or 64x64px size for section icons
- Custom icons preferred over Font Awesome

---

## 🎮 INDUSTRY-SPECIFIC ELEMENTS

### **Gaming/eSports Visual Language**

- Subtle tech/digital patterns (circuit board inspired grids)
- Gaming controller silhouettes as decorative elements
- Pixel-art inspired decorative borders (optional, subtle)
- Stream/broadcast UI inspired information cards
- Tournament bracket visual metaphors for service hierarchies

### **Service Category Icons**

```
Game Development Law: Controller + Scale symbol
eSports Contracts: Trophy + Document symbol
Intellectual Property: Shield + Copyright symbol
Content Creator Rights: Camera + Gavel symbol
Platform Disputes: Network nodes + Balance symbol
```

---

## ⚡ INTERACTION & ANIMATION

### **Micro-interactions**

```javascript
// Smooth scroll with offset
behavior: 'smooth',
offset: -80 // header height

// Card hover
transform: translateY(-8px);
box-shadow: 0 16px 48px rgba(11, 27, 59, 0.15);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

// Button ripple effect
// Gold ripple expanding from click point

// Page transitions
// Fade-in on scroll with stagger delay for card grids
```

### **Loading States**

- Navy to gold gradient animated bar
- Fade-in content with 100ms stagger between elements
- Skeleton screens matching final layout

### **Scroll Animations**

- Parallax on hero background (0.5x scroll speed)
- Fade-in elements at 10% from viewport bottom
- Statistics counter animation when in view
- Image reveals with mask animation (left to right)

---

## 📱 RESPONSIVE BEHAVIOR

### **Breakpoint Strategy**

```css
/* Mobile First Approach */
@media (min-width: 768px) {
  /* Tablet */
}
@media (min-width: 1024px) {
  /* Desktop */
}
@media (min-width: 1440px) {
  /* Large Desktop */
}
```

### **Mobile Adaptations**

- Stack all multi-column layouts to single column
- Reduce font sizes by 20-25%
- Hero height: 100vh → 60vh
- Touch-friendly tap targets: minimum 44x44px
- Hamburger menu with slide-in navigation
- Reduce padding/margins by 40%

---

## 🎯 KEY PAGES & SECTIONS

### **Homepage Structure**

```
1. Hero Section
   - Headline: "Legal Protection for the Digital Arena"
   - Subheadline with gaming/esports focus
   - Primary CTA + Secondary CTA

2. Services Overview (3 Cards)
   - Game Development Law
   - eSports Representation
   - Content Creator Rights

3. Why Choose Us (Image + Text Split)
   - Industry expertise
   - Digital-native approach
   - Track record with gaming companies

4. Case Results / Testimonials
   - Slider format with client quotes
   - Gaming company logos (if available)

5. Latest Insights (Blog/News)
   - 3-column grid of recent articles
   - Topics: Gaming law updates, eSports regulations

6. CTA Section
   - "Ready to Level Up Your Legal Protection?"
   - Consultation booking form

7. Footer
   - Geometric pattern background
   - Quick links, services, contact
```

### **Services Page Template**

```
- Service hero with icon
- Overview paragraph
- "We Help With" list (custom styled, not bullet points)
- Process timeline (visual, numbered steps)
- Related case studies
- FAQ accordion (gold accents)
- Contact CTA
```

### **About Page Elements**

```
- Team photos: Professional but approachable
- Value proposition: "Stand by the Cause" adapted for gaming
- Industry involvement (conferences, associations)
- Client types served
```

---

## 🔧 TECHNICAL SPECIFICATIONS

### **Performance Requirements**

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total page weight: < 2MB
- Optimize images: WebP format, lazy loading
- Minify CSS/JS

### **Accessibility (WCAG 2.1 AA)**

- Color contrast ratio: minimum 4.5:1 for body text
- All interactive elements keyboard accessible
- ARIA labels for icons and custom components
- Focus indicators: 2px gold outline
- Alt text for all images

### **SEO Considerations**

- Semantic HTML5 structure
- Schema.org markup for LegalService
- Optimized meta descriptions
- H1 per page, proper heading hierarchy
- Fast loading speed

---

## 🎨 BRAND VOICE & CONTENT TONE

### **Writing Style**

- **Professional but Accessible**: Legal clarity without jargon
- **Digital-Native**: Use gaming/esports terminology naturally
- **Confident**: Assert expertise without arrogance
- **Empathetic**: "Stand by the Cause" - client-focused language

### **Example Headlines**

- ❌ Avoid: "We Provide Comprehensive Legal Services"
- ✅ Use: "Legal Power-Ups for Game Developers"
- ✅ Use: "Protecting Your Play: eSports Law Experts"
- ✅ Use: "From Indie to AAA: Legal Support That Scales"

### **CTA Language**

- "Start Your Legal Quest"
- "Level Up Your Protection"
- "Book Your Strategy Session"
- "Join the League" (for newsletter)

---

## 📋 IMPLEMENTATION CHECKLIST

### **Must-Have Features**

- [ ] Responsive navigation with smooth scroll
- [ ] Service cards with hover effects
- [ ] Contact form with validation
- [ ] Blog/insights section with filtering
- [ ] Team member profiles
- [ ] FAQ accordion
- [ ] Newsletter signup
- [ ] Social media integration
- [ ] Live chat widget (styled to match brand)
- [ ] Cookie consent banner (navy + gold)

### **Optional Enhancements**

- [ ] Case studies with before/after metrics
- [ ] Client testimonial video embeds
- [ ] Interactive service selector quiz
- [ ] Resource library with downloadable guides
- [ ] Webinar/event registration
- [ ] Multi-language support

---

## 🚫 DESIGN DON'TS

**Never:**

- Use bright, saturated colors outside the palette
- Use generic corporate stock photography
- Create cluttered layouts with too many elements
- Use more than 2 font families
- Center-align large blocks of body text
- Use drop shadows excessively (subtle only)
- Ignore the geometric pattern system
- Make buttons too small (min 44px height)
- Use Lorem Ipsum in final deliverables
- Forget mobile optimization

---

## 📚 REFERENCE & INSPIRATION

**Visual Reference:**

- The provided IBLM Law Group brand guidelines
- Minimalist legal websites with modern edge
- Gaming industry corporate sites (Riot Games, Epic Games legal pages)
- Premium SaaS product websites for interaction patterns

**Design Philosophy:**
"Where classical legal authority meets digital innovation - sophisticated, trustworthy, and built for the future of entertainment law."

---

## 🎯 SUCCESS METRICS

**Design Goals:**

1. Convey immediate credibility and expertise
2. Differentiate from traditional law firm websites
3. Appeal to gaming industry professionals
4. Encourage consultation bookings
5. Mobile conversion rate > 60% of desktop

**User Actions to Optimize:**

- Initial consultation requests
- Service page engagement time
- Resource downloads
- Newsletter signups
- Social media follows

---

## 💡 FINAL NOTES FOR AI IMPLEMENTATION

When building this website:

1. **Start with the design system** - establish colors, typography, spacing variables first
2. **Build components modularly** - reusable cards, buttons, sections
3. **Follow the visual hierarchy** - navy dominates, gold accentuates strategically
4. **Embrace white space** - don't be afraid of emptiness, it's sophisticated
5. **Test on real devices** - especially mobile gaming devices
6. **Consider dark mode** - navy is already dark, could offer true black alternative
7. **Performance first** - beautiful but fast
8. **Accessibility always** - legal sites must be accessible to all

**When in doubt:**

- Less is more
- Gold for accents only (10-15% of color usage)
- Geometric precision over organic curves
- Professional over playful (but not boring)
- Trust the system - it's designed to work
