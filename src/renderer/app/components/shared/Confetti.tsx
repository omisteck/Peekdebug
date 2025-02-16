import React, { useEffect, useState } from 'react';

const Confetti = ({ colors }: { colors: string[] }) => {
    const [particles, setParticles] = useState([]);
  
    useEffect(() => {
      const generateParticles = () => {
        return Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: -20,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
          duration: 1 + Math.random() * 2
        }));
      };
  
      setParticles(generateParticles());
    }, [colors]);
  
    return (
      <>
      <style>{`
        @keyframes falling {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute pointer-events-none w-2 h-2 rounded-full animate-confetti"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animation: `falling ${particle.duration}s linear forwards`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
      </>
    );
  };

export default Confetti;