import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="font-heading text-xl font-bold">Elysian Spa</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Trải nghiệm thiên đường thư giãn với các dịch vụ spa cao cấp và chăm sóc sức khỏe toàn diện.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {[
                { href: "/services", label: "Dịch vụ" },
                { href: "/booking", label: "Đặt lịch" },
                { href: "/contact", label: "Liên hệ" },
                { href: "/blog", label: "Blog" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Thông tin liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">123 Đường Spa, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+84 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@elysianspa.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Giờ hoạt động</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="text-muted-foreground">
                  <div>Thứ 2 - Thứ 6: 9:00 - 21:00</div>
                  <div>Thứ 7 - CN: 8:00 - 22:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">© 2024 Elysian Spa. Tất cả quyền được bảo lưu.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
