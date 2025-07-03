
import React from 'react';
import { LazyImage } from './ui/lazy-image';

interface Sketch {
  title: string;
  medium: string;
  reflection: string;
  imageUrl: string;
}

interface SketchEntryProps {
  sketch: Sketch;
  index: number;
  isVisible: boolean;
  isEven: boolean;
}

const SketchEntry = ({ sketch, index, isVisible, isEven }: SketchEntryProps) => {
  return (
    <div 
      className={`sketch-entry flex flex-col md:flex-row items-center gap-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isEven ? 'md:flex-row-reverse' : ''}`}
      data-index={index}
    >
      {/* Image */}
      <div className="flex-1 relative">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200">
          <LazyImage 
            src={sketch.imageUrl} 
            alt={sketch.title}
            className="transition-transform duration-500 hover:scale-105"
            containerClassName="rounded-lg"
            skeletonClassName="bg-stone-200"
            showSkeleton={true}
            showSpinner={false}
            loadingText="Loading sketch..."
          />
        </div>
        
        {/* Timeline dot */}
        <div className={`absolute top-1/2 w-4 h-4 bg-stone-600 rounded-full border-4 border-stone-50 shadow-md hidden md:block ${
          isEven ? '-left-2' : '-right-2'
        }`}></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-medium mb-2 text-stone-800">
          {sketch.title}
        </h3>
        
        <div className="inline-flex items-center gap-2 bg-stone-200 text-stone-600 px-3 py-1 rounded-full text-sm mb-4">
          <div className="w-2 h-2 bg-stone-600 rounded-full"></div>
          {sketch.medium}
        </div>
        
        <p className="text-stone-600 leading-relaxed italic">
          "{sketch.reflection}"
        </p>
      </div>
    </div>
  );
};

export default SketchEntry;
