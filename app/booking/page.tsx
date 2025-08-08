import { Calendar, Clock, User, Phone, Mail, CheckCircle, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingPage() {
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ]

  const services = [
    { value: "nail-gel", label: "Nail Gel/Shellac - 300.000đ", duration: "60 phút" },
    { value: "nail-art", label: "Nail Art Design - 450.000đ", duration: "90 phút" },
    { value: "pedicure", label: "Pedicure Spa - 350.000đ", duration: "75 phút" },
    { value: "nail-extension", label: "Nail Extension - 500.000đ", duration: "120 phút" },
    { value: "facial-basic", label: "Chăm sóc da mặt cơ bản - 400.000đ", duration: "60 phút" },
    { value: "acne-treatment", label: "Điều trị mụn chuyên sâu - 600.000đ", duration: "90 phút" },
    { value: "anti-aging", label: "Chăm sóc da chống lão hóa - 800.000đ", duration: "75 phút" },
    { value: "body-scrub", label: "Tẩy tế bào chết toàn thân - 550.000đ", duration: "60 phút" }
  ]

  const benefits = [
    "Xác nhận lịch hẹn trong vòng 30 phút",
    "Có thể hủy/đổi lịch trước 2 giờ", 
    "Đến sớm 10 phút để làm thủ tục",
    "Thanh toán sau khi hoàn thành dịch vụ"
  ]

  const offers = [
    { icon: "🎉", title: "Khách hàng mới", desc: "Giảm 20% dịch vụ đầu tiên" },
    { icon: "💎", title: "Combo 3 dịch vụ", desc: "Giảm 15% tổng hóa đơn" },
    { icon: "🎂", title: "Sinh nhật", desc: "Giảm 30% trong tháng sinh nhật" }
  ]

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">Đặt lịch hẹn</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Đặt lịch dễ dàng, nhanh chóng
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Chọn dịch vụ và thời gian phù hợp với bạn. Chúng tôi sẽ xác nhận lịch hẹn trong vòng 30 phút 
            và gửi thông báo qua SMS/Email.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-2xl">
                  <Calendar className="h-6 w-6 mr-3 text-pink-500" />
                  Thông tin đặt lịch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <form className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <User className="h-5 w-5 text-pink-500" />
                      <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Họ và tên *</Label>
                        <Input 
                          id="name" 
                          placeholder="Nhập họ và tên" 
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại *</Label>
                        <Input 
                          id="phone" 
                          placeholder="Nhập số điện thoại" 
                          className="h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Nhập email để nhận thông báo" 
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="h-5 w-5 text-pink-500" />
                      <h3 className="text-lg font-semibold">Chọn dịch vụ</h3>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-sm font-medium">Dịch vụ *</Label>
                      <Select>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Chọn dịch vụ" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Date & Time Selection */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Clock className="h-5 w-5 text-pink-500" />
                      <h3 className="text-lg font-semibold">Chọn ngày và giờ</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-medium">Ngày hẹn *</Label>
                        <Input id="date" type="date" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-sm font-medium">Giờ hẹn *</Label>
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Chọn giờ" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-4">
                    <Label htmlFor="notes" className="text-sm font-medium">Ghi chú</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Ghi chú thêm về yêu cầu của bạn (tùy chọn)..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <Button className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 cursor-pointer">
                    <Calendar className="h-5 w-5 mr-2" />
                    Xác nhận đặt lịch
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-pink-500" />
                  Thông tin liên hệ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Hotline</p>
                    <p className="text-muted-foreground text-sm">0901 234 567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <p className="text-muted-foreground text-sm">booking@bellaspa.vn</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Giờ mở cửa</p>
                    <div className="text-muted-foreground text-sm space-y-1">
                      <p>T2-T6: 9:00 - 21:00</p>
                      <p>T7-CN: 8:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Policy */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-pink-500" />
                  Chính sách đặt lịch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Special Offers */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="text-pink-600 dark:text-pink-400">
                  Ưu đãi đặc biệt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offers.map((offer, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-lg">{offer.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{offer.title}</p>
                        <p className="text-muted-foreground text-sm">{offer.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="h-16 flex-col space-y-1 cursor-pointer">
                <Phone className="h-5 w-5" />
                <span className="text-sm">Gọi ngay</span>
              </Button>
              <Button variant="outline" size="lg" className="h-16 flex-col space-y-1 cursor-pointer">
                <Mail className="h-5 w-5" />
                <span className="text-sm">Chat Zalo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 lg:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tại sao chọn Bella Spa & Nail?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những lý do khách hàng tin tưởng và lựa chọn chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-yellow-400" />,
                title: "Chất lượng 5 sao",
                desc: "Đội ngũ chuyên gia giàu kinh nghiệm"
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-green-500" />,
                title: "Cam kết chất lượng",
                desc: "Sản phẩm chính hãng, dịch vụ uy tín"
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-500" />,
                title: "Tiết kiệm thời gian",
                desc: "Đặt lịch online, không cần chờ đợi"
              },
              {
                icon: <Phone className="h-8 w-8 text-pink-500" />,
                title: "Hỗ trợ 24/7",
                desc: "Tư vấn và hỗ trợ mọi lúc mọi nơi"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center">{item.icon}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
