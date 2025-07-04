import React, { useEffect, useRef, useState } from 'react';
import { LazyImage } from './ui/lazy-image';
import { useIsMobile } from '../hooks/use-mobile';

const FinalReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [show3DEffect, setShow3DEffect] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showSoundEffect, setShowSoundEffect] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [stopJumping, setStopJumping] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  // Mobile-friendly audio play function
  const playAudio = async () => {
    if (audioRef.current && !audioPlayed) {
      try {
        // For mobile, we need to handle audio differently
        if (isMobile) {
          // Try to play with user interaction
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setAudioPlayed(true);
          }
        } else {
          await audioRef.current.play();
          setAudioPlayed(true);
        }
      } catch (e) {
        console.log('Audio play failed:', e);
        // On mobile, audio might fail due to autoplay restrictions
        // This is normal and expected
        setAudioFailed(true);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true); // Prevent multiple triggers
          setIsVisible(true);
          setIsLocked(true); // Lock scrolling when section comes into view
          
          // Prevent scrolling - but be more careful on mobile
          if (!isMobile) {
            document.body.style.overflow = 'hidden';
          }
          
          setTimeout(() => setShowSecondLine(true), 2000);
          setTimeout(() => setShowImage(true), 4000);
          setTimeout(() => setShowConfetti(true), 4500);
          setTimeout(() => setShow3DEffect(true), 5000);
          setTimeout(() => setShowParticles(true), 5500);
          setTimeout(() => {
            setShowSoundEffect(true);
            // Play birthday sound with mobile considerations
            playAudio();
          }, 6000);
          
          // Stop jumping after 2 seconds
          setTimeout(() => setStopJumping(true), 7000);
          
          // Unlock scrolling after all animations complete
          setTimeout(() => {
            setIsLocked(false);
            if (!isMobile) {
              document.body.style.overflow = 'auto';
            }
          }, 8000);
        }
      },
      { threshold: isMobile ? 0.3 : 0.5 } // Lower threshold for mobile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up body overflow
      if (!isMobile) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [hasTriggered, isMobile]);

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isLocked) {
        setIsLocked(false);
        if (!isMobile) {
          document.body.style.overflow = 'auto';
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLocked, isMobile]);

  // Touch event handler for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (event: TouchEvent) => {
      // Allow touch interaction to trigger audio on mobile
      if (showSoundEffect && !audioPlayed) {
        playAudio();
      }
    };

    const handleClick = (event: MouseEvent) => {
      // Also handle click events for mobile
      if (showSoundEffect && !audioPlayed) {
        playAudio();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('click', handleClick);
    };
  }, [showSoundEffect, audioPlayed, isMobile]);

  // Confetti animation with mobile optimizations
  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use device pixel ratio for better mobile performance
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.scale(dpr, dpr);

    const confetti = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];

    class ConfettiPiece {
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
      speed: number;
      angle: number;
      spin: number;

      constructor() {
        this.x = Math.random() * rect.width;
        this.y = -10;
        this.w = Math.random() * 10 + 5;
        this.h = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 10 - 5;
      }

      update() {
        this.y += this.speed;
        this.angle += this.spin;
        this.x += Math.sin(this.angle * Math.PI / 180) * 0.5;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
      }
    }

    // Reduce confetti count on mobile for better performance
    const confettiCount = isMobile ? 50 : 100;
    for (let i = 0; i < confettiCount; i++) {
      confetti.push(new ConfettiPiece());
    }

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      confetti.forEach((piece, index) => {
        piece.update();
        piece.draw();
        
        if (piece.y > rect.height) {
          confetti.splice(index, 1);
        }
      });

      if (confetti.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [showConfetti, isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 bg-gradient-to-b from-stone-100 via-purple-50 to-pink-100 relative overflow-hidden min-h-screen"
      style={{ 
        position: isLocked && !isMobile ? 'fixed' : 'relative',
        top: isLocked && !isMobile ? '0' : 'auto',
        left: isLocked && !isMobile ? '0' : 'auto',
        right: isLocked && !isMobile ? '0' : 'auto',
        bottom: isLocked && !isMobile ? '0' : 'auto',
        zIndex: isLocked ? 9999 : 1
      }}
    >
      {/* Animated background particles - reduced on mobile */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Confetti canvas */}
      {showConfetti && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50"
          style={{ zIndex: 1000 }}
        />
      )}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="text-4xl font-light mb-8 text-stone-800 animate-shake">
            🎉 SURPRISE! 🎉
          </h2>
          
          {/* 3D Animated Final Portraits */}
          <div className="relative mb-12">
            <div className={`transition-all duration-2000 ease-out ${
              showImage ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-12'
            }`}>
              <div className={`max-w-4xl mx-auto relative ${
                show3DEffect && !stopJumping ? 'animate-bounce' : ''
              }`}>
                {/* 3D Shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl transform rotate-6 scale-105 opacity-30 blur-lg"></div>
                
                {/* Two images side by side - responsive for mobile */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                  {/* First image container */}
                  <div className="relative w-full md:w-96 aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-purple-400 to-pink-400 transform transition-all duration-500 hover:rotate-1 animate-glow hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 opacity-20"></div>
                    
                    {/* The first birthday image */}
                    <LazyImage 
                      src="/images/last.jpg" 
                      alt="Birthday Surprise - Last!" 
                      className="relative z-10 animate-rainbow object-cover w-full h-full"
                      showSkeleton={false}
                    />
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
                    
                    {/* Sparkle overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-2xl animate-sparkle"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        >
                          ✨
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Second image container */}
                  <div className="relative w-full md:w-96 aspect-[3/4] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-purple-400 to-pink-400 transform transition-all duration-500 hover:rotate-1 animate-glow hover:scale-110">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 opacity-20"></div>
                    
                    {/* The second birthday image */}
                    <LazyImage 
                      src="/images/Las.jpg" 
                      alt="Birthday Surprise - Als!" 
                      className="relative z-10 animate-rainbow object-cover w-full h-full"
                      showSkeleton={false}
                    />
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
                    
                    {/* Sparkle overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-2xl animate-sparkle"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        >
                          ✨
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Floating celebration elements - reduced on mobile */}
                {show3DEffect && (
                  <>
                    <div className="absolute -top-4 -right-4 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>
                      🎂
                    </div>
                    <div className="absolute -top-2 -left-4 text-3xl animate-float" style={{ animationDelay: '1s' }}>
                      🎈
                    </div>
                    <div className="absolute -bottom-4 left-1/4 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>
                      🎁
                    </div>
                    <div className="absolute -bottom-2 right-1/4 text-4xl animate-float" style={{ animationDelay: '2s' }}>
                      ⭐
                    </div>
                    {!isMobile && (
                      <>
                        <div className="absolute top-1/2 -left-8 text-3xl animate-float" style={{ animationDelay: '2.5s' }}>
                          🍰
                        </div>
                        <div className="absolute top-1/2 -right-8 text-3xl animate-float" style={{ animationDelay: '3s' }}>
                          🎊
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-3 max-w-lg mx-auto mt-2">
            <p className={`text-xl text-stone-700 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              "A special birthday surprise just for you... It's not much and far from perfect, but I wanted to make something for you."
            </p>
            
            <div className={`transition-all duration-1000 delay-1000 ${
              showSecondLine ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent animate-shake">
                Happy Birthday! 🎉
              </h1>
            </div>
            
            <p className={`text-lg text-stone-600 transition-all duration-1000 delay-2000 ${
              showSecondLine ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              A special surprise just for you! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Floating hearts background - reduced on mobile */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 8 : 15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {['💖', '💝', '💕', '💗', '💓'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Interactive click effect */}
      {showSoundEffect && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-sparkle">
            🎵
          </div>
        </div>
      )}

      {/* Mobile audio trigger button */}
      {showSoundEffect && isMobile && !audioPlayed && !audioFailed && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={playAudio}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse border-2 border-white"
          >
            🎵 Tap to Play Music
          </button>
        </div>
      )}

      {/* Audio failed message */}
      {showSoundEffect && isMobile && audioFailed && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg border-2 border-white">
            🎵 Music available on tap!
          </div>
        </div>
      )}

      {/* Hidden audio element for birthday sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/birthday-sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Scroll lock overlay - mobile-friendly */}
      {isLocked && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-yellow-900 bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-white text-center px-4">
            <div className="text-6xl md:text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-pulse">SURPRISE INCOMING!</h2>
            <p className="text-lg md:text-xl mb-4">Stay tuned for the birthday reveal...</p>
            <div className="flex justify-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <button 
              onClick={() => {
                setIsLocked(false);
                if (!isMobile) {
                  document.body.style.overflow = 'auto';
                }
              }}
              className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg border border-white border-opacity-30 transition-all duration-300"
            >
              Skip to Surprise
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FinalReveal;
