import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export function BlogNewsletter() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Đăng ký nhận tin
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">
          Nhận những bài viết mới nhất về làm đẹp và chăm sóc sức khỏe qua email
        </p>
        <div className="space-y-3">
          <Input placeholder="Nhập email của bạn" type="email" />
          <Button className="w-full bg-amber-700 hover:bg-amber-800 cursor-pointer">Đăng ký ngay</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Chúng tôi cam kết không spam và bảo mật thông tin của bạn</p>
      </CardContent>
    </Card>
  )
}
