import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    title: "Massage Thư Giãn Toàn Thân",
    description:
      "Massage thư giãn toàn thân với tinh dầu thiên nhiên, giúp giảm stress và căng thẳng",
    image: "/images/Massage-Therapy.jpg?height=300&width=400",
    price: "Từ 80.000đ",
    duration: "60-90 phút",
  },
  {
    title: "Chăm sóc da mặt",
    description:
      "Liệu trình chăm sóc da chuyên sâu với công nghệ hiện đại và sản phẩm cao cấp",
    image: "/images/Cham-Soc-Da-Mat.jpg?height=300&width=400",
    price: "Từ 120.000đ",
    duration: "75-120 phút",
  },
  {
    title: "Body Treatment",
    description:
      "Tẩy tế bào chết và dưỡng ẩm toàn thân, mang lại làn da mềm mại và tươi sáng",
    image: "/images/Body-Treatment.jpg?height=300&width=400",
    price: "Từ 300.000đ",
    duration: "90 phút",
  },
];

export function ServicesOverview() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-20 bg-background">
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
            Dịch vụ <span className="text-primary">nổi bật</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Khám phá các gói dịch vụ được yêu thích nhất tại Elysian Spa
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={
                inView
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
              }
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50">
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary font-semibold text-lg">
                      {service.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {service.duration}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      variant="outline"
                      className="w-full hover:bg-amber-700 hover:text-white transition-colors bg-transparent"
                    >
                      <Link href="/services">
                        Xem chi tiết
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="px-8 bg-amber-700 animate-pulse"
            >
              <Link href="/services">
                Xem tất cả dịch vụ
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
