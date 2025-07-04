import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

interface EasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ isOpen, onClose }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg">
        {/* Parallax Background Layers */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(88, 86, 214, 0.3) 0%, transparent 50%)`,
            transition: 'background 0.3s ease',
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(255, 149, 0, 0.2) 0%, transparent 50%)`,
            transition: 'background 0.3s ease',
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 3 === 0 ? '#5856D6' : i % 3 === 1 ? '#FF9500' : '#007AFF',
              borderRadius: '50%',
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.6,
              filter: 'blur(1px)',
              transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`,
              transition: 'transform 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Modal Content */}
      <div className="relative z-10 max-w-lg mx-auto p-6">
        <div 
          className="glass-morphism-strong rounded-2xl p-6 border-2 border-white/20 hover-lift"
          style={{
            transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.05}deg) rotateY(${(mousePosition.x - 50) * 0.05}deg)`,
            transition: 'transform 0.3s ease',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Animated Icon */}
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="w-full h-full glass-morphism rounded-full flex items-center justify-center cosmic-glow-strong animate-pulse">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-spin" style={{ animationDuration: '3s' }}></div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-3 cosmic-text">
              Easter Egg Discovered!
            </h2>

            {/* Quote */}
            <div className="glass-morphism rounded-xl p-4 mb-4 border border-purple-500/30">
              <blockquote className="text-base text-gray-200 italic leading-relaxed mb-2">
                "You are on this council, but we do not grant you the rank of Master."
              </blockquote>
              <cite className="text-purple-400 font-semibold text-sm">– Mace Windu</cite>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-5 leading-relaxed text-sm">
              Congratulations, young Padawan! You've discovered a hidden secret in the cosmic cantina.
            </p>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="ios-button text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
              style={{ boxShadow: '0 0 25px rgba(88, 86, 214, 0.5)' }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Continue Your Journey</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;