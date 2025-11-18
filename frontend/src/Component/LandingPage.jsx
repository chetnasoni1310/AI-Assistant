import { useEffect, useRef } from "react";
import gsap from "gsap";
import bg2 from "../assets/bg2.jpg";

export default function LandingPage({ onStart }) {
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [line1.current, line2.current, line3.current, buttonRef.current],
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      className="relative h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft dark overlay for readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative text-center px-6 md:px-0">

        <h1
          ref={line1}
          className="text-5xl md:text-7xl mb-4"
          style={{
            fontFamily: "'IM Fell English SC', serif",
            color: "#ffeb3b",
            WebkitTextStroke: "2px #3b2f19",
            textShadow: "0 0 15px rgba(255,255,200,0.6)",
          }}
        >
          Let’s 
        </h1>

        <h1
          ref={line2}
          className="text-5xl md:text-7xl mb-4"
          style={{
            fontFamily: "'IM Fell English SC', serif",
            color: "#ffeb3b",
            WebkitTextStroke: "2px #3b2f19",
            textShadow: "0 0 15px rgba(255,255,200,0.6)",
          }}
        >
          Begin Grandma’s
        </h1>

        <h1
          ref={line3}
          className="text-5xl md:text-7xl"
          style={{
            fontFamily: "'IM Fell English SC', serif",
            color: "#ffeb3b",
            WebkitTextStroke: "2px #3b2f19",
            textShadow: "0 0 15px rgba(255,255,200,0.6)",
          }}
        >
          Bag of Stories
        </h1>

        <button
          ref={buttonRef}
          onClick={onStart}
          className="mt-8 px-10 py-3 bg-[#6b4e2e] text-[#f1da7a] 
                     font-semibold rounded-xl shadow-lg hover:bg-[#8d6a45] 
                     transition text-lg border"
          style={{
            fontFamily: "'IM Fell English SC', serif",
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
