"use client";

import { Calendar, Clock, CheckCircle, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function BookingHero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-br from-background via-card to-muted/20"
    >
      <div className="container mx-auto px-4 mt-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            Đặt Lịch Hẹn
            <span className="block mt-2">Spa Của Bạn</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Chỉ với vài bước đơn giản, bạn có thể đặt lịch hẹn cho các dịch vụ
            spa yêu thích. Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.
          </motion.p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
            {[
              {
                icon: Calendar,
                title: "1. Chọn Dịch Vụ",
                description: "Lựa chọn dịch vụ và thời gian phù hợp",
              },
              {
                icon: Clock,
                title: "2. Chọn Ngày Giờ",
                description: "Xem lịch trống và đặt thời gian",
              },
              {
                icon: CheckCircle,
                title: "3. Xác Nhận",
                description: "Điền thông tin",
              },
              {
                icon: Banknote,
                title: "4. Thanh toán",
                description: "Thanh toán và hoàn thành đặt lịch",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-3"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <motion.div
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <step.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
