# Loading System Documentation

This project now includes a comprehensive loading system with skeleton animations and lazy loading for all images.

## Components

### LazyImage
A reusable component that provides lazy loading and skeleton loading for images.

```tsx
import { LazyImage } from './components/ui/lazy-image';

<LazyImage 
  src="/path/to/image.jpg" 
  alt="Description"
  className="custom-classes"
  containerClassName="container-classes"
  skeletonClassName="skeleton-classes"
  aspectRatio="aspect-[3/4]"
  showSkeleton={true}
  showSpinner={false}
  loadingText="Loading..."
/>
```

**Props:**
- `src`: Image source URL
- `alt`: Alt text for accessibility
- `className`: Additional CSS classes for the image
- `containerClassName`: CSS classes for the container
- `skeletonClassName`: CSS classes for the skeleton
- `aspectRatio`: Tailwind aspect ratio class (default: "aspect-[3/4]")
- `showSkeleton`: Show skeleton loading animation (default: true)
- `showSpinner`: Show loading spinner (default: false)
- `loadingText`: Text to display with spinner

### Skeleton
Enhanced skeleton component with multiple variants.

```tsx
import { Skeleton } from './components/ui/skeleton';

// Default skeleton
<Skeleton className="w-full h-32" />

// Image skeleton
<Skeleton variant="image" className="w-full h-64" />

// Text skeleton
<Skeleton variant="text" lines={3} className="w-full" />

// Avatar skeleton
<Skeleton variant="avatar" className="w-12 h-12" />
```

**Variants:**
- `default`: Basic skeleton with pulse animation
- `image`: Optimized for image placeholders with shimmer effect
- `text`: Multi-line text skeleton
- `avatar`: Circular skeleton for avatars

### LoadingSpinner
Simple loading spinner component.

```tsx
import { LoadingSpinner } from './components/ui/loading-spinner';

<LoadingSpinner size="md" text="Loading..." />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: Additional CSS classes
- `text`: Optional loading text

## Hooks

### useLoading
Custom hook for managing loading states.

```tsx
import { useLoading } from './hooks/use-loading';

const { isLoading, setLoading } = useLoading({
  initialDelay: 1000,
  minLoadingTime: 2000,
  onLoadingComplete: () => console.log('Loading complete')
});
```

**Options:**
- `initialDelay`: Delay before starting to load (ms)
- `minLoadingTime`: Minimum loading time (ms)
- `onLoadingComplete`: Callback when loading completes

## Skeleton Components

### SketchTimelineSkeleton
Pre-built skeleton for the sketch timeline section.

### HeroSectionSkeleton
Pre-built skeleton for the hero section.

## Features

### Lazy Loading
- Images only load when they come into view
- Uses Intersection Observer API
- Configurable root margin for early loading
- Automatic cleanup of observers

### Skeleton Animations
- Smooth pulse animations
- Shimmer effect for image skeletons
- Gradient backgrounds for better visual appeal
- Responsive design

### Error Handling
- Graceful fallback for failed image loads
- Error state with placeholder content
- Accessible error messages

### Performance
- Minimal bundle size impact
- Efficient intersection observer usage
- Automatic cleanup of event listeners
- Optimized re-renders

## Usage Examples

### Basic Image with Skeleton
```tsx
<LazyImage 
  src="/images/sketch.jpg" 
  alt="Sketch"
  showSkeleton={true}
/>
```

### Image with Spinner
```tsx
<LazyImage 
  src="/images/sketch.jpg" 
  alt="Sketch"
  showSkeleton={false}
  showSpinner={true}
  loadingText="Loading sketch..."
/>
```

### Custom Aspect Ratio
```tsx
<LazyImage 
  src="/images/sketch.jpg" 
  alt="Sketch"
  aspectRatio="aspect-square"
/>
```

### Section Loading State
```tsx
const { isLoading } = useLoading({
  initialDelay: 1000,
  minLoadingTime: 1500
});

if (isLoading) {
  return <SketchTimelineSkeleton />;
}

return <SketchTimeline />;
```

## CSS Animations

The loading system includes custom CSS animations:

- `animate-pulse`: Standard pulse animation
- `animate-shimmer`: Shimmer effect for skeletons
- `animate-spin`: Spinner rotation

These animations are defined in `src/index.css` and can be customized as needed. 