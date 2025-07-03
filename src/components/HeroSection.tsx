
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <div 
        className="text-center max-w-4xl mx-auto transform transition-all duration-1000"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: Math.max(0, 1 - scrollY / 400)
        }}
      >
        <h1 className="text-6xl md:text-8xl font-light mb-6 text-stone-800 tracking-tight animate-fade-in">
          Faces in 
          <span className="block font-normal italic text-stone-600">Progress</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-stone-600 animate-fade-in animation-delay-300">
          13 portraits. 3 tools. 30 days of practice.
        </p>
        
        <div className="max-w-2xl mx-auto animate-fade-in animation-delay-600">
          <p className="text-lg leading-relaxed text-stone-700 mb-8">
            For 30 days, I practiced portrait sketching using only the basics: a pencil, an eraser, and a black pen. 
            No shading, no color — just structure, lines, and repetition. This collection isn't about perfection. 
            It's about progress.
          </p>
          
          <div className="flex justify-center gap-8 text-sm text-stone-500 mb-12">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-stone-400 rounded-full"></div>
              Pencil
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-stone-300 rounded-full"></div>
              Eraser
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-stone-800 rounded-full"></div>
              Black Pen
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown className="w-6 h-6 text-stone-400" />
      </div>
    </section>
  );
};

export default HeroSection;
