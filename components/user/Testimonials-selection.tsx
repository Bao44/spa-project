import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    name: "Nguyễn Thị Lan",
    role: "Khách hàng VIP",
    content:
      "Dịch vụ tuyệt vời! Tôi cảm thấy hoàn toàn thư giãn và tái tạo năng lượng sau mỗi lần đến Elysian Spa. Đội ngũ nhân viên rất chuyên nghiệp và tận tâm.",
    rating: 5,
    image: "/images/default-avatar.jpg?height=80&width=80",
  },
  {
    name: "Trần Văn Minh",
    role: "Doanh nhân",
    content:
      "Không gian yên tĩnh, sang trọng và dịch vụ massage tuyệt hảo. Đây là nơi tôi thường xuyên đến để giảm stress sau những ngày làm việc căng thẳng.",
    rating: 5,
    image: "/images/default-avatar.jpg?height=80&width=80",
  },
  {
    name: "Lê Thị Hương",
    role: "Blogger làm đẹp",
    content:
      "Elysian Spa thực sự xứng đáng với tên gọi 'thiên đường'. Từ không gian đến dịch vụ đều hoàn hảo. Tôi đã giới thiệu cho rất nhiều bạn bè.",
    rating: 5,
    image: "/images/default-avatar.jpg?height=80&width=80",
  },
];

export function TestimonialsSection() {
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
            Khách hàng <span className="text-primary">nói gì</span> về chúng tôi
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng
            tôi
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center">
                    <motion.img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
