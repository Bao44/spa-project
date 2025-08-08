import { Sparkles } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold">Bella Spa & Nail</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nơi làm đẹp uy tín với hơn 5 năm kinh nghiệm trong ngành spa và nail.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="outline" className="h-9 w-9">
                <span className="sr-only">Facebook</span>
                📘
              </Button>
              <Button size="icon" variant="outline" className="h-9 w-9">
                <span className="sr-only">Instagram</span>
                📷
              </Button>
              <Button size="icon" variant="outline" className="h-9 w-9">
                <span className="sr-only">Zalo</span>
                💬
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Dịch vụ</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-pink-500 transition-colors">Nail Art</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-pink-500 transition-colors">Chăm sóc da</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-pink-500 transition-colors">Pedicure</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-pink-500 transition-colors">Điều trị mụn</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Sản phẩm</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-pink-500 transition-colors">Serum</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-pink-500 transition-colors">Kem dưỡng</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-pink-500 transition-colors">Sữa rửa mặt</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-pink-500 transition-colors">Mặt nạ</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Đăng ký nhận tin</h3>
            <p className="text-muted-foreground text-sm">
              Nhận thông báo về ưu đãi và dịch vụ mới
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Email của bạn" className="text-sm" />
              <Button size="sm" className="px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 cursor-pointer">Đăng ký</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2024 Bella Spa & Nail. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
