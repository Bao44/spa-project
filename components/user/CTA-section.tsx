import { Button } from "@/components/ui/button";
import { Phone, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function CTASection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-amber-100 via-orange-50 to-orange-100 text-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Sẵn sàng cho trải nghiệm{" "}
          <span className="text-amber-800">thiên đường</span>?
        </motion.h2>

        <motion.p
          className="text-lg text-amber-900 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Đặt lịch hẹn ngay hôm nay và để chúng tôi chăm sóc bạn với những dịch
          vụ spa tuyệt vời nhất
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="px-8 py-3 text-lg animate-pulse"
            >
              <Link href="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                Đặt lịch online
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3 text-lg bg-white text-black"
            >
              <Link href="tel:+84123456789">
                <Phone className="mr-2 h-5 w-5" />
                Gọi ngay: 0123 456 789
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center text-black"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="h-5 w-5 mr-2" />
          </motion.div>
          <span>123 Đường Spa, Quận 1, TP.HCM - Mở cửa 7 ngày/tuần</span>
        </motion.div>
      </div>
    </section>
  );
}
