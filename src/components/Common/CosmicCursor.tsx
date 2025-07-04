import React, { useEffect, useState } from 'react';

interface CosmicCursorProps {
  variant?: 'cosmic-blue' | 'stellar-purple' | 'nebula-gradient' | 'aurora-shift' | 'quantum-glow';
}

const CosmicCursor: React.FC<CosmicCursorProps> = ({ variant = 'cosmic-blue' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number; timestamp: number }>>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let trailId = 0;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      
      // Calculate velocity for dynamic effects
      const newVelocity = {
        x: newPosition.x - lastPosition.x,
        y: newPosition.y - lastPosition.y
      };
      setVelocity(newVelocity);
      setLastPosition(newPosition);
      setMousePosition(newPosition);

      // Add to trail with timestamp
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++, timestamp: Date.now() }];
        return newTrail.slice(-15); // Keep more trail points for smoother effect
      });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, .glass-morphism, .ios-button');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Clean up old trail points
    const cleanupTrail = () => {
      const now = Date.now();
      setTrail(prev => prev.filter(point => now - point.timestamp < 1000));
      animationFrame = requestAnimationFrame(cleanupTrail);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    animationFrame = requestAnimationFrame(cleanupTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [lastPosition]);

  const getVariantStyles = () => {
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    const isMovingFast = speed > 5;

    switch (variant) {
      case 'cosmic-blue':
        return {
          core: {
            background: isClicking 
              ? 'radial-gradient(circle, rgba(0, 122, 255, 1) 0%, rgba(88, 86, 214, 0.8) 50%, rgba(0, 122, 255, 0.4) 100%)'
              : isHovering
              ? 'radial-gradient(circle, rgba(0, 122, 255, 0.9) 0%, rgba(88, 86, 214, 0.6) 50%, rgba(0, 122, 255, 0.2) 100%)'
              : 'radial-gradient(circle, rgba(0, 122, 255, 0.8) 0%, rgba(88, 86, 214, 0.4) 50%, rgba(0, 122, 255, 0.1) 100%)',
            boxShadow: isClicking
              ? '0 0 30px rgba(0, 122, 255, 0.8), 0 0 60px rgba(0, 122, 255, 0.4), 0 0 90px rgba(88, 86, 214, 0.2)'
              : isHovering
              ? '0 0 20px rgba(0, 122, 255, 0.6), 0 0 40px rgba(0, 122, 255, 0.3), 0 0 60px rgba(88, 86, 214, 0.1)'
              : '0 0 15px rgba(0, 122, 255, 0.4), 0 0 30px rgba(0, 122, 255, 0.2)',
          },
          trail: (index: number, length: number) => ({
            background: `rgba(0, 122, 255, ${(index + 1) / length * 0.6})`,
            boxShadow: `0 0 ${8 + index * 2}px rgba(0, 122, 255, ${(index + 1) / length * 0.4})`,
          }),
          aura: {
            background: isMovingFast
              ? 'radial-gradient(ellipse 60px 20px, rgba(0, 122, 255, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, transparent 70%)',
          }
        };

      case 'stellar-purple':
        return {
          core: {
            background: isClicking 
              ? 'radial-gradient(circle, rgba(138, 43, 226, 1) 0%, rgba(75, 0, 130, 0.8) 50%, rgba(138, 43, 226, 0.4) 100%)'
              : isHovering
              ? 'radial-gradient(circle, rgba(138, 43, 226, 0.9) 0%, rgba(75, 0, 130, 0.6) 50%, rgba(138, 43, 226, 0.2) 100%)'
              : 'radial-gradient(circle, rgba(138, 43, 226, 0.8) 0%, rgba(75, 0, 130, 0.4) 50%, rgba(138, 43, 226, 0.1) 100%)',
            boxShadow: isClicking
              ? '0 0 30px rgba(138, 43, 226, 0.8), 0 0 60px rgba(138, 43, 226, 0.4), 0 0 90px rgba(75, 0, 130, 0.2)'
              : isHovering
              ? '0 0 20px rgba(138, 43, 226, 0.6), 0 0 40px rgba(138, 43, 226, 0.3), 0 0 60px rgba(75, 0, 130, 0.1)'
              : '0 0 15px rgba(138, 43, 226, 0.4), 0 0 30px rgba(138, 43, 226, 0.2)',
          },
          trail: (index: number, length: number) => ({
            background: `rgba(138, 43, 226, ${(index + 1) / length * 0.6})`,
            boxShadow: `0 0 ${8 + index * 2}px rgba(138, 43, 226, ${(index + 1) / length * 0.4})`,
          }),
          aura: {
            background: isMovingFast
              ? 'radial-gradient(ellipse 60px 20px, rgba(138, 43, 226, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)',
          }
        };

      case 'nebula-gradient':
        return {
          core: {
            background: isClicking 
              ? 'radial-gradient(circle, rgba(255, 149, 0, 1) 0%, rgba(255, 59, 48, 0.8) 30%, rgba(138, 43, 226, 0.6) 60%, rgba(0, 122, 255, 0.4) 100%)'
              : isHovering
              ? 'radial-gradient(circle, rgba(255, 149, 0, 0.9) 0%, rgba(255, 59, 48, 0.6) 30%, rgba(138, 43, 226, 0.4) 60%, rgba(0, 122, 255, 0.2) 100%)'
              : 'radial-gradient(circle, rgba(255, 149, 0, 0.8) 0%, rgba(255, 59, 48, 0.4) 30%, rgba(138, 43, 226, 0.2) 60%, rgba(0, 122, 255, 0.1) 100%)',
            boxShadow: isClicking
              ? '0 0 30px rgba(255, 149, 0, 0.6), 0 0 60px rgba(255, 59, 48, 0.4), 0 0 90px rgba(138, 43, 226, 0.2)'
              : isHovering
              ? '0 0 20px rgba(255, 149, 0, 0.4), 0 0 40px rgba(255, 59, 48, 0.3), 0 0 60px rgba(138, 43, 226, 0.1)'
              : '0 0 15px rgba(255, 149, 0, 0.3), 0 0 30px rgba(255, 59, 48, 0.2)',
          },
          trail: (index: number, length: number) => {
            const colors = ['255, 149, 0', '255, 59, 48', '138, 43, 226', '0, 122, 255'];
            const colorIndex = index % colors.length;
            return {
              background: `rgba(${colors[colorIndex]}, ${(index + 1) / length * 0.6})`,
              boxShadow: `0 0 ${8 + index * 2}px rgba(${colors[colorIndex]}, ${(index + 1) / length * 0.4})`,
            };
          },
          aura: {
            background: isMovingFast
              ? 'radial-gradient(ellipse 60px 20px, rgba(255, 149, 0, 0.1) 0%, rgba(255, 59, 48, 0.05) 30%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 149, 0, 0.08) 0%, rgba(255, 59, 48, 0.04) 30%, transparent 70%)',
          }
        };

      case 'aurora-shift':
        const time = Date.now() * 0.001;
        const hue1 = (time * 30) % 360;
        const hue2 = (time * 30 + 120) % 360;
        const hue3 = (time * 30 + 240) % 360;
        
        return {
          core: {
            background: isClicking 
              ? `radial-gradient(circle, hsl(${hue1}, 80%, 60%) 0%, hsl(${hue2}, 70%, 50%) 50%, hsl(${hue3}, 60%, 40%) 100%)`
              : isHovering
              ? `radial-gradient(circle, hsl(${hue1}, 70%, 50%) 0%, hsl(${hue2}, 60%, 40%) 50%, hsl(${hue3}, 50%, 30%) 100%)`
              : `radial-gradient(circle, hsl(${hue1}, 60%, 40%) 0%, hsl(${hue2}, 50%, 30%) 50%, hsl(${hue3}, 40%, 20%) 100%)`,
            boxShadow: isClicking
              ? `0 0 30px hsl(${hue1}, 80%, 60%), 0 0 60px hsl(${hue2}, 70%, 50%), 0 0 90px hsl(${hue3}, 60%, 40%)`
              : isHovering
              ? `0 0 20px hsl(${hue1}, 70%, 50%), 0 0 40px hsl(${hue2}, 60%, 40%), 0 0 60px hsl(${hue3}, 50%, 30%)`
              : `0 0 15px hsl(${hue1}, 60%, 40%), 0 0 30px hsl(${hue2}, 50%, 30%)`,
          },
          trail: (index: number, length: number) => {
            const trailHue = (hue1 + index * 20) % 360;
            return {
              background: `hsla(${trailHue}, 70%, 50%, ${(index + 1) / length * 0.6})`,
              boxShadow: `0 0 ${8 + index * 2}px hsla(${trailHue}, 70%, 50%, ${(index + 1) / length * 0.4})`,
            };
          },
          aura: {
            background: isMovingFast
              ? `radial-gradient(ellipse 60px 20px, hsla(${hue1}, 60%, 50%, 0.15) 0%, transparent 70%)`
              : `radial-gradient(circle, hsla(${hue1}, 60%, 50%, 0.1) 0%, transparent 70%)`,
          }
        };

      case 'quantum-glow':
        return {
          core: {
            background: isClicking 
              ? 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 255, 255, 0.8) 30%, rgba(0, 122, 255, 0.6) 60%, rgba(138, 43, 226, 0.4) 100%)'
              : isHovering
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(0, 255, 255, 0.6) 30%, rgba(0, 122, 255, 0.4) 60%, rgba(138, 43, 226, 0.2) 100%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(0, 255, 255, 0.4) 30%, rgba(0, 122, 255, 0.2) 60%, rgba(138, 43, 226, 0.1) 100%)',
            boxShadow: isClicking
              ? '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6), 0 0 90px rgba(0, 122, 255, 0.4)'
              : isHovering
              ? '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.4), 0 0 60px rgba(0, 122, 255, 0.2)'
              : '0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)',
          },
          trail: (index: number, length: number) => ({
            background: `rgba(255, 255, 255, ${(index + 1) / length * 0.6})`,
            boxShadow: `0 0 ${8 + index * 2}px rgba(0, 255, 255, ${(index + 1) / length * 0.4})`,
          }),
          aura: {
            background: isMovingFast
              ? 'radial-gradient(ellipse 60px 20px, rgba(255, 255, 255, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          }
        };

      default:
        return {
          core: {
            background: 'radial-gradient(circle, rgba(0, 122, 255, 0.8) 0%, rgba(88, 86, 214, 0.4) 50%, rgba(0, 122, 255, 0.1) 100%)',
            boxShadow: '0 0 15px rgba(0, 122, 255, 0.4), 0 0 30px rgba(0, 122, 255, 0.2)',
          },
          trail: (index: number, length: number) => ({
            background: `rgba(0, 122, 255, ${(index + 1) / length * 0.6})`,
            boxShadow: `0 0 ${8 + index * 2}px rgba(0, 122, 255, ${(index + 1) / length * 0.4})`,
          }),
          aura: {
            background: 'radial-gradient(circle, rgba(0, 122, 255, 0.1) 0%, transparent 70%)',
          }
        };
    }
  };

  const styles = getVariantStyles();
  const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  const isMovingFast = speed > 5;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer Aura */}
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
          width: '80px',
          height: '80px',
          ...styles.aura,
          transform: `scale(${isClicking ? 1.5 : isHovering ? 1.2 : 1}) rotate(${velocity.x * 0.5}deg)`,
          borderRadius: isMovingFast ? '50% 20% 50% 20%' : '50%',
          animation: variant === 'aurora-shift' ? 'aurora-rotate 8s linear infinite' : 'cosmic-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Trail Effect */}
      {trail.map((point, index) => {
        const age = (Date.now() - point.timestamp) / 1000;
        const opacity = Math.max(0, 1 - age);
        const trailStyles = styles.trail(index, trail.length);
        
        return (
          <div
            key={point.id}
            className="absolute rounded-full transition-all duration-200 ease-out"
            style={{
              left: point.x - (2 + index * 0.5),
              top: point.y - (2 + index * 0.5),
              width: `${4 + index}px`,
              height: `${4 + index}px`,
              opacity: opacity * (index + 1) / trail.length,
              ...trailStyles,
              transform: `scale(${0.3 + (index / trail.length) * 0.7}) rotate(${index * 10}deg)`,
              filter: `blur(${Math.max(0, index - 5) * 0.5}px)`,
            }}
          />
        );
      })}

      {/* Main Cursor Core */}
      <div
        className="absolute transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          ...styles.core,
          transform: `scale(${isClicking ? 1.4 : isHovering ? 1.2 : 1}) rotate(${velocity.x * 2}deg)`,
          animation: variant === 'quantum-glow' ? 'quantum-flicker 2s ease-in-out infinite' : 'cosmic-breathe 3s ease-in-out infinite',
          border: isClicking ? '2px solid rgba(255, 255, 255, 0.8)' : isHovering ? '1px solid rgba(255, 255, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.3)',
        }}
      />

      {/* Inner Core */}
      <div
        className="absolute transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 3,
          top: mousePosition.y - 3,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          transform: `scale(${isClicking ? 1.5 : isHovering ? 1.3 : 1})`,
          animation: 'inner-pulse 1.5s ease-in-out infinite',
        }}
      />

      {/* Click Ripple Effect */}
      {isClicking && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 30,
            top: mousePosition.y - 30,
            width: '60px',
            height: '60px',
            border: '2px solid rgba(255, 255, 255, 0.6)',
            animation: 'cosmic-ripple 0.8s ease-out forwards',
          }}
        />
      )}

      {/* Velocity Streaks */}
      {isMovingFast && (
        <>
          <div
            className="absolute"
            style={{
              left: mousePosition.x - velocity.x * 2,
              top: mousePosition.y - velocity.y * 2,
              width: `${Math.abs(velocity.x) * 2}px`,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
              transform: `rotate(${Math.atan2(velocity.y, velocity.x) * 180 / Math.PI}deg)`,
              transformOrigin: 'right center',
              animation: 'velocity-streak 0.3s ease-out forwards',
            }}
          />
          <div
            className="absolute"
            style={{
              left: mousePosition.x - velocity.x * 1.5,
              top: mousePosition.y - velocity.y * 1.5,
              width: `${Math.abs(velocity.y) * 2}px`,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
              transform: `rotate(${Math.atan2(velocity.x, -velocity.y) * 180 / Math.PI}deg)`,
              transformOrigin: 'right center',
              animation: 'velocity-streak 0.3s ease-out forwards',
            }}
          />
        </>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes cosmic-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes cosmic-breathe {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }

        @keyframes inner-pulse {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes cosmic-ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }

        @keyframes aurora-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes quantum-flicker {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.8; }
          50% { opacity: 1; }
          75% { opacity: 0.9; }
        }

        @keyframes velocity-streak {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CosmicCursor;