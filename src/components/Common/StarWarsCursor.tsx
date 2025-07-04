import React, { useEffect, useState } from 'react';

const StarWarsCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++ }];
        return newTrail.slice(-8); // Keep only last 8 trail points
      });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail Effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-1 h-1 rounded-full transition-opacity duration-300"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            opacity: (index + 1) / trail.length * 0.6,
            background: isHovering 
              ? `rgba(52, 199, 89, ${(index + 1) / trail.length * 0.8})` 
              : `rgba(0, 122, 255, ${(index + 1) / trail.length * 0.8})`,
            boxShadow: isHovering
              ? `0 0 ${4 + index}px rgba(52, 199, 89, 0.6)`
              : `0 0 ${4 + index}px rgba(0, 122, 255, 0.6)`,
            transform: `scale(${0.3 + (index / trail.length) * 0.7})`,
          }}
        />
      ))}

      {/* Main Cursor - Lightsaber Hilt */}
      <div
        className="absolute transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isClicking ? 1.2 : isHovering ? 1.1 : 1}) rotate(${isHovering ? '15deg' : '0deg'})`,
        }}
      >
        {/* Lightsaber Hilt */}
        <div className="relative w-4 h-4">
          {/* Hilt Base */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(142, 142, 147, 0.9) 0%, rgba(99, 99, 102, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: isClicking 
                ? '0 0 20px rgba(0, 122, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                : '0 0 10px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          />
          
          {/* Power Button */}
          <div 
            className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-200"
            style={{
              background: isClicking || isHovering 
                ? 'rgba(0, 122, 255, 1)' 
                : 'rgba(142, 142, 147, 0.6)',
              boxShadow: isClicking || isHovering 
                ? '0 0 6px rgba(0, 122, 255, 0.8)' 
                : 'none',
            }}
          />

          {/* Lightsaber Blade (appears on hover/click) */}
          {(isHovering || isClicking) && (
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom transition-all duration-300"
              style={{
                width: '2px',
                height: isClicking ? '32px' : '24px',
                background: isHovering 
                  ? 'linear-gradient(to top, rgba(52, 199, 89, 1) 0%, rgba(52, 199, 89, 0.8) 50%, rgba(52, 199, 89, 0.4) 100%)'
                  : 'linear-gradient(to top, rgba(0, 122, 255, 1) 0%, rgba(0, 122, 255, 0.8) 50%, rgba(0, 122, 255, 0.4) 100%)',
                boxShadow: isHovering
                  ? '0 0 8px rgba(52, 199, 89, 0.8), 0 0 16px rgba(52, 199, 89, 0.4)'
                  : '0 0 8px rgba(0, 122, 255, 0.8), 0 0 16px rgba(0, 122, 255, 0.4)',
                borderRadius: '1px',
                animation: isClicking ? 'lightsaber-ignite 0.3s ease-out' : 'lightsaber-hum 2s ease-in-out infinite',
              }}
            />
          )}

          {/* Force Aura (subtle glow around cursor) */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-500"
            style={{
              transform: 'scale(3)',
              background: isClicking
                ? 'radial-gradient(circle, rgba(0, 122, 255, 0.15) 0%, transparent 70%)'
                : isHovering
                ? 'radial-gradient(circle, rgba(52, 199, 89, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(88, 86, 214, 0.05) 0%, transparent 70%)',
              animation: 'force-pulse 3s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Click Ripple Effect */}
      {isClicking && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: '40px',
            height: '40px',
            border: '2px solid rgba(0, 122, 255, 0.6)',
            animation: 'click-ripple 0.6s ease-out forwards',
          }}
        />
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes lightsaber-ignite {
          0% {
            height: 0px;
            opacity: 0;
          }
          50% {
            height: 16px;
            opacity: 0.8;
          }
          100% {
            height: 32px;
            opacity: 1;
          }
        }

        @keyframes lightsaber-hum {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.8;
            filter: brightness(1.2);
          }
        }

        @keyframes force-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(3);
          }
          50% {
            opacity: 0.6;
            transform: scale(3.5);
          }
        }

        @keyframes click-ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StarWarsCursor;