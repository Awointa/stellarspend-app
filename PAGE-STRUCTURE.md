# Landing Page Structure

## Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    HERO SECTION                         │
│                  (Canvas Starfield)                     │
│                                                         │
│   ┌─────────────────────────────────────────────┐      │
│   │  Built on Stellar Badge                     │      │
│   │  "Take full control of your money"          │      │
│   │  Subheading text                            │      │
│   │  [Get Started] [Read Docs]                  │      │
│   │  Stats: 0.01¢ | 9 Languages | No KYC        │      │
│   └─────────────────────────────────────────────┘      │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                  FEATURES SECTION                       │
│              "Built for everyone"                       │
│                                                         │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│   │  [IMG]   │  │  [IMG]   │  │  [IMG]   │            │
│   │ Tracking │  │ Budgets  │  │ Savings  │            │
│   │  Card    │  │   Card   │  │   Card   │            │
│   └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                                                         │
│               TESTIMONIALS SECTION                      │
│            "Trusted by thousands"                       │
│                                                         │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│   │ [Avatar] │  │ [Avatar] │  │ [Avatar] │            │
│   │  Quote   │  │  Quote   │  │  Quote   │            │
│   │  Maria   │  │  James   │  │  Aisha   │            │
│   └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
app/page.tsx
├── Hero (components/hero/Hero.tsx)
│   ├── Starfield (Canvas animation)
│   ├── Badge
│   ├── Headline
│   ├── CTA Buttons
│   └── Stats
│
├── FeaturesSection (components/features/FeaturesSection.tsx)
│   ├── Section Header
│   └── FeatureCard × 3 (components/features/FeatureCard.tsx)
│       ├── Image (next/image with optimization)
│       ├── Title
│       └── Description
│
└── TestimonialsSection (components/testimonials/TestimonialsSection.tsx)
    ├── Section Header
    └── TestimonialCard × 3 (components/testimonials/TestimonialCard.tsx)
        ├── Avatar Image (next/image with optimization)
        ├── Quote
        ├── Author Name
        └── Role
```

## Image Optimization Points

### Hero Section
- **Current**: Canvas-based starfield (no images)
- **LCP**: Text renders immediately
- **CLS**: 0 (no layout shift)
- **Optional**: Can add background image with `priority={true}`

### Features Section
- **Images**: 3 feature images (400×300)
- **Optimization**: 
  - `fill` layout for responsive sizing
  - Blur placeholders
  - Lazy loading (below fold)
  - `sizes="(max-width: 768px) 100vw, 33vw"`

### Testimonials Section
- **Images**: 3 avatar images (48×48)
- **Optimization**:
  - Fixed dimensions
  - First avatar has `priority={true}`
  - Circular blur placeholders
  - `sizes="48px"`

## Performance Strategy

### Above the Fold (Hero)
```
Priority: HIGH
Strategy: Immediate render
- Canvas animation (instant)
- Text content (instant)
- No image loading delay
Result: Fast LCP (<1s)
```

### Below the Fold (Features, Testimonials)
```
Priority: NORMAL
Strategy: Lazy load with placeholders
- Images load when entering viewport
- Blur placeholders prevent layout shift
- Progressive enhancement
Result: Optimized bandwidth, no CLS
```

## File Locations

```
app/
└── page.tsx ........................... Main landing page

components/
├── hero/
│   ├── Hero.tsx ....................... Hero section
│   └── README.md ...................... Hero documentation
│
├── features/
│   ├── FeatureCard.tsx ................ Individual feature card
│   └── FeaturesSection.tsx ............ Features grid section
│
├── testimonials/
│   ├── TestimonialCard.tsx ............ Individual testimonial
│   └── TestimonialsSection.tsx ........ Testimonials grid
│
├── common/
│   └── OptimizedImage.tsx ............. Reusable image wrapper
│
└── dashboard/
    └── DashboardCard.tsx .............. Dashboard card example

public/
└── images/
    ├── features/
    │   ├── tracking.jpg ............... Feature image 1
    │   ├── budgets.jpg ................ Feature image 2
    │   └── savings.jpg ................ Feature image 3
    │
    └── avatars/
        ├── maria.jpg .................. Testimonial avatar 1
        ├── james.jpg .................. Testimonial avatar 2
        └── aisha.jpg .................. Testimonial avatar 3
```

## Responsive Behavior

### Mobile (<768px)
```
Hero:        Full width, stacked content
Features:    Single column, 100vw images
Testimonials: Single column, full width
```

### Tablet (768px-1024px)
```
Hero:        Full width, centered content
Features:    2 columns, 50vw images
Testimonials: 2 columns
```

### Desktop (>1024px)
```
Hero:        Full width, centered content
Features:    3 columns, 33vw images
Testimonials: 3 columns
```

## Image Loading Timeline

```
Page Load
    ↓
Hero Renders (0ms)
    ↓
User Scrolls
    ↓
Features Enter Viewport (lazy load triggered)
    ↓
Feature Images Load (blur → full image)
    ↓
User Scrolls
    ↓
Testimonials Enter Viewport (lazy load triggered)
    ↓
Avatar Images Load (blur → full image)
```

## Core Web Vitals Impact

### LCP (Largest Contentful Paint)
- **Target**: <2.5s
- **Strategy**: Hero text renders immediately (no image dependency)
- **Result**: Fast LCP, no waiting for images

### CLS (Cumulative Layout Shift)
- **Target**: <0.1
- **Strategy**: 
  - Explicit dimensions on all images
  - Blur placeholders
  - Proper container sizing
- **Result**: Zero layout shift

### FID (First Input Delay)
- **Target**: <100ms
- **Strategy**: Lazy loading reduces initial JavaScript
- **Result**: Fast interactivity

## Testing Checklist

- [ ] Hero renders immediately without images
- [ ] Feature images lazy load when scrolling
- [ ] Testimonial avatars lazy load when scrolling
- [ ] No layout shift when images load
- [ ] Images serve as WebP/AVIF in modern browsers
- [ ] Blur placeholders show during loading
- [ ] Responsive images load correct sizes
- [ ] Lighthouse Performance score >90
