"use client";

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
import { motion } from "framer-motion";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Main Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-gradient-to-br from-amber-100 via-orange-50 to-orange-50">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CardTitle>Thông tin liên hệ</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                icon: MapPin,
                title: "Địa chỉ",
                content: (
                  <>
                    <p className="text-muted-foreground">
                      47 Đường 19, Phường 8
                    </p>
                    <p className="text-muted-foreground">
                      Quận Gò Vấp, TP. Hồ Chí Minh
                    </p>
                  </>
                ),
                delay: 0.3,
              },
              {
                icon: Phone,
                title: "Điện thoại",
                content: (
                  <>
                    <p className="text-muted-foreground">
                      Hotline: +84 123 456 789
                    </p>
                    <p className="text-muted-foreground">
                      Zalo: +84 123 456 789
                    </p>
                  </>
                ),
                delay: 0.4,
              },
              {
                icon: Mail,
                title: "Email",
                content: (
                  <>
                    <p className="text-muted-foreground">info@elysianspa.com</p>
                    <p className="text-muted-foreground">
                      booking@elysianspa.com
                    </p>
                  </>
                ),
                delay: 0.5,
              },
              {
                icon: Clock,
                title: "Giờ hoạt động",
                content: (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Thứ 2 - Thứ 6:
                      </span>
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
                ),
                delay: 0.6,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: item.delay }}
              >
                <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  {item.content}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Media */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-amber-50 via-orange-100 to-orange-50">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CardTitle>Kết nối với chúng tôi</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                {
                  href: "#",
                  icon: Facebook,
                  bg: "bg-blue-600 hover:bg-blue-700",
                },
                {
                  href: "#",
                  icon: Instagram,
                  bg: "bg-pink-600 hover:bg-pink-700",
                },
                { href: "#", icon: Youtube, bg: "bg-red-600 hover:bg-red-700" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className={`flex items-center justify-center w-12 h-12 ${item.bg} text-white rounded-full transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
            <motion.p
              className="text-sm text-muted-foreground mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Theo dõi chúng tôi để cập nhật những ưu đãi và tips làm đẹp mới
              nhất!
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Response */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CardTitle className="flex items-center gap-2">
                Phản hồi nhanh
                <Badge
                  variant="secondary"
                  className="bg-accent text-accent-foreground"
                >
                  24/7
                </Badge>
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-3">
            <motion.div
              className="text-sm space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p>• Email: Phản hồi trong vòng 2-4 giờ</p>
              <p>• Điện thoại: Hỗ trợ trực tiếp 9:00-21:00</p>
              <p>• Zalo/Messenger: Phản hồi tức thì</p>
              <p>• Khẩn cấp: Gọi hotline 24/7</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
