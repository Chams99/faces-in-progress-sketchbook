import React from 'react';

const OutroSection = () => {
  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg leading-relaxed text-stone-700 mb-12 italic">
          "Most of this project was about learning — experimenting, failing, figuring things out. 
          But this last one was something more. So if you're seeing this: thank you, and I hope 
          it means something to you too."
        </p>
        
        <footer className="text-sm text-stone-500 border-t border-stone-200 pt-8">
          All drawings created using only pencil, eraser, and black pen.
        </footer>
      </div>
    </section>
  );
};

export default OutroSection;
