import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Main Contact Info */}
      <Card className="bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50">
        <CardHeader>
          <CardTitle>Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Địa chỉ</h3>
              <p className="text-muted-foreground">
                47 Đường 19, Phường 8
              </p>
              <p className="text-muted-foreground">Quận Gò Vấp, TP. Hồ Chí Minh</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Điện thoại</h3>
              <p className="text-muted-foreground">Hotline: +84 123 456 789</p>
              <p className="text-muted-foreground">Zalo: +84 123 456 789</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-muted-foreground">info@elysianspa.com</p>
              <p className="text-muted-foreground">booking@elysianspa.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Giờ hoạt động
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thứ 2 - Thứ 6:</span>
                  <span className="font-medium">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thứ 7:</span>
                  <span className="font-medium">8:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chủ nhật:</span>
                  <span className="font-medium">8:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card className="bg-gradient-to-br from-amber-50 via-orange-100 to-orange-50">
        <CardHeader>
          <CardTitle>Kết nối với chúng tôi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Theo dõi chúng tôi để cập nhật những ưu đãi và tips làm đẹp mới
            nhất!
          </p>
        </CardContent>
      </Card>

      {/* Quick Response */}
      <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Phản hồi nhanh
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground"
            >
              24/7
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p>• Email: Phản hồi trong vòng 2-4 giờ</p>
            <p>• Điện thoại: Hỗ trợ trực tiếp 9:00-21:00</p>
            <p>• Zalo/Messenger: Phản hồi tức thì</p>
            <p>• Khẩn cấp: Gọi hotline 24/7</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
