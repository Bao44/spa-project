import { ContactFAQ } from "@/components/user/contact/Faq";
import { ContactForm } from "@/components/user/contact/Form";
import { ContactHero } from "@/components/user/contact/Hero";
import { ContactInfo } from "@/components/user/contact/Info";
import { ContactMap } from "@/components/user/contact/Map";
import { Footer } from "@/components/user/Footer";
import { Header } from "@/components/user/Header";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <Header />
      <main>
        <ContactHero />
        <div className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <ContactForm />
              <ContactInfo />
            </div>
            <ContactMap />
            <ContactFAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
