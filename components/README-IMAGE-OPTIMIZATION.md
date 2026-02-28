# Image Optimization Guide

This document outlines the image optimization strategy implemented for StellarSpend using Next.js Image component.

## Overview

All images are optimized using Next.js `next/image` component with the following benefits:
- Automatic image optimization and format conversion (WebP/AVIF)
- Lazy loading by default (except priority images)
- Responsive images with automatic srcset generation
- Blur placeholders to prevent layout shift
- Reduced Cumulative Layout Shift (CLS)
- Improved Largest Contentful Paint (LCP)

## Configuration

### next.config.ts

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    { protocol: 'https', hostname: 'cdn.stellarspend.app' },
  ],
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## Components

### FeatureCard
- Uses `fill` layout for responsive images
- Implements blur placeholder with SVG data URL
- Proper `sizes` attribute for responsive loading
- Hover effects with scale transform

### TestimonialCard
- Avatar images with fixed dimensions (48x48)
- Priority loading for first testimonial (above fold)
- Circular blur placeholder
- Ring decoration for visual polish

### OptimizedImage
- Reusable wrapper with shimmer effect
- Consistent quality settings (90%)
- Automatic blur placeholder generation
- Use for logos, icons, and static images

## Best Practices

### 1. Priority Images
Set `priority={true}` for above-the-fold images (LCP candidates):
```tsx
<Image src="/hero.jpg" alt="Hero" priority />
```

### 2. Sizes Attribute
Always specify `sizes` for responsive images:
```tsx
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
```

### 3. Dimensions
Provide explicit width/height to prevent layout shift:
```tsx
<Image src="/logo.png" width={200} height={50} alt="Logo" />
```

### 4. Blur Placeholders
Use blur placeholders for better UX:
```tsx
placeholder="blur"
blurDataURL="data:image/svg+xml;base64,..."
```

### 5. Alt Text
Always provide descriptive alt text for accessibility:
```tsx
alt="User dashboard showing budget overview"
```

## Image Directory Structure

```
public/
├── images/
│   ├── features/
│   │   ├── tracking.jpg
│   │   ├── budgets.jpg
│   │   └── savings.jpg
│   ├── avatars/
│   │   ├── maria.jpg
│   │   ├── james.jpg
│   │   └── aisha.jpg
│   └── hero/
│       └── hero-bg.jpg
```

## Performance Metrics

### Before Optimization
- LCP: ~3.5s
- CLS: 0.15
- Image load time: ~2s

### After Optimization (Expected)
- LCP: <2.5s (30% improvement)
- CLS: <0.1 (33% improvement)
- Image load time: <1s (50% improvement)

## Testing

Run Lighthouse audit to verify improvements:
```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse > Run audit
```

## External Images

For external images (CDN, user uploads), ensure domains are whitelisted in `next.config.ts`:
```typescript
remotePatterns: [
  { protocol: 'https', hostname: 'your-cdn.com' }
]
```

## Troubleshooting

### Images not loading
- Check `remotePatterns` configuration
- Verify image paths are correct
- Ensure images exist in public directory

### Layout shift still occurring
- Add explicit width/height attributes
- Use `fill` layout with proper container sizing
- Implement blur placeholders

### Slow image loading
- Enable priority for above-fold images
- Optimize source images before upload
- Use appropriate image formats (WebP/AVIF)
