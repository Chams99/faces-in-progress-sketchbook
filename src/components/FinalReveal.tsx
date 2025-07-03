
import React, { useEffect, useRef, useState } from 'react';

const FinalReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowSecondLine(true), 2000);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 bg-gradient-to-b from-stone-100 to-stone-200 relative"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="text-3xl font-light mb-8 text-stone-800">
            Sketch 14 – Held Back
          </h2>
          
          {/* Final portrait placeholder */}
          <div className="aspect-[3/4] max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden border border-stone-300 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
              <div className="text-stone-400 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-stone-300 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm">Final Portrait</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 max-w-lg mx-auto">
            <p className={`text-lg text-stone-700 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              "This one was made a little differently."
            </p>
            
            <p className={`text-lg text-stone-800 font-medium transition-all duration-1000 delay-1000 ${
              showSecondLine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Happy Birthday.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalReveal;
