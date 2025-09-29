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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <motion.div
            className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            {[1, 2, 3, 4].map((step, index) => (
              <motion.div
                key={step}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
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
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-border/50 bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50">
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6 }}
                >
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
                    {currentStep === 4 &&
                      "Xác nhận thông tin và thanh toán (Mã QR nếu có)"}
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -100 : 100,
                          }}
                          animate={
                            inView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
                          }
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          <Card
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
                                  <h3 className="font-semibold">
                                    {service.name}
                                  </h3>
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
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time Selection */}
                {currentStep === 2 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Calendar */}
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: -100 }}
                        animate={
                          inView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -100 }
                        }
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
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
                      </motion.div>

                      {/* Time Selection */}
                      <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 100 }}
                        animate={
                          inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
                        }
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        {/* Time Selection */}
                        <div className="space-y-4">
                          <Label className="text-base font-semibold flex items-center space-x-2">
                            <Clock className="h-5 w-5" />
                            <span>Chọn giờ</span>
                          </Label>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time, index) => (
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
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Customer Information */}
                {currentStep === 3 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          id: "name",
                          label: "Họ và tên *",
                          icon: User,
                          value: customerInfo.name,
                          placeholder: "Nhập họ và tên",
                          onChange: (e: any) =>
                            setCustomerInfo({
                              ...customerInfo,
                              name: e.target.value,
                            }),
                        },
                        {
                          id: "phone",
                          label: "Số điện thoại *",
                          icon: Phone,
                          value: customerInfo.phone,
                          placeholder: "Nhập số điện thoại",
                          onChange: (e: any) =>
                            setCustomerInfo({
                              ...customerInfo,
                              phone: e.target.value,
                            }),
                        },
                        {
                          id: "email",
                          label: "Email",
                          icon: Mail,
                          value: customerInfo.email,
                          placeholder: "Nhập địa chỉ email",
                          onChange: (e: any) =>
                            setCustomerInfo({
                              ...customerInfo,
                              email: e.target.value,
                            }),
                          type: "email",
                        },
                      ].map((field, index) => (
                        <motion.div
                          key={field.id}
                          className="space-y-2"
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -100 : 100,
                          }}
                          animate={
                            inView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
                          }
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          <Label
                            htmlFor={field.id}
                            className="flex items-center space-x-2"
                          >
                            <field.icon className="h-4 w-4" />
                            <span>{field.label}</span>
                          </Label>
                          <Input
                            id={field.id}
                            type={field.type || "text"}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={field.placeholder}
                            required={field.id !== "email"}
                          />
                        </motion.div>
                      ))}

                      <motion.div
                        className="space-y-2 md:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
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
                      </motion.div>
                    </div>

                    {/* Booking Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Card className="bg-muted/20">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Tóm tắt đặt lịch
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            {[
                              {
                                label: "Dịch vụ:",
                                value: selectedServiceData?.name || "Chưa chọn",
                              },
                              {
                                label: "Thời gian:",
                                value:
                                  selectedServiceData?.duration || "0 phút",
                              },
                              {
                                label: "Ngày:",
                                value:
                                  selectedDate?.toLocaleDateString("vi-VN") ||
                                  "Chưa chọn",
                              },
                              {
                                label: "Giờ:",
                                value: selectedTime || "Chưa chọn",
                              },
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex justify-between"
                                initial={{ opacity: 0, x: -20 }}
                                animate={
                                  inView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -20 }
                                }
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.2,
                                }}
                              >
                                <span>{item.label}</span>
                                <span className="font-semibold">
                                  {item.value}
                                </span>
                              </motion.div>
                            ))}
                            <Separator />
                            <motion.div
                              className="flex justify-between text-lg font-bold"
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                inView
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 20 }
                              }
                              transition={{ duration: 0.4, delay: 0.8 }}
                            >
                              <span>Tổng cộng:</span>
                              <span className="text-primary">
                                {totalPrice.toLocaleString("vi-VN")}đ
                              </span>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 4: Payment Confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-bold">
                      Xác nhận thông tin và thanh toán
                    </h3>
                    <p className="mt-2">
                      Vui lòng kiểm tra lại thông tin trước khi thanh toán. Sau
                      khi xác nhận, admin sẽ liên hệ để xác nhận lịch hẹn trong
                      vòng 30 phút.
                    </p>
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <Card className="bg-muted/20">
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            {[
                              {
                                label: "Tên:",
                                value: customerInfo.name || "Chưa nhập",
                              },
                              {
                                label: "SĐT:",
                                value: customerInfo.phone || "Chưa nhập",
                              },
                              {
                                label: "Email:",
                                value: customerInfo.email || "Chưa nhập",
                              },
                              {
                                label: "Dịch vụ:",
                                value: selectedServiceData?.name || "Chưa chọn",
                              },
                              {
                                label: "Ngày & Giờ:",
                                value: `${
                                  selectedDate?.toLocaleDateString("vi-VN") ||
                                  ""
                                } ${selectedTime || ""}`,
                              },
                              {
                                label: "Ghi chú:",
                                value: customerInfo.notes || "Không có",
                              },
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex justify-between"
                                initial={{ opacity: 0, x: -20 }}
                                animate={
                                  inView
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -20 }
                                }
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.2,
                                }}
                              >
                                <span>{item.label}</span>
                                <span>{item.value}</span>
                              </motion.div>
                            ))}
                            <Separator />
                            <motion.div
                              className="flex justify-between text-lg font-bold"
                              initial={{ opacity: 0, y: 20 }}
                              animate={
                                inView
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: 20 }
                              }
                              transition={{ duration: 0.4, delay: 1.2 }}
                            >
                              <span>Tổng cộng:</span>
                              <span className="text-primary">
                                {totalPrice.toLocaleString("vi-VN")}đ
                              </span>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <motion.div
                  className="flex justify-between pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                    >
                      Quay lại
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentStep < 4 ? (
                      <Button
                        onClick={handleNextStep}
                        className="bg-amber-700 hover:bg-amber-800 cursor-pointer"
                        disabled={
                          (currentStep === 1 && !selectedService) ||
                          (currentStep === 2 &&
                            (!selectedDate || !selectedTime))
                        }
                      >
                        Tiếp tục
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={
                          !customerInfo.name ||
                          !customerInfo.phone ||
                          isSubmitting
                        }
                        className="bg-amber-700 hover:bg-amber-600 cursor-pointer"
                      >
                        {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
                      </Button>
                    )}
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
