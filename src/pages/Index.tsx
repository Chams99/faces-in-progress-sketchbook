
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SketchTimeline from '../components/SketchTimeline';
import FinalReveal from '../components/FinalReveal';
import OutroSection from '../components/OutroSection';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-800 relative overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23d6d3d1%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2253%22%20cy%3D%2253%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <HeroSection scrollY={scrollY} />
      <SketchTimeline />
      <FinalReveal />
      <OutroSection />
    </div>
  );
};

export default Index;
