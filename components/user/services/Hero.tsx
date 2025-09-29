import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ServicesHero() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ kích hoạt animation một lần
    threshold: 0.2, // Kích hoạt khi 20% section xuất hiện trong viewport
  });

  return (
    <section
      ref={ref}
      className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Dịch vụ <span className="text-primary">Spa</span> cao cấp
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Khám phá bộ sưu tập đầy đủ các liệu trình spa và wellness được thiết
          kế để mang lại sự thư giãn tối ưu và chăm sóc sức khỏe toàn diện
        </motion.p>
      </div>
    </section>
  );
}
