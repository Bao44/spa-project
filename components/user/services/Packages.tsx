import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Users, Calendar } from "lucide-react";
import Link from "next/link";

const servicePackages = [
  {
    category: "Massage Therapy",
    services: [
      {
        name: "Swedish Relaxation Massage",
        description:
          "Massage thư giãn toàn thân với kỹ thuật Thụy Điển cổ điển, giúp giảm căng thẳng và cải thiện tuần hoàn máu",
        duration: "60 phút",
        price: "800.000đ",
        originalPrice: "1.000.000đ",
        benefits: [
          "Giảm stress",
          "Thư giãn cơ bắp",
          "Cải thiện giấc ngủ",
          "Tăng cường tuần hoàn",
        ],
        image: "/images/Swedish-Relaxation-Massage.png?height=200&width=300",
      },
      {
        name: "Deep Tissue Massage",
        description:
          "Massage mô sâu chuyên sâu, tập trung vào các vùng căng cứng và đau nhức mãn tính",
        duration: "75 phút",
        price: "1.200.000đ",
        originalPrice: "1.500.000đ",
        benefits: [
          "Giảm đau mãn tính",
          "Phục hồi cơ bắp",
          "Tăng tính linh hoạt",
          "Giải tỏa căng thẳng",
        ],
        image: "/images/Deep-Tissue-Massage.jpeg?height=200&width=300",
      },
      {
        name: "Hot Stone Massage",
        description:
          "Massage với đá nóng tự nhiên, kết hợp nhiệt độ và áp lực để thư giãn sâu",
        duration: "90 phút",
        price: "1.500.000đ",
        originalPrice: "1.800.000đ",
        benefits: [
          "Thư giãn sâu",
          "Cải thiện tuần hoàn",
          "Giảm căng cơ",
          "Cân bằng năng lượng",
        ],
        image: "/images/Hot-Stone-Massage.jpg?height=200&width=300",
      },
    ],
  },
  {
    category: "Chăm sóc da mặt",
    services: [
      {
        name: "HydraFacial Premium",
        description:
          "Liệu trình chăm sóc da 7 bước với công nghệ HydraFacial, làm sạch sâu và cung cấp dưỡng chất",
        duration: "75 phút",
        price: "1.800.000đ",
        originalPrice: "2.200.000đ",
        benefits: [
          "Làm sạch sâu",
          "Cấp ẩm tức thì",
          "Giảm nếp nhăn",
          "Da sáng mịn",
        ],
        image: "/images/Hydrafacial-Premium.jpg?height=200&width=300",
      },
      {
        name: "Anti-Aging Facial",
        description:
          "Liệu trình chống lão hóa với peptide và collagen, giúp làm căng da và giảm nếp nhăn",
        duration: "90 phút",
        price: "2.200.000đ",
        originalPrice: "2.800.000đ",
        benefits: [
          "Giảm nếp nhăn",
          "Tăng độ đàn hồi",
          "Làm căng da",
          "Tái tạo collagen",
        ],
        image: "/images/Anti-Aging-Facial.jpg?height=200&width=300",
      },
      {
        name: "Acne Treatment Facial",
        description:
          "Liệu trình điều trị mụn chuyên sâu với công nghệ LED và serum điều trị",
        duration: "60 phút",
        price: "1.200.000đ",
        originalPrice: "1.500.000đ",
        benefits: [
          "Giảm mụn",
          "Kiểm soát dầu",
          "Thu nhỏ lỗ chân lông",
          "Làm dịu da",
        ],
        image: "/images/Acne-Treatment-Facial.webp?height=200&width=300",
      },
    ],
  },
  {
    category: "Body Treatment",
    services: [
      {
        name: "Luxury Body Scrub & Wrap",
        description:
          "Tẩy tế bào chết toàn thân với muối biển và đắp ủ body mask dưỡng ẩm",
        duration: "90 phút",
        price: "1.400.000đ",
        originalPrice: "1.700.000đ",
        benefits: [
          "Da mềm mại",
          "Loại bỏ tế bào chết",
          "Dưỡng ẩm sâu",
          "Thư giãn toàn thân",
        ],
        image: "/images/Luxury-Body.jpg?height=200&width=300",
      },
      {
        name: "Slimming Body Treatment",
        description:
          "Liệu trình giảm béo và săn chắc cơ thể với công nghệ RF và massage chuyên sâu",
        duration: "120 phút",
        price: "2.500.000đ",
        originalPrice: "3.000.000đ",
        benefits: [
          "Giảm mỡ thừa",
          "Săn chắc da",
          "Cải thiện cellulite",
          "Tăng tính đàn hồi",
        ],
        image: "/images/Slimming-Body.jpg?height=200&width=300",
      },
    ],
  },
];

export function ServicePackages() {
  return (
    <section className="py-10 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {servicePackages.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
              {category.category}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {category.services.map((service, serviceIndex) => (
                <Card
                  key={serviceIndex}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="font-heading text-xl">
                      {service.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {service.duration}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {service.price}
                        </div>
                        {service.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {service.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">
                        Lợi ích:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <Badge
                            key={benefitIndex}
                            variant="secondary"
                            className="text-xs bg-amber-700"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-amber-700">
                        <Link href="/booking">
                          <Calendar className="h-4 w-4 mr-2" />
                          Đặt lịch
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
