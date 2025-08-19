import { Calendar, Clock, CheckCircle, Banknote } from "lucide-react";

export function BookingHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-background via-card to-muted/20">
      <div className="container mx-auto px-4 mt-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Đặt Lịch Hẹn
            <span className="block mt-2">Spa Của Bạn</span>
          </h1> 

          <p className="text-lg text-muted-foreground leading-relaxed">
            Chỉ với vài bước đơn giản, bạn có thể đặt lịch hẹn cho các dịch vụ
            spa yêu thích. Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">1. Chọn Dịch Vụ</h3>
                <p className="text-sm text-muted-foreground">
                  Lựa chọn dịch vụ và thời gian phù hợp
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">2. Chọn Ngày Giờ</h3>
                <p className="text-sm text-muted-foreground">
                  Xem lịch trống và đặt thời gian
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">3. Xác Nhận</h3>
                <p className="text-sm text-muted-foreground">
                  Điền thông tin
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold">4. Thanh toán</h3>
                <p className="text-sm text-muted-foreground">
                  Thanh toán và hoàn thành đặt lịch
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
