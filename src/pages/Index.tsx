
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
      <div className="fixed inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d6d3d1" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="53" cy="53" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <HeroSection scrollY={scrollY} />
      <SketchTimeline />
      <FinalReveal />
      <OutroSection />
    </div>
  );
};

export default Index;
