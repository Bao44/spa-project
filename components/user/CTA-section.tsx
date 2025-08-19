import { Button } from "@/components/ui/button"
import { Phone, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-300 to-orange-400 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Sẵn sàng cho trải nghiệm <span className="text-accent">thiên đường</span>?
        </h2>

        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Đặt lịch hẹn ngay hôm nay và để chúng tôi chăm sóc bạn với những dịch vụ spa tuyệt vời nhất
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
            <Link href="/booking">
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch online
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3 text-lg bg-transparent"
          >
            <Link href="tel:+84123456789">
              <Phone className="mr-2 h-5 w-5" />
              Gọi ngay: 0123 456 789
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center text-primary-foreground/80">
          <MapPin className="h-5 w-5 mr-2" />
          <span>123 Đường Spa, Quận 1, TP.HCM - Mở cửa 7 ngày/tuần</span>
        </div>
      </div>
    </section>
  )
}
