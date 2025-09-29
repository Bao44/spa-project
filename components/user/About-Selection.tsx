import { Leaf, Heart, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: Leaf,
    title: "Thiên nhiên thuần khiết",
    description: "Sử dụng 100% nguyên liệu tự nhiên, không hóa chất độc hại",
  },
  {
    icon: Heart,
    title: "Chăm sóc tận tâm",
    description:
      "Đội ngũ chuyên gia giàu kinh nghiệm, tận tình với từng khách hàng",
  },
  {
    icon: Star,
    title: "Dịch vụ đẳng cấp",
    description: "Tiêu chuẩn quốc tế với công nghệ hiện đại nhất",
  },
  {
    icon: Users,
    title: "Không gian riêng tư",
    description: "Môi trường yên tĩnh, riêng tư cho trải nghiệm tối ưu",
  },
];

export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tại sao chọn <span className="text-primary">Elysian Spa</span>?
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Với hơn 10 năm kinh nghiệm trong ngành spa và wellness, chúng tôi
            cam kết mang đến cho bạn những trải nghiệm thư giãn và chăm sóc sức
            khỏe tuyệt vời nhất.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <feature.icon className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
