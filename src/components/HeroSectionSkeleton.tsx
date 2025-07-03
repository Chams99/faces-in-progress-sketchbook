import React from 'react';
import { Skeleton } from './ui/skeleton';

const HeroSectionSkeleton = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Title Skeleton */}
        <div className="mb-6">
          <Skeleton variant="text" lines={1} className="h-16 w-96 mx-auto mb-2" />
          <Skeleton variant="text" lines={1} className="h-16 w-80 mx-auto" />
        </div>
        
        {/* Subtitle Skeleton */}
        <Skeleton variant="text" lines={1} className="h-6 w-80 mx-auto mb-8" />
        
        {/* Description Skeleton */}
        <div className="max-w-2xl mx-auto mb-8">
          <Skeleton variant="text" lines={4} className="h-4 mb-4" />
        </div>
        
        {/* Tools Skeleton */}
        <div className="flex justify-center gap-8 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="w-16 h-4" />
            </div>
          ))}
        </div>
        
        {/* Scroll Indicator Skeleton */}
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-1 h-8" />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton; 