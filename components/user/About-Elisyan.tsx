import Image from "next/image";
import { Sparkles, Moon, Star } from "lucide-react";
import { useEffect, useState } from "react";

const aboutImages = [
  "/images/about.webp",
  "/images/about-1.jpg",
  "/images/about-2.jpg",
  "/images/about-3.jpg",
  "/images/about-4.webp",
  "/images/about-5.webp",
  "/images/about-6.jpg",
];

export function AboutElysian() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50" />

      <div className="absolute top-10 left-10 text-amber-600 opacity-60">
        <Moon className="w-8 h-8" />
      </div>
      <div className="absolute top-20 right-20 text-orange-400 opacity-70">
        <Star className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 left-20 text-amber-500 opacity-50">
        <Sparkles className="w-10 h-10" />
      </div>

      <div className="absolute top-1/4 left-0 opacity-30">
        <svg
          width="120"
          height="200"
          viewBox="0 0 120 200"
          className="text-amber-700"
        >
          <path
            d="M20 20C20 20 40 60 60 100C80 140 100 180 100 180C100 180 80 140 60 100C40 60 20 20 20 20Z"
            fill="currentColor"
          />
          <path
            d="M60 100C60 100 80 80 100 60C120 40 140 20 140 20C140 20 120 40 100 60C80 80 60 100 60 100Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-1 bg-amber-600"></div>
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>

            <h2 className="text-4xl font-heading font-black text-amber-900 mb-6">
              1 chút về ELYSIAN Spa
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Lấy cảm hứng từ thiên nhiên và phong cách sống hiện đại{" "}
              <strong className="text-primary">BOHEMIAN</strong>, Elysian Spa
              mang đến một loạt các liệu pháp giúp bạn sống trọn vẹn trong
              khoảnh khắc hiện tại. Chúng tôi sẽ khiến bạn cảm thấy hoàn toàn
              thư giãn và thoải mái trong không gian spa của chúng tôi.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Chúng tôi thiết kế riêng các liệu pháp spa phù hợp với loại da và
              tính cách của bạn. Các liệu pháp chăm sóc tóc bằng thảo dược tự
              nhiên, liệu pháp chăm sóc da với tẩy tế bào chết & massage toàn
              thân, sẽ khiến làn da của bạn cảm thấy như mới.{" "}
              <strong className="text-primary">ELYSIAN Spa</strong> cho phép bạn
              chọn cách tốt nhất để{" "}
              <strong>thư giãn, nghỉ ngơi và nạp lại năng lượng</strong> cho cơ
              thể.
            </p>

            <div className="space-y-3 mb-8">
              <h3 className="font-heading font-bold text-primary text-lg mb-4">
                ELYSIAN Spa cung cấp đa dạng các liệu pháp:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Massage Treatment
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Body Skin care/ Body Scrub
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Hair Spa/ Herbal Hair Wash
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Facial Treatment
                </li>
              </ul>
            </div>
          </div>

          <div className="relative h-[800px] flex items-center justify-center overflow-hidden rounded-3xl">
            <div className="absolute inset-0 z-0 overflow-hidden shadow-2xl">
              {aboutImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-[3500ms] ease-in-out
              ${
                idx === currentImageIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
                >
                  <Image
                    src={img}
                    alt="Elysian Spa Interior"
                    width={500}
                    height={600}
                    className="w-full h-full object-cover bg-no-repeat"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ))}
            </div>

            {/* <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about.webp?height=600&width=500"
                alt="Elysian Spa Interior"
                width={500}
                height={600}
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-amber-500" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 opacity-20">
        <svg
          width="150"
          height="100"
          viewBox="0 0 150 100"
          className="text-amber-600"
        >
          <path
            d="M0 50C0 50 30 30 60 20C90 10 120 0 150 0C150 0 120 10 90 20C60 30 30 50 0 50Z"
            fill="currentColor"
          />
          <path
            d="M0 50C0 50 30 70 60 80C90 90 120 100 150 100C150 100 120 90 90 80C60 70 30 50 0 50Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
