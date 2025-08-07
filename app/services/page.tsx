import { Clock, Calendar } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    {
      category: "Dịch vụ Nail",
      description: "Chăm sóc móng tay chuyên nghiệp với các kỹ thuật hiện đại",
      items: [
        { 
          name: "Nail Gel/Shellac", 
          price: "300.000đ", 
          duration: "60 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Sơn gel bền màu, không bong tróc trong 2-3 tuần"
        },
        { 
          name: "Nail Art Design", 
          price: "450.000đ", 
          duration: "90 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Thiết kế nail nghệ thuật theo yêu cầu, độc đáo và sáng tạo"
        },
        { 
          name: "Pedicure Spa", 
          price: "350.000đ", 
          duration: "75 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Chăm sóc móng chân và da chân toàn diện, thư giãn"
        },
        { 
          name: "Nail Extension", 
          price: "500.000đ", 
          duration: "120 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Nối móng tự nhiên hoặc gel, tạo độ dài và hình dáng hoàn hảo"
        }
      ]
    },
    {
      category: "Dịch vụ Spa",
      description: "Chăm sóc da mặt và cơ thể với công nghệ tiên tiến",
      items: [
        { 
          name: "Chăm sóc da mặt cơ bản", 
          price: "400.000đ", 
          duration: "60 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Làm sạch sâu, tẩy tế bào chết, đắp mặt nạ dưỡng ẩm"
        },
        { 
          name: "Điều trị mụn chuyên sâu", 
          price: "600.000đ", 
          duration: "90 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Điều trị mụn hiệu quả với công nghệ IPL và serum chuyên dụng"
        },
        { 
          name: "Chăm sóc da chống lão hóa", 
          price: "800.000đ", 
          duration: "75 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Massage nâng cơ, đắp mặt nạ collagen, serum chống lão hóa"
        },
        { 
          name: "Tẩy tế bào chết toàn thân", 
          price: "550.000đ", 
          duration: "60 phút", 
          image: "/placeholder.svg?height=200&width=300",
          description: "Loại bỏ tế bào chết, làm mềm mịn da toàn thân"
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="mb-6 px-4 py-2">Dịch vụ của chúng tôi</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Dịch vụ chăm sóc sắc đẹp toàn diện
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Từ nail art nghệ thuật đến chăm sóc da chuyên nghiệp, chúng tôi có đầy đủ dịch vụ 
            để bạn tỏa sáng với vẻ đẹp tự nhiên và rực rỡ nhất.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-20 lg:space-y-24">
          {services.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">{category.category}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {category.items.map((service, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0 h-full">
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden h-48 md:h-full">
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.name}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-pink-500">{service.price}</span>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {service.duration}
                            </div>
                          </div>
                          <Link href="/booking">
                            <Button className="w-full">
                              <Calendar className="h-4 w-4 mr-2" />
                              Đặt lịch ngay
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 lg:mt-24">
          <Card className="bg-muted/30 border-0 shadow-lg">
            <CardContent className="text-center p-12 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold">Không tìm thấy dịch vụ phù hợp?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Liên hệ với chúng tôi để được tư vấn dịch vụ phù hợp nhất cho bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="px-8 py-3">Liên hệ tư vấn</Button>
                </Link>
                <Link href="/booking">
                  <Button size="lg" variant="outline" className="px-8 py-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    Đặt lịch ngay
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
