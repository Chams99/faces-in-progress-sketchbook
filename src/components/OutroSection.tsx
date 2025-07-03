
import React from 'react';
import { Download } from 'lucide-react';

const OutroSection = () => {
  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg leading-relaxed text-stone-700 mb-12 italic">
          "Most of this project was about learning — experimenting, failing, figuring things out. 
          But this last one was something more. So if you're seeing this: thank you, and I hope 
          it means something to you too."
        </p>
        
        <button className="inline-flex items-center gap-3 bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors duration-300 mb-8">
          <Download className="w-5 h-5" />
          Download the Sketchbook (PDF)
        </button>
        
        <footer className="text-sm text-stone-500 border-t border-stone-200 pt-8">
          All drawings created using only pencil, eraser, and black pen.
        </footer>
      </div>
    </section>
  );
};

export default OutroSection;
