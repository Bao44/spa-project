"use client";

import { HeroSection } from "@/components/user/Hero";
import { AboutElysian } from "@/components/user/About-Elisyan";
import { AboutSection } from "@/components/user/About-Selection";
import { ServicesOverview } from "@/components/user/Services-Overview";
import { TestimonialsSection } from "@/components/user/Testimonials-selection";
import { CTASection } from "@/components/user/CTA-section";
import { Header } from "@/components/user/Header";
import { Footer } from "@/components/user/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <HeroSection />
      <AboutElysian />
      <AboutSection />
      <ServicesOverview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
