"use client"

import { Calendar, Phone, Star } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@/components/UserContext"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const { user } = useUser()
  
  const featuredServices = [
    { name: "Nail Art Design", price: "450.000đ", image: "/images/coban.jpeg?height=200&width=300" },
    { name: "Chăm sóc da mặt", price: "400.000đ", image: "/images/coban.jpeg?height=200&width=300" },
    { name: "Pedicure Spa", price: "350.000đ", image: "/images/coban.jpeg?height=200&width=300" },
  ]

  const featuredProducts = [
    { name: "Serum Vitamin C", price: "850.000đ", image: "/images/coban.jpeg?height=250&width=200" },
    { name: "Kem dưỡng ẩm", price: "650.000đ", image: "/images/coban.jpeg?height=250&width=200" },
    { name: "Mặt nạ collagen", price: "450.000đ", image: "/images/coban.jpeg?height=250&width=200" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 px-4 py-2">
                {user ? `✨ Xin chào ${user.first_name}! Chào mừng trở lại với Bella Spa & Nail` : "✨ Chào mừng đến với Bella Spa & Nail"}
              </Badge>
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {user ? (
                    <>
                      Chào {user.first_name}! 
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {" "}Hãy tỏa sáng cùng chúng tôi
                      </span>
                    </>
                  ) : (
                    <>
                      Làm đẹp tự nhiên, 
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {" "}tỏa sáng rực rỡ
                      </span>
                    </>
                  )}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {user ? (
                    `Cảm ơn bạn đã tin tưởng Bella Spa & Nail! Chúng tôi luôn sẵn sàng mang đến cho bạn những trải nghiệm làm đẹp tuyệt vời nhất.`
                  ) : (
                    "Trải nghiệm dịch vụ spa và nail cao cấp với đội ngũ chuyên gia giàu kinh nghiệm. Chúng tôi cam kết mang đến cho bạn vẻ đẹp hoàn hảo nhất."
                  )}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-3">
                    <Calendar className="h-5 w-5 mr-2" />
                    Đặt lịch ngay
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="px-8 py-3">
                    <Phone className="h-5 w-5 mr-2" />
                    Gọi tư vấn
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <Image
                  src="/images/nail-extension.jpeg?height=600&width=500"
                  alt="Bella Spa & Nail Interior"
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-lg">4.9/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">1000+ khách hàng hài lòng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none">Dịch vụ nổi bật</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Dịch vụ được yêu thích nhất
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Khám phá những dịch vụ được khách hàng lựa chọn nhiều nhất tại Bella Spa & Nail
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-500">{service.price}</span>
                  </div>
                  <Link href="/booking">
                    <Button className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 cursor-pointer">Đặt lịch ngay</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button variant="outline" size="lg" className="px-8 py-3 cursor-pointer">
                Xem tất cả dịch vụ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">Sản phẩm nổi bật</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Mỹ phẩm cao cấp chính hãng
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Những sản phẩm mỹ phẩm được tin dùng và yêu thích nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-500">{product.price}</span>
                    <Button size="sm" className="px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 cursor-pointer">Mua ngay</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" size="lg" className="px-8 py-3 cursor-pointer">
                Xem tất cả sản phẩm
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white">
              Sẵn sàng trải nghiệm dịch vụ tuyệt vời?
            </h2>
            <p className="text-lg text-pink-100 max-w-2xl mx-auto leading-relaxed">
              Đặt lịch hẹn ngay hôm nay và cảm nhận sự khác biệt tại Bella Spa & Nail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" variant="secondary" className="px-8 py-3 cursor-pointer">
                  <Calendar className="h-5 w-5 mr-2" />
                  Đặt lịch ngay
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="border-white cursor-pointer px-8 py-3">
                  <Phone className="h-5 w-5 mr-2" />
                  Liên hệ tư vấn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
