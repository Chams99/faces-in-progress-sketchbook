import React from 'react';
import { Skeleton } from './ui/skeleton';

const SketchTimelineSkeleton = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton variant="text" lines={1} className="h-8 w-64 mx-auto mb-4" />
          <Skeleton variant="text" lines={2} className="h-4 w-96 mx-auto" />
        </div>

        {/* Timeline Items Skeleton */}
        <div className="space-y-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className={`sketch-entry flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image Skeleton */}
              <div className="flex-1 relative">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200">
                  <Skeleton 
                    variant="image" 
                    className="aspect-[3/4] w-full"
                  />
                </div>
                
                {/* Timeline dot skeleton */}
                <div className={`absolute top-1/2 w-4 h-4 bg-stone-300 rounded-full border-4 border-stone-50 shadow-md hidden md:block ${
                  index % 2 === 1 ? '-left-2' : '-right-2'
                }`}></div>
              </div>
              
              {/* Content Skeleton */}
              <div className="flex-1 text-center md:text-left">
                <Skeleton variant="text" lines={1} className="h-6 w-48 mb-2" />
                
                <div className="inline-flex items-center gap-2 bg-stone-200 px-3 py-1 rounded-full text-sm mb-4">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  <Skeleton className="w-16 h-3" />
                </div>
                
                <Skeleton variant="text" lines={3} className="h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SketchTimelineSkeleton; 