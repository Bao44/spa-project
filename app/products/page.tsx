import { Star, Heart, ShoppingBag, Filter } from 'lucide-react'
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsPage() {
  const categories = [
    "Tất cả sản phẩm",
    "Chăm sóc da mặt", 
    "Chăm sóc cơ thể",
    "Trang điểm",
    "Chăm sóc móng"
  ]

  const products = [
    { 
      name: "Serum Vitamin C", 
      brand: "SkinCare Pro", 
      price: "850.000đ", 
      originalPrice: "1.200.000đ",
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.8,
      reviews: 124,
      category: "Chăm sóc da mặt",
      description: "Serum vitamin C giúp làm sáng da, mờ thâm nám hiệu quả"
    },
    { 
      name: "Kem dưỡng ẩm", 
      brand: "Hydra Plus", 
      price: "650.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.7,
      reviews: 89,
      category: "Chăm sóc da mặt",
      description: "Kem dưỡng ẩm 24h, phù hợp mọi loại da"
    },
    { 
      name: "Sữa rửa mặt", 
      brand: "Clean Beauty", 
      price: "320.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.6,
      reviews: 156,
      category: "Chăm sóc da mặt",
      description: "Sữa rửa mặt dịu nhẹ, không gây khô da"
    },
    { 
      name: "Mặt nạ collagen", 
      brand: "Youth Glow", 
      price: "450.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.9,
      reviews: 203,
      category: "Chăm sóc da mặt",
      description: "Mặt nạ collagen chống lão hóa, làm căng bóng da"
    },
    { 
      name: "Tinh chất dưỡng da", 
      brand: "Essence Care", 
      price: "720.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.8,
      reviews: 67,
      category: "Chăm sóc da mặt",
      description: "Tinh chất phục hồi và tái tạo da ban đêm"
    },
    { 
      name: "Kem chống nắng", 
      brand: "Sun Shield", 
      price: "380.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.5,
      reviews: 98,
      category: "Chăm sóc da mặt",
      description: "Kem chống nắng SPF 50+, không gây nhờn rít"
    },
    { 
      name: "Dầu dưỡng móng", 
      brand: "Nail Care", 
      price: "280.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.7,
      reviews: 45,
      category: "Chăm sóc móng",
      description: "Dầu dưỡng móng tự nhiên, giúp móng chắc khỏe"
    },
    { 
      name: "Tẩy trang mắt môi", 
      brand: "Gentle Remove", 
      price: "420.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.6,
      reviews: 78,
      category: "Trang điểm",
      description: "Tẩy trang dịu nhẹ cho vùng mắt và môi nhạy cảm"
    },
    { 
      name: "Kem dưỡng thể", 
      brand: "Body Smooth", 
      price: "550.000đ", 
      image: "/placeholder.svg?height=250&width=200", 
      rating: 4.8,
      reviews: 112,
      category: "Chăm sóc cơ thể",
      description: "Kem dưỡng thể làm mềm mịn da toàn thân"
    }
  ]

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <Badge className="mb-6 px-4 py-2">Sản phẩm mỹ phẩm</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Mỹ phẩm cao cấp chính hãng
          </h1>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Bộ sưu tập mỹ phẩm được tuyển chọn kỹ lưỡng từ các thương hiệu uy tín hàng đầu, 
            cam kết chất lượng và hiệu quả tối ưu cho làn da của bạn.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Select>
            <SelectTrigger className="w-full sm:w-[220px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
              <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
              <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={250}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                      Giảm giá
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity h-9 w-9"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating}) • {product.reviews} đánh giá
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-pink-500">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Mua ngay
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-16">
          <Button variant="outline" size="lg" className="px-8 py-3">
            Xem thêm sản phẩm
          </Button>
        </div>

        {/* Newsletter */}
        <Card className="bg-gradient-to-r from-pink-500 to-purple-600 border-0 text-white">
          <CardContent className="text-center p-12 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold">Đăng ký nhận ưu đãi đặc biệt</h3>
            <p className="opacity-90 max-w-2xl mx-auto">
              Nhận thông báo về sản phẩm mới và các chương trình khuyến mãi hấp dẫn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button variant="secondary" className="px-6 py-3">Đăng ký</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
