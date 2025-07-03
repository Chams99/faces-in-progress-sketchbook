import React, { useEffect, useRef, useState } from 'react';
import { LazyImage } from './ui/lazy-image';

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          setHasTriggered(true); // Prevent multiple triggers
          setIsVisible(true);
          setIsLocked(true); // Lock scrolling when section comes into view
          
          // Prevent scrolling
          document.body.style.overflow = 'hidden';
          
          setTimeout(() => setShowSecondLine(true), 2000);
          setTimeout(() => setShowImage(true), 4000);
          setTimeout(() => setShowConfetti(true), 4500);
          setTimeout(() => setShow3DEffect(true), 5000);
          setTimeout(() => setShowParticles(true), 5500);
          setTimeout(() => {
            setShowSoundEffect(true);
            // Play birthday sound
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
          }, 6000);
          
          // Stop jumping after 2 seconds
          setTimeout(() => setStopJumping(true), 7000);
          
          // Unlock scrolling after all animations complete
          setTimeout(() => {
            setIsLocked(false);
            document.body.style.overflow = 'auto';
          }, 8000);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // Clean up body overflow
      document.body.style.overflow = 'auto';
    };
  }, [hasTriggered]);

  // Keyboard escape handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isLocked) {
        setIsLocked(false);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isLocked]);

  // Confetti animation
  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        this.x = Math.random() * canvas.width;
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

    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      confetti.push(new ConfettiPiece());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      confetti.forEach((piece, index) => {
        piece.update();
        piece.draw();
        
        if (piece.y > canvas.height) {
          confetti.splice(index, 1);
        }
      });

      if (confetti.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [showConfetti]);

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 bg-gradient-to-b from-stone-100 via-purple-50 to-pink-100 relative overflow-hidden min-h-screen"
      style={{ 
        position: isLocked ? 'fixed' : 'relative',
        top: isLocked ? '0' : 'auto',
        left: isLocked ? '0' : 'auto',
        right: isLocked ? '0' : 'auto',
        bottom: isLocked ? '0' : 'auto',
        zIndex: isLocked ? 9999 : 1
      }}
    >
      {/* Animated background particles */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
          
          {/* 3D Animated Final Portrait */}
          <div className="relative mb-12">
            <div className={`transition-all duration-2000 ease-out ${
              showImage ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-12'
            }`}>
              <div className={`aspect-[3/4] max-w-2xl mx-auto relative ${
                show3DEffect && !stopJumping ? 'animate-bounce' : ''
              }`}>
                {/* 3D Shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl transform rotate-6 scale-105 opacity-30 blur-lg"></div>
                
                {/* Main image container with 3D effects */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-purple-400 to-pink-400 transform hover:scale-105 transition-all duration-500 hover:rotate-1 animate-glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 opacity-20"></div>
                  
                  {/* The actual birthday image */}
                  <LazyImage 
                    src="/images/Last.jpg" 
                    alt="Birthday Surprise!" 
                    className="relative z-10 animate-rainbow"
                    showSkeleton={false}
                  />
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
                  
                  {/* Sparkle overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
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
                
                                 {/* Floating celebration elements */}
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
                     <div className="absolute top-1/2 -left-8 text-3xl animate-float" style={{ animationDelay: '2.5s' }}>
                       🍰
                     </div>
                     <div className="absolute top-1/2 -right-8 text-3xl animate-float" style={{ animationDelay: '3s' }}>
                       🎊
                     </div>
                   </>
                 )}
              </div>
            </div>
                    </div>
          
          <div className="space-y-3 max-w-lg mx-auto mt-2">
            <p className={`text-xl text-stone-700 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              "This one was made with love and care..."
            </p>
            
            <div className={`transition-all duration-1000 delay-1000 ${
              showSecondLine ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
            }`}>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 bg-clip-text text-transparent animate-shake">
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

      {/* Floating hearts background */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
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

      {/* Hidden audio element for birthday sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/birthday-sound.mp3" type="audio/mpeg" />
      </audio>

      {/* Scroll lock overlay */}
      {isLocked && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-yellow-900 bg-opacity-90 z-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold mb-4 animate-pulse">SURPRISE INCOMING!</h2>
            <p className="text-xl mb-4">Stay tuned for the birthday reveal...</p>
            <div className="flex justify-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <button 
              onClick={() => {
                setIsLocked(false);
                document.body.style.overflow = 'auto';
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
