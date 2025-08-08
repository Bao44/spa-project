"use client"

import { useState } from "react"
import { Calendar, Clock, User, Heart, ShoppingBag, Bell, Settings, LogOut, Star, Gift, CreditCard, MapPin, Phone, Mail } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [user] = useState({
    name: "Nguyễn Thị Lan",
    email: "lan.nguyen@email.com",
    phone: "0901 234 567",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "Tháng 3, 2024",
    loyaltyPoints: 850,
    nextReward: 1000
  })

  const upcomingBookings = [
    {
      id: 1,
      service: "Nail Art Design",
      date: "2024-12-20",
      time: "14:00",
      duration: "90 phút",
      price: "450.000đ",
      status: "confirmed",
      therapist: "Chị Mai"
    },
    {
      id: 2,
      service: "Chăm sóc da mặt",
      date: "2024-12-25",
      time: "10:00",
      duration: "60 phút", 
      price: "400.000đ",
      status: "pending",
      therapist: "Chị Hoa"
    }
  ]

  const bookingHistory = [
    {
      id: 1,
      service: "Pedicure Spa",
      date: "2024-12-10",
      time: "15:30",
      price: "350.000đ",
      status: "completed",
      rating: 5,
      therapist: "Chị Lan"
    },
    {
      id: 2,
      service: "Nail Gel/Shellac",
      date: "2024-12-05",
      time: "11:00",
      price: "300.000đ",
      status: "completed",
      rating: 5,
      therapist: "Chị Mai"
    },
    {
      id: 3,
      service: "Điều trị mụn chuyên sâu",
      date: "2024-11-28",
      time: "16:00",
      price: "600.000đ",
      status: "completed",
      rating: 4,
      therapist: "Chị Hoa"
    }
  ]

  const favoriteProducts = [
    {
      id: 1,
      name: "Serum Vitamin C",
      brand: "SkinCare Pro",
      price: "850.000đ",
      image: "/placeholder.svg?height=150&width=150",
      inStock: true
    },
    {
      id: 2,
      name: "Kem dưỡng ẩm",
      brand: "Hydra Plus", 
      price: "650.000đ",
      image: "/placeholder.svg?height=150&width=150",
      inStock: true
    },
    {
      id: 3,
      name: "Mặt nạ collagen",
      brand: "Youth Glow",
      price: "450.000đ",
      image: "/placeholder.svg?height=150&width=150",
      inStock: false
    }
  ]

  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "Lịch hẹn sắp tới",
      message: "Bạn có lịch hẹn Nail Art Design vào 14:00 ngày 20/12",
      time: "2 giờ trước",
      read: false
    },
    {
      id: 2,
      type: "promotion",
      title: "Ưu đãi đặc biệt",
      message: "Giảm 20% cho dịch vụ chăm sóc da trong tuần này",
      time: "1 ngày trước",
      read: false
    },
    {
      id: 3,
      type: "reward",
      title: "Điểm thưởng",
      message: "Bạn đã tích được 50 điểm từ lần dịch vụ gần nhất",
      time: "3 ngày trước",
      read: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
      case 'completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận'
      case 'pending': return 'Chờ xác nhận'
      case 'completed': return 'Hoàn thành'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Chào mừng trở lại, {user.name}!</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lịch hẹn sắp tới</p>
                  <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-pink-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Điểm thưởng</p>
                  <p className="text-2xl font-bold">{user.loyaltyPoints}</p>
                </div>
                <Gift className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sản phẩm yêu thích</p>
                  <p className="text-2xl font-bold">{favoriteProducts.length}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lịch sử dịch vụ</p>
                  <p className="text-2xl font-bold">{bookingHistory.length}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">Lịch hẹn</TabsTrigger>
                <TabsTrigger value="history">Lịch sử</TabsTrigger>
                <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
              </TabsList>

              {/* Upcoming Bookings */}
              <TabsContent value="bookings" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                      Lịch hẹn sắp tới
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingBookings.length > 0 ? (
                      upcomingBookings.map((booking) => (
                        <Card key={booking.id} className="border border-muted">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                              <div className="space-y-2">
                                <h3 className="font-semibold text-lg">{booking.service}</h3>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(booking.date).toLocaleDateString('vi-VN')}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {booking.time} ({booking.duration})
                                  </div>
                                  <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    {booking.therapist}
                                  </div>
                                </div>
                                <p className="text-lg font-bold text-pink-500">{booking.price}</p>
                              </div>
                              <div className="flex flex-col items-end space-y-2">
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusText(booking.status)}
                                </Badge>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">Đổi lịch</Button>
                                  <Button size="sm" variant="outline">Hủy</Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Bạn chưa có lịch hẹn nào</p>
                        <Link href="/booking">
                          <Button className="mt-4">Đặt lịch ngay</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Booking History */}
              <TabsContent value="history" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-pink-500" />
                      Lịch sử dịch vụ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <Card key={booking.id} className="border border-muted">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{booking.service}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(booking.date).toLocaleDateString('vi-VN')}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {booking.time}
                                </div>
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {booking.therapist}
                                </div>
                              </div>
                              <p className="text-lg font-bold text-pink-500">{booking.price}</p>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < booking.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Button size="sm" variant="outline">Đặt lại</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorite Products */}
              <TabsContent value="favorites" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-pink-500" />
                      Sản phẩm yêu thích
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {favoriteProducts.map((product) => (
                        <Card key={product.id} className="border border-muted">
                          <CardContent className="p-4">
                            <div className="flex space-x-4">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1 space-y-2">
                                <h3 className="font-semibold">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.brand}</p>
                                <p className="text-lg font-bold text-pink-500">{product.price}</p>
                                <div className="flex space-x-2">
                                  <Button size="sm" disabled={!product.inStock}>
                                    <ShoppingBag className="h-4 w-4 mr-1" />
                                    {product.inStock ? "Mua ngay" : "Hết hàng"}
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Heart className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">Thành viên từ {user.memberSince}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {user.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {user.phone}
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Chỉnh sửa thông tin
                </Button>
              </CardContent>
            </Card>

            {/* Loyalty Points */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-purple-500" />
                  Điểm thưởng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-500">{user.loyaltyPoints}</p>
                  <p className="text-sm text-muted-foreground">điểm hiện có</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tiến độ đến phần thưởng tiếp theo</span>
                    <span>{user.nextReward - user.loyaltyPoints} điểm nữa</span>
                  </div>
                  <Progress value={(user.loyaltyPoints / user.nextReward) * 100} className="h-2" />
                </div>
                <Button variant="outline" className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Đổi điểm thưởng
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-pink-500" />
                  Thông báo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border ${!notification.read ? 'bg-pink-50 border-pink-200 dark:bg-pink-950 dark:border-pink-800' : 'bg-muted/50'}`}>
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  Xem tất cả thông báo
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/booking">
                  <Button className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Đặt lịch mới
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Mua sản phẩm
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Liên hệ hỗ trợ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
