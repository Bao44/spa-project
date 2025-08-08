import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-pink-500" />,
      title: "Địa chỉ",
      content: (
        <div>
          <p className="text-muted-foreground">123 Đường Nguyễn Huệ, Quận 1</p>
          <p className="text-muted-foreground">
            Thành phố Hồ Chí Minh, Việt Nam
          </p>
        </div>
      ),
    },
    {
      icon: <Phone className="h-6 w-6 text-pink-500" />,
      title: "Điện thoại",
      content: (
        <div>
          <p className="text-muted-foreground">
            Hotline:{" "}
            <a
              href="tel:0901234567"
              className="hover:text-pink-500 transition-colors"
            >
              0901 234 567
            </a>
          </p>
          <p className="text-muted-foreground">
            Zalo:{" "}
            <a
              href="https://zalo.me/0901234567"
              className="hover:text-pink-500 transition-colors"
            >
              0901 234 567
            </a>
          </p>
        </div>
      ),
    },
    {
      icon: <Mail className="h-6 w-6 text-pink-500" />,
      title: "Email",
      content: (
        <div>
          <p className="text-muted-foreground">
            Tổng đài:{" "}
            <a
              href="mailto:info@bellaspa.vn"
              className="hover:text-pink-500 transition-colors"
            >
              info@bellaspa.vn
            </a>
          </p>
          <p className="text-muted-foreground">
            Đặt lịch:{" "}
            <a
              href="mailto:booking@bellaspa.vn"
              className="hover:text-pink-500 transition-colors"
            >
              booking@bellaspa.vn
            </a>
          </p>
        </div>
      ),
    },
    {
      icon: <Clock className="h-6 w-6 text-pink-500" />,
      title: "Giờ mở cửa",
      content: (
        <div className="space-y-1">
          <p className="text-muted-foreground">Thứ 2 - Thứ 6: 9:00 - 21:00</p>
          <p className="text-muted-foreground">
            Thứ 7 - Chủ nhật: 8:00 - 22:00
          </p>
          <p className="text-sm text-pink-500 font-medium mt-2">
            * Mở cửa tất cả các ngày trong năm
          </p>
        </div>
      ),
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      name: "Zalo",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  const faqs = [
    {
      question: "Làm thế nào để đặt lịch hẹn?",
      answer:
        "Bạn có thể đặt lịch qua website, gọi hotline 0901 234 567, hoặc nhắn tin Zalo. Chúng tôi sẽ xác nhận lịch hẹn trong vòng 30 phút.",
    },
    {
      question: "Có thể hủy hoặc đổi lịch hẹn không?",
      answer:
        "Có thể hủy hoặc đổi lịch hẹn trước 2 giờ. Vui lòng liên hệ hotline hoặc Zalo để được hỗ trợ nhanh nhất.",
    },
    {
      question: "Các hình thức thanh toán được chấp nhận?",
      answer:
        "Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ ATM/Visa/Mastercard, chuyển khoản ngân hàng, và ví điện tử (MoMo, ZaloPay).",
    },
    {
      question: "Sản phẩm có được bảo hành không?",
      answer:
        "Tất cả sản phẩm mỹ phẩm đều chính hãng và có chế độ bảo hành, đổi trả theo quy định. Nail art được bảo hành 1 tuần.",
    },
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">Liên hệ</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Ghé thăm Bella Spa & Nail
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng chào đón và phục vụ bạn với tất cả sự tận
            tâm. Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                Thông tin liên hệ
              </h2>

              <div className="grid gap-8">
                {contactInfo.map((item, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{item.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-3">
                            {item.title}
                          </h3>
                          {item.content}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Bản đồ vị trí</h3>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <MapPin className="h-16 w-16 text-pink-500 mx-auto" />
                      <div>
                        <p className="text-muted-foreground mb-2">
                          Bản đồ Google Maps
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          123 Đường Nguyễn Huệ, Quận 1, TP.HCM
                        </p>
                        <Button variant="outline" className="px-6">
                          <MapPin className="h-4 w-4 mr-2" />
                          Xem trên Google Maps
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Theo dõi chúng tôi
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    size="lg"
                    className={`${social.color} text-white px-6 py-3`}
                  >
                    {social.icon}
                    <span className="ml-2">{social.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-2xl">
                  <Send className="h-6 w-6 mr-3 text-pink-500" />
                  Gửi tin nhắn cho chúng tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-name"
                        className="text-sm font-medium"
                      >
                        Họ và tên *
                      </Label>
                      <Input
                        id="contact-name"
                        placeholder="Nhập họ và tên"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="contact-phone"
                        className="text-sm font-medium"
                      >
                        Số điện thoại *
                      </Label>
                      <Input
                        id="contact-phone"
                        placeholder="Nhập số điện thoại"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-medium"
                    >
                      Email *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="Nhập email"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-subject"
                      className="text-sm font-medium"
                    >
                      Chủ đề
                    </Label>
                    <Input
                      id="contact-subject"
                      placeholder="Chủ đề tin nhắn"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-message"
                      className="text-sm font-medium"
                    >
                      Nội dung *
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 cursor-pointer">
                    <Send className="h-5 w-5 mr-2" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="h-20 flex-col space-y-2 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950 cursor-pointer"
              >
                <Phone className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Gọi ngay</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950 cursor-pointer"
              >
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Chat Zalo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 lg:mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Câu hỏi thường gặp
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những câu hỏi khách hàng quan tâm nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg leading-relaxed">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
