"use client"

import { Calendar, Star, TrendingUp, Users, Clock, Heart, ShoppingBag, Bell, Award, Target } from 'lucide-react'
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function CardsDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Tổng quan về hoạt động spa của bạn
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Welcome Card */}
          <Card className="col-span-full lg:col-span-2 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Chào mừng trở lại!</h2>
                  <p className="text-pink-100 mb-4">
                    Bạn có 8 lịch hẹn hôm nay và 3 khách hàng mới
                  </p>
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    Xem chi tiết
                  </Button>
                </div>
                <div className="hidden sm:block">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Revenue */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Doanh thu hôm nay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    2.4M
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12%
                  </div>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Bookings */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Lịch hẹn hôm nay
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    8
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    6 hoàn thành
                  </div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Satisfaction */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Mức độ hài lòng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    4.9
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Customers */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Khách hàng mới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    24
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Tuần này
                  </div>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="col-span-full lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                Lịch hẹn sắp tới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "14:00", customer: "Nguyễn Thị Lan", service: "Nail Art", avatar: "/placeholder.svg?height=32&width=32" },
                  { time: "15:30", customer: "Trần Minh Anh", service: "Chăm sóc da", avatar: "/placeholder.svg?height=32&width=32" },
                  { time: "16:00", customer: "Lê Thị Hoa", service: "Pedicure", avatar: "/placeholder.svg?height=32&width=32" }
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="text-sm font-mono text-slate-500 w-12">
                      {appointment.time}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.customer} />
                      <AvatarFallback className="text-xs">
                        {appointment.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {appointment.customer}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {appointment.service}
                      </div>
                    </div>
                    <Badge variant="outline">Đã xác nhận</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Goals */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-500" />
                Mục tiêu tháng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Doanh thu</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">37.5M / 50M</div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Khách hàng mới</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">120 / 200</div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Lịch hẹn</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">340 / 400</div>
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Dịch vụ hàng đầu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Nail Art", count: 45, color: "bg-pink-500" },
                  { name: "Chăm sóc da", count: 38, color: "bg-purple-500" },
                  { name: "Pedicure", count: 32, color: "bg-blue-500" }
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${service.color}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{service.name}</div>
                      <div className="text-xs text-slate-500">{service.count} lượt đặt</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Đặt lịch mới
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Thêm khách hàng
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Quản lý sản phẩm
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Xem báo cáo
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-orange-500" />
                Thông báo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "booking", message: "Lịch hẹn mới từ Lan", time: "5 phút" },
                  { type: "review", message: "Đánh giá 5 sao mới", time: "1 giờ" },
                  { type: "payment", message: "Thanh toán hoàn tất", time: "2 giờ" }
                ].map((notification, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{notification.message}</div>
                      <div className="text-xs text-slate-500">{notification.time} trước</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
