import React, { useEffect, useState } from 'react';

interface SithCursorProps {
  variant?: 'darth-vader' | 'sith-lightning' | 'dark-crystal' | 'death-star' | 'kylo-ren';
}

const SithCursor: React.FC<SithCursorProps> = ({ variant = 'darth-vader' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [lightningBolts, setLightningBolts] = useState<Array<{ x: number; y: number; id: number; angle: number }>>([]);

  useEffect(() => {
    let trailId = 0;
    let lightningId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Add to trail
      setTrail(prev => {
        const newTrail = [...prev, { ...newPosition, id: trailId++ }];
        return newTrail.slice(-12);
      });

      // Add lightning bolts for sith-lightning variant
      if (variant === 'sith-lightning' && Math.random() > 0.7) {
        setLightningBolts(prev => {
          const newBolt = { 
            ...newPosition, 
            id: lightningId++, 
            angle: Math.random() * 360 
          };
          const newBolts = [...prev, newBolt];
          return newBolts.slice(-6);
        });
      }

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [variant]);

  const renderDarthVaderCursor = () => (
    <div
      className="absolute transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: `scale(${isClicking ? 1.3 : isHovering ? 1.15 : 1}) rotate(${isHovering ? '15deg' : '0deg'})`,
      }}
    >
      {/* Vader's Helmet Silhouette */}
      <div className="relative w-5 h-5">
        {/* Main Helmet */}
        <div 
          className="absolute inset-0 transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(60, 60, 60, 0.9) 100%)',
            clipPath: 'polygon(50% 0%, 80% 30%, 100% 100%, 0% 100%, 20% 30%)',
            border: '1px solid rgba(138, 43, 226, 0.4)',
            boxShadow: isClicking 
              ? '0 0 20px rgba(138, 43, 226, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 0 10px rgba(138, 43, 226, 0.4)',
          }}
        />
        
        {/* Breathing Apparatus */}
        <div 
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 transition-all duration-200"
          style={{
            background: 'linear-gradient(90deg, rgba(138, 43, 226, 0.8) 0%, rgba(75, 0, 130, 0.8) 100%)',
            borderRadius: '2px',
            boxShadow: isClicking || isHovering 
              ? '0 0 6px rgba(138, 43, 226, 0.8)' 
              : 'none',
          }}
        />

        {/* Bluish Violet Lightsaber */}
        {(isHovering || isClicking) && (
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom transition-all duration-300"
            style={{
              width: '2px',
              height: isClicking ? '36px' : '28px',
              background: 'linear-gradient(to top, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.8) 50%, rgba(138, 43, 226, 0.3) 100%)',
              boxShadow: '0 0 8px rgba(138, 43, 226, 0.8), 0 0 16px rgba(138, 43, 226, 0.4)',
              borderRadius: '1px',
              animation: isClicking ? 'sith-ignite 0.3s ease-out' : 'sith-hum 2s ease-in-out infinite',
            }}
          />
        )}

        {/* Dark Force Aura */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            transform: 'scale(4)',
            background: isClicking
              ? 'radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, rgba(60, 60, 60, 0.05) 50%, transparent 70%)',
            animation: 'dark-force-pulse 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );

  const renderSithLightningCursor = () => (
    <div
      className="absolute transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transform: `scale(${isClicking ? 1.2 : 1})`,
      }}
    >
      {/* Lightning Core */}
      <div className="relative w-4 h-4">
        <div 
          className="absolute inset-0 rounded-full transition-all duration-200"
          style={{
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.9) 0%, rgba(75, 0, 130, 0.7) 100%)',
            border: '1px solid rgba(138, 43, 226, 0.6)',
            boxShadow: isClicking 
              ? '0 0 20px rgba(138, 43, 226, 0.8)'
              : '0 0 10px rgba(138, 43, 226, 0.4)',
            animation: 'lightning-pulse 1s ease-in-out infinite',
          }}
        />

        {/* Lightning Bolts */}
        {lightningBolts.map((bolt, index) => (
          <div
            key={bolt.id}
            className="absolute w-8 h-0.5 origin-left transition-opacity duration-300"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${bolt.angle}deg)`,
              background: 'linear-gradient(90deg, rgba(138, 43, 226, 1) 0%, transparent 100%)',
              boxShadow: '0 0 4px rgba(138, 43, 226, 0.8)',
              opacity: (index + 1) / lightningBolts.length,
              animation: 'lightning-flicker 0.5s ease-out forwards',
            }}
          />
        ))}

        {/* Electric Aura */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: 'scale(3)',
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)',
            animation: 'electric-pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );

  const renderDarkCrystalCursor = () => (
    <div
      className="absolute transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: `scale(${isClicking ? 1.2 : isHovering ? 1.1 : 1}) rotate(${isClicking ? '45deg' : '0deg'})`,
      }}
    >
      {/* Dark Crystal */}
      <div className="relative w-5 h-5">
        <div 
          className="absolute inset-0 transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.9) 0%, rgba(138, 43, 226, 0.8) 50%, rgba(88, 86, 214, 0.9) 100%)',
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            border: '1px solid rgba(138, 43, 226, 0.6)',
            boxShadow: isClicking 
              ? '0 0 20px rgba(138, 43, 226, 0.8), 0 0 30px rgba(75, 0, 130, 0.6)'
              : '0 0 10px rgba(138, 43, 226, 0.4)',
            animation: 'crystal-rotate 4s linear infinite',
          }}
        />

        {/* Crystal Glow */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'scale(2.5)',
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, rgba(75, 0, 130, 0.1) 50%, transparent 70%)',
            animation: 'crystal-pulse 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );

  const renderDeathStarCursor = () => (
    <div
      className="absolute transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
        transform: `scale(${isClicking ? 1.3 : isHovering ? 1.15 : 1})`,
      }}
    >
      {/* Death Star */}
      <div className="relative w-5 h-5">
        <div 
          className="absolute inset-0 rounded-full transition-all duration-200"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(100, 100, 100, 0.9) 0%, rgba(60, 60, 60, 0.8) 70%, rgba(40, 40, 40, 0.9) 100%)',
            border: '1px solid rgba(100, 100, 100, 0.4)',
            boxShadow: isClicking 
              ? '0 0 20px rgba(138, 43, 226, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.6)'
              : '0 0 10px rgba(100, 100, 100, 0.4), inset -2px -2px 4px rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* Superlaser */}
        <div 
          className="absolute top-1 left-1 w-1 h-1 rounded-full transition-all duration-200"
          style={{
            background: isClicking || isHovering 
              ? 'rgba(138, 43, 226, 1)' 
              : 'rgba(100, 100, 100, 0.6)',
            boxShadow: isClicking || isHovering 
              ? '0 0 8px rgba(138, 43, 226, 0.8)' 
              : 'none',
          }}
        />

        {/* Destruction Beam */}
        {isClicking && (
          <div
            className="absolute top-1 left-1 w-20 h-0.5 origin-left"
            style={{
              background: 'linear-gradient(90deg, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.5) 50%, transparent 100%)',
              boxShadow: '0 0 6px rgba(138, 43, 226, 0.8)',
              animation: 'destruction-beam 0.3s ease-out',
            }}
          />
        )}

        {/* Imperial Aura */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: 'scale(3)',
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)',
            animation: 'imperial-pulse 4s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );

  const renderKyloRenCursor = () => (
    <div
      className="absolute transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transform: `scale(${isClicking ? 1.2 : isHovering ? 1.1 : 1}) rotate(${isHovering ? '10deg' : '0deg'})`,
      }}
    >
      {/* Kylo's Mask */}
      <div className="relative w-4 h-4">
        <div 
          className="absolute inset-0 transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, rgba(40, 40, 40, 0.95) 0%, rgba(20, 20, 20, 0.9) 100%)',
            clipPath: 'polygon(50% 0%, 85% 25%, 100% 100%, 0% 100%, 15% 25%)',
            border: '1px solid rgba(138, 43, 226, 0.3)',
            boxShadow: isClicking 
              ? '0 0 20px rgba(138, 43, 226, 0.6)'
              : '0 0 8px rgba(138, 43, 226, 0.3)',
          }}
        />

        {/* Crossguard Lightsaber */}
        {(isHovering || isClicking) && (
          <>
            {/* Main Blade */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom transition-all duration-300"
              style={{
                width: '2px',
                height: isClicking ? '32px' : '24px',
                background: 'linear-gradient(to top, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.8) 50%, rgba(138, 43, 226, 0.3) 100%)',
                boxShadow: '0 0 8px rgba(138, 43, 226, 0.8)',
                borderRadius: '1px',
                animation: 'unstable-blade 1.5s ease-in-out infinite',
              }}
            />
            
            {/* Left Crossguard */}
            <div
              className="absolute top-1 left-0 transform -translate-x-full origin-right transition-all duration-300"
              style={{
                width: '8px',
                height: '1px',
                background: 'linear-gradient(to left, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.3) 100%)',
                boxShadow: '0 0 4px rgba(138, 43, 226, 0.6)',
                animation: 'unstable-blade 1.5s ease-in-out infinite',
              }}
            />
            
            {/* Right Crossguard */}
            <div
              className="absolute top-1 right-0 transform translate-x-full origin-left transition-all duration-300"
              style={{
                width: '8px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.3) 100%)',
                boxShadow: '0 0 4px rgba(138, 43, 226, 0.6)',
                animation: 'unstable-blade 1.5s ease-in-out infinite',
              }}
            />
          </>
        )}

        {/* Conflicted Aura */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            transform: 'scale(3.5)',
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, rgba(0, 122, 255, 0.05) 50%, transparent 70%)',
            animation: 'conflicted-pulse 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );

  const renderTrail = () => (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-1 h-1 rounded-full transition-opacity duration-300"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            opacity: (index + 1) / trail.length * 0.7,
            background: getTrailColor(variant, index, trail.length),
            boxShadow: getTrailShadow(variant, index),
            transform: `scale(${0.3 + (index / trail.length) * 0.7})`,
          }}
        />
      ))}
    </>
  );

  const getTrailColor = (variant: string, index: number, length: number) => {
    const opacity = (index + 1) / length * 0.8;
    switch (variant) {
      case 'darth-vader':
        return `rgba(138, 43, 226, ${opacity})`;
      case 'sith-lightning':
        return `rgba(138, 43, 226, ${opacity})`;
      case 'dark-crystal':
        return `rgba(138, 43, 226, ${opacity})`;
      case 'death-star':
        return `rgba(138, 43, 226, ${opacity * 0.6})`;
      case 'kylo-ren':
        return `rgba(138, 43, 226, ${opacity * 0.8})`;
      default:
        return `rgba(138, 43, 226, ${opacity})`;
    }
  };

  const getTrailShadow = (variant: string, index: number) => {
    const intensity = 4 + index;
    switch (variant) {
      case 'darth-vader':
        return `0 0 ${intensity}px rgba(138, 43, 226, 0.6)`;
      case 'sith-lightning':
        return `0 0 ${intensity}px rgba(138, 43, 226, 0.6)`;
      case 'dark-crystal':
        return `0 0 ${intensity}px rgba(138, 43, 226, 0.6)`;
      case 'death-star':
        return `0 0 ${intensity}px rgba(138, 43, 226, 0.4)`;
      case 'kylo-ren':
        return `0 0 ${intensity}px rgba(138, 43, 226, 0.5)`;
      default:
        return `0 0 ${intensity}px rgba(138, 43, 226, 0.6)`;
    }
  };

  const renderCursor = () => {
    switch (variant) {
      case 'darth-vader':
        return renderDarthVaderCursor();
      case 'sith-lightning':
        return renderSithLightningCursor();
      case 'dark-crystal':
        return renderDarkCrystalCursor();
      case 'death-star':
        return renderDeathStarCursor();
      case 'kylo-ren':
        return renderKyloRenCursor();
      default:
        return renderDarthVaderCursor();
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trail Effect */}
      {renderTrail()}

      {/* Main Cursor */}
      {renderCursor()}

      {/* Click Ripple Effect */}
      {isClicking && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            width: '40px',
            height: '40px',
            border: `2px solid rgba(138, 43, 226, 0.6)`,
            animation: 'sith-ripple 0.6s ease-out forwards',
          }}
        />
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes sith-ignite {
          0% { height: 0px; opacity: 0; }
          50% { height: 16px; opacity: 0.8; }
          100% { height: 36px; opacity: 1; }
        }

        @keyframes sith-hum {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.8; filter: brightness(1.3); }
        }

        @keyframes unstable-blade {
          0%, 100% { opacity: 1; filter: brightness(1); }
          25% { opacity: 0.7; filter: brightness(1.4); }
          50% { opacity: 0.9; filter: brightness(0.8); }
          75% { opacity: 0.8; filter: brightness(1.2); }
        }

        @keyframes dark-force-pulse {
          0%, 100% { opacity: 0.3; transform: scale(4); }
          50% { opacity: 0.6; transform: scale(4.5); }
        }

        @keyframes lightning-pulse {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes lightning-flicker {
          0% { opacity: 1; }
          20% { opacity: 0.3; }
          40% { opacity: 0.8; }
          60% { opacity: 0.2; }
          80% { opacity: 0.9; }
          100% { opacity: 0; }
        }

        @keyframes electric-pulse {
          0%, 100% { opacity: 0.4; transform: scale(3); }
          50% { opacity: 0.7; transform: scale(3.5); }
        }

        @keyframes crystal-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes crystal-pulse {
          0%, 100% { opacity: 0.4; transform: scale(2.5); }
          50% { opacity: 0.7; transform: scale(3); }
        }

        @keyframes imperial-pulse {
          0%, 100% { opacity: 0.3; transform: scale(3); }
          50% { opacity: 0.5; transform: scale(3.5); }
        }

        @keyframes destruction-beam {
          0% { width: 0px; opacity: 1; }
          100% { width: 80px; opacity: 0; }
        }

        @keyframes conflicted-pulse {
          0%, 100% { opacity: 0.3; }
          33% { opacity: 0.6; }
          66% { opacity: 0.4; }
        }

        @keyframes sith-ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SithCursor;