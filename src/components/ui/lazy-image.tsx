import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from './skeleton';
import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
  containerClassName?: string;
  aspectRatio?: string;
  showSkeleton?: boolean;
  showSpinner?: boolean;
  loadingText?: string;
}

const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  ({ 
    src, 
    alt, 
    className, 
    skeletonClassName,
    containerClassName,
    aspectRatio = "aspect-[3/4]",
    showSkeleton = true,
    showSpinner = false,
    loadingText,
    ...props 
  }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '50px 0px', // Start loading 50px before the image comes into view
          threshold: 0.1
        }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const handleLoad = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    return (
      <div 
        ref={containerRef}
        className={cn(
          "relative overflow-hidden",
          aspectRatio,
          containerClassName
        )}
      >
        {/* Loading State */}
        {!isLoaded && !hasError && (
          <>
            {showSkeleton && (
              <Skeleton 
                variant="image"
                className={cn(
                  "absolute inset-0 w-full h-full",
                  skeletonClassName
                )}
              />
            )}
            {showSpinner && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <LoadingSpinner size="md" text={loadingText} />
              </div>
            )}
          </>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
            <div className="text-center">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-sm">Image not available</div>
            </div>
          </div>
        )}

        {/* Actual Image */}
        {isInView && src && (
          <img
            ref={(node) => {
              // Handle both refs
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              imgRef.current = node;
            }}
            src={src}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            {...props}
          />
        )}
      </div>
    );
  }
);

LazyImage.displayName = 'LazyImage';

export { LazyImage }; 