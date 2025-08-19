"use client";

import { useState, useEffect } from "react";

const heroImages = [
  "/images/Vip-Room.webp",
  "/images/room.jpg",
  "/images/room-1.webp",
  "/images/room-2.jpg"
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 1) Đổi ảnh sau 15 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-[3500ms] ease-in-out
              ${
                idx === currentImageIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="hero-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight">
          Thiên đường thư giãn
          <br />
          <span className="text-accent">trong tầm tay</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Trải nghiệm dịch vụ spa đẳng cấp quốc tế với không gian sang trọng và
          đội ngũ chuyên gia tận tâm
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 right-8 z-10 flex space-x-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
