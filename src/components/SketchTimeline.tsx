
import React, { useEffect, useRef, useState } from 'react';
import SketchEntry from './SketchEntry';
import SketchTimelineSkeleton from './SketchTimelineSkeleton';
import { sketches } from '../data/sketchData';
import { useLoading } from '../hooks/use-loading';

const SketchTimeline = () => {
  const [visibleSketches, setVisibleSketches] = useState<number[]>([]);
  const { isLoading } = useLoading({
    initialDelay: 1000,
    minLoadingTime: 1500
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSketches(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sketchElements = document.querySelectorAll('.sketch-entry');
    sketchElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <SketchTimelineSkeleton />;
  }

  return (
    <section className="py-20 px-6 relative" ref={timelineRef}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-light text-center mb-16 text-stone-800">
          The Journey
        </h2>
        
        {/* Timeline connector line */}
        <div className="absolute left-1/2 transform -translate-x-px w-px bg-stone-300 h-full hidden md:block"></div>
        
        <div className="space-y-16">
          {sketches.map((sketch, index) => (
            <SketchEntry
              key={index}
              sketch={sketch}
              index={index}
              isVisible={visibleSketches.includes(index)}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SketchTimeline;
