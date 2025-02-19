import React, { useEffect, useRef } from "react";
import "../../../styles/screens/welcome.css";

function GradientBackground({children}: {children: React.ReactNode}) {
  const interBubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      if (!interBubbleRef.current) return;
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubbleRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    };

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className="fixed w-screen h-screen inset-0 -z-10 overflow-hidden">

        {/* First morphing shape */}
        <div
          className="absolute animate-morph-slow blur-3xl opacity-30"
          style={{
            backgroundColor: "#C2EB2C",
            width: "50%",
            height: "50%",
            top: "5%",
            left: "25%",
            transform: "translateX(-50%) translateY(-25%)",
          }}
        />

        {/* Second morphing shape */}
        <div
          className="absolute animate-morph-slower blur-3xl opacity-20"
          style={{
            backgroundColor: "#0C2501",
            width: "60%",
            height: "60%",
            bottom: "10%",
            right: "20%",
            transform: "translateX(25%) translateY(15%)",
          }}
        />
      </div>

      <div className="relative w-screen h-screen overflow-hidden dark:bg-[#071C21]">
        <svg className="fixed top-0 left-0 w-0 h-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="20"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
            </filter>
          </defs>
        </svg>

        <div
          className="w-full h-full"
          style={{ filter: "url(#goo) blur(40px)" }}
        >
          {/* Circle 1 - Large vertical mover */}
          <div
            className="absolute w-full h-full top-0 left-0 animate-orbitChaotic4"
            style={{
              background:
                "radial-gradient(circle at center, rgba(194, 235, 44, 0.8) 0, rgba(194, 235, 44, 0) 60%)",
              mixBlendMode: "soft-light",
            }}
          />

{/* Circle 2 */}
<div
            className="absolute w-4/5 h-4/5 top-[10%] left-[10%]"
            style={{
              background:
                "radial-gradient(circle at center, rgba(67, 100, 0, 0.8) 0, rgba(12, 37, 1, 0) 60%)",
              mixBlendMode: "soft-light",
              transformOrigin: "calc(50% - 200px)",
            }}
          />


          {/* Circle 3 - Medium rotating circle - working*/}
          <div
            className="absolute w-4/5 h-4/5 top-[10%] left-[10%] animate-moveInCircleSlow"
            style={{
              background:
                "radial-gradient(circle at center, rgba(67, 100, 0, 0.8) 0, rgba(12, 37, 1, 0) 60%)",
              mixBlendMode: "soft-light",
              transformOrigin: "calc(50% - 200px)",
            }}
          />

          {/* Circle 4 - Figure-8 pattern */}
          <div
            className="absolute w-2/3 h-2/3 animate-orbitChaotic2"
            style={{
              background:
                "radial-gradient(circle at center, rgba(67, 100, 0, 0.8) 0, rgba(12, 37, 1, 0) 60%)",
              mixBlendMode: "soft-light",
              top: "60%",
              left: "30%",
            }}
          />

          {/* Circle 5 - Figure-8 pattern */}
          <div
            className="absolute w-2/3 h-2/3 animate-orbitChaotic4"
            style={{
              background:
                "radial-gradient(circle at center, rgba(67, 100, 0, 0.8) 0, rgba(12, 37, 1, 0) 60%)",
              mixBlendMode: "soft-light",
              top: "30%",
              left: "30%",
            }}
          />


          {/* Circle 6 - Wave pattern */}
          <div
            className="absolute w-3/4 h-3/4 animate-moveVertical"
            style={{
              background:
                "radial-gradient(circle at center, rgba(194, 235, 44, 0.85) 0, rgba(194, 235, 44, 0) 60%)",
              mixBlendMode: "soft-light",
              top: "15%",
              left: "15%",
            }}
          />

          {/* Interactive cursor circle */}
          <div
            ref={interBubbleRef}
            className="absolute w-full h-full -top-1/2 -left-1/2 opacity-90"
            style={{
              background:
                "radial-gradient(circle at center, rgba(194, 235,44, 0.9) 0, rgba(12, 37, 1, 0) 60%)",
              mixBlendMode: "hard-light",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 select-none">
        {children}
      </div>
    </div>
  );
}

export default GradientBackground;
