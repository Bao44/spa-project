import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Liên hệ</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Ghé thăm Bella Spa & Nail
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng chào đón và phục vụ bạn với tất cả sự tận tâm. 
            Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Địa chỉ</h3>
                    <p className="text-muted-foreground">
                      123 Đường Nguyễn Huệ, Quận 1<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Điện thoại</h3>
                    <p className="text-muted-foreground">
                      Hotline: <a href="tel:0901234567" className="hover:text-pink-500">0901 234 567</a><br />
                      Zalo: <a href="https://zalo.me/0901234567" className="hover:text-pink-500">0901 234 567</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      Tổng đài: <a href="mailto:info@bellaspa.vn" className="hover:text-pink-500">info@bellaspa.vn</a><br />
                      Đặt lịch: <a href="mailto:booking@bellaspa.vn" className="hover:text-pink-500">booking@bellaspa.vn</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Giờ mở cửa</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Thứ 2 - Thứ 6: 9:00 - 21:00</p>
                      <p>Thứ 7 - Chủ nhật: 8:00 - 22:00</p>
                      <p className="text-sm text-pink-500 font-medium">
                        * Mở cửa tất cả các ngày trong năm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Bản đồ vị trí</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Bản đồ Google Maps<br />
                        123 Đường Nguyễn Huệ, Quận 1, TP.HCM
                      </p>
                      <Button variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Xem trên Google Maps
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Theo dõi chúng tôi</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="lg">
                  📘 Facebook
                </Button>
                <Button variant="outline" size="lg">
                  📷 Instagram
                </Button>
                <Button variant="outline" size="lg">
                  💬 Zalo
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-pink-500" />
                  Gửi tin nhắn cho chúng tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Họ và tên *</Label>
                      <Input id="contact-name" placeholder="Nhập họ và tên" />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Số điện thoại *</Label>
                      <Input id="contact-phone" placeholder="Nhập số điện thoại" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input id="contact-email" type="email" placeholder="Nhập email" />
                  </div>

                  <div>
                    <Label htmlFor="contact-subject">Chủ đề</Label>
                    <Input id="contact-subject" placeholder="Chủ đề tin nhắn" />
                  </div>

                  <div>
                    <Label htmlFor="contact-message">Nội dung *</Label>
                    <Textarea 
                      id="contact-message" 
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      rows={6}
                    />
                  </div>

                  <Button className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="h-16">
                <div className="text-center">
                  <Phone className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm">Gọi ngay</div>
                </div>
              </Button>
              <Button variant="outline" size="lg" className="h-16">
                <div className="text-center">
                  <Mail className="h-5 w-5 mx-auto mb-1" />
                  <div className="text-sm">Chat Zalo</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Câu hỏi thường gặp</h2>
            <p className="text-muted-foreground">
              Những câu hỏi khách hàng quan tâm nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Làm thế nào để đặt lịch hẹn?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bạn có thể đặt lịch qua website, gọi hotline 0901 234 567, 
                  hoặc nhắn tin Zalo. Chúng tôi sẽ xác nhận lịch hẹn trong vòng 30 phút.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Có thể hủy hoặc đổi lịch hẹn không?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Có thể hủy hoặc đổi lịch hẹn trước 2 giờ. Vui lòng liên hệ 
                  hotline hoặc Zalo để được hỗ trợ nhanh nhất.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Các hình thức thanh toán được chấp nhận?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ ATM/Visa/Mastercard, 
                  chuyển khoản ngân hàng, và ví điện tử (MoMo, ZaloPay).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sản phẩm có được bảo hành không?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tất cả sản phẩm mỹ phẩm đều chính hãng và có chế độ bảo hành, 
                  đổi trả theo quy định. Nail art được bảo hành 1 tuần.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
