"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/users/services");
        if (!res.ok) throw new Error("Lỗi khi tải dịch vụ");
        const data = await res.json();
        const flatServices = data.flatMap(
          ([_, services]: [string, any[]]) => services
        );
        setServices(flatServices);
      } catch (error) {
        toast.error("Không thể tải danh sách dịch vụ");
      }
    };
    fetchServices();
  }, []);

  const selectedServiceData = services.find(
    (s) => s.id === parseInt(selectedService)
  );
  const totalPrice = selectedServiceData?.price || 0;

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);

    if (currentStep === 3) {
      if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) {
        toast.error("Vui lòng điền đầy đủ thông tin cá nhân");
        setCurrentStep(3);
        return;
      }
      if (!selectedService || !selectedDate || !selectedTime) {
        toast.error("Vui lòng hoàn tất các bước đặt lịch");
        setCurrentStep(3);
        return;
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const bookingData = {
        fullName: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        serviceId: selectedServiceData?.id,
        date: selectedDate
          ?.toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" })
          .replace(/\//g, "-"), // Đảm bảo định dạng YYYY-MM-DD theo múi giờ Việt Nam
        time: selectedTime,
        note: customerInfo.notes,
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success(
          "Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút."
        );
        setCurrentStep(1);
        setSelectedService("");
        setSelectedDate(undefined);
        setSelectedTime("");
        setCustomerInfo({ name: "", phone: "", email: "", notes: "" });
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Đặt lịch thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Lỗi server. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? "bg-amber-700 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`hidden sm:block w-16 h-1 mx-2 ${
                      step < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="border-border/50 bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                {currentStep === 1 && "Chọn Dịch Vụ"}
                {currentStep === 2 && "Chọn Ngày Giờ"}
                {currentStep === 3 && "Thông Tin Khách Hàng"}
                {currentStep === 4 && "Thanh toán"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 &&
                  "Lựa chọn dịch vụ spa mà bạn muốn trải nghiệm"}
                {currentStep === 2 &&
                  "Chọn ngày và giờ phù hợp với lịch trình của bạn"}
                {currentStep === 3 &&
                  "Điền thông tin để hoàn tất việc đặt lịch"}
                {currentStep === 4 && "Xác nhận thông tin và thanh toán"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedService === service.id.toString()
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/50"
                        }`}
                        onClick={() =>
                          setSelectedService(service.id.toString())
                        }
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{service.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{service.duration} phút</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-primary">
                                {service.price.toLocaleString("vi-VN")}đ
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold flex items-center space-x-2">
                        <CalendarDays className="h-5 w-5" />
                        <span>Chọn ngày</span>
                      </Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 để so sánh chỉ ngày
                          return date < today;
                        }}
                        className="rounded-md border"
                      />
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-base font-semibold flex items-center space-x-2">
                          <Clock className="h-5 w-5" />
                          <span>Chọn giờ</span>
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              disabled={!selectedDate}
                              className="text-sm"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Customer Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>Họ và tên *</span>
                      </Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            name: e.target.value,
                          })
                        }
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center space-x-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Số điện thoại *</span>
                      </Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center space-x-2"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="Nhập địa chỉ email"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label
                        htmlFor="notes"
                        className="flex items-center space-x-2"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Ghi chú</span>
                      </Label>
                      <Textarea
                        id="notes"
                        value={customerInfo.notes}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            notes: e.target.value,
                          })
                        }
                        placeholder="Ghi chú thêm về yêu cầu đặc biệt..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <Card className="bg-muted/20">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Tóm tắt đặt lịch
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Dịch vụ:</span>
                          <span className="font-semibold">
                            {selectedServiceData?.name || "Chưa chọn"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Thời gian:</span>
                          <span>{selectedServiceData?.duration || 0} phút</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ngày:</span>
                          <span>
                            {selectedDate?.toLocaleDateString("vi-VN") ||
                              "Chưa chọn"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Giờ:</span>
                          <span>{selectedTime || "Chưa chọn"}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Tổng cộng:</span>
                          <span className="text-primary">
                            {totalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 4: Payment Confirmation */}
              {currentStep === 4 && (
                <div>
                  <h3 className="text-lg font-bold">
                    Xác nhận thông tin và thanh toán
                  </h3>
                  <p className="mt-2">
                    Vui lòng kiểm tra lại thông tin trước khi thanh toán. Sau
                    khi xác nhận, admin sẽ liên hệ để xác nhận lịch hẹn trong
                    vòng 30 phút.
                  </p>
                  <Card className="mt-4 bg-muted/20">
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Tên:</span>
                          <span>{customerInfo.name || "Chưa nhập"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SĐT:</span>
                          <span>{customerInfo.phone || "Chưa nhập"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span>{customerInfo.email || "Chưa nhập"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dịch vụ:</span>
                          <span>
                            {selectedServiceData?.name || "Chưa chọn"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ngày & Giờ:</span>
                          <span>
                            {selectedDate?.toLocaleDateString("vi-VN") || ""}{" "}
                            {selectedTime || ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ghi chú:</span>
                          <span>{customerInfo.notes || "Không có"}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Tổng cộng:</span>
                          <span className="text-primary">
                            {totalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Quay lại
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={handleNextStep}
                    className="bg-amber-700 hover:bg-amber-800 cursor-pointer"
                    disabled={
                      (currentStep === 1 && !selectedService) ||
                      (currentStep === 2 && (!selectedDate || !selectedTime))
                    }
                  >
                    Tiếp tục
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !customerInfo.name || !customerInfo.phone || isSubmitting
                    }
                    className="bg-amber-700 hover:bg-amber-600 cursor-pointer"
                  >
                    {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
