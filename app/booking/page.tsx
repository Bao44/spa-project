import { BookingHero } from "@/components/user/booking/Hero";
import { BookingForm } from "@/components/user/booking/Form";
import { Header } from "@/components/user/Header";
import { Footer } from "@/components/user/Footer";

export default function BookingPage() {
  return (
    <>
      <Header />
      <main>
        <BookingHero />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
