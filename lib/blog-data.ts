export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "10-buoc-cham-soc-da-mua-dong",
    title: "10 Bước Chăm Sóc Da Mùa Đông Không Thể Bỏ Qua",
    excerpt:
      "Mùa đông khiến da khô, nứt nẻ và mất độ ẩm. Khám phá 10 bước chăm sóc da hiệu quả để duy trì làn da mềm mại, tươi sáng suốt mùa lạnh.",
    content: `
# 10 Bước Chăm Sóc Da Mùa Đông Không Thể Bỏ Qua

Mùa đông là thời điểm da dễ bị khô, nứt nẻ và mất độ ẩm do thời tiết lạnh và độ ẩm thấp. Để duy trì làn da khỏe mạnh và tươi sáng, bạn cần có một quy trình chăm sóc da phù hợp.

## 1. Làm sạch da nhẹ nhàng

Sử dụng sữa rửa mặt dịu nhẹ, không chứa sulfate để tránh làm khô da. Rửa mặt với nước ấm thay vì nước nóng.

## 2. Tẩy tế bào chết định kỳ

Tẩy tế bào chết 1-2 lần/tuần để loại bỏ da chết, giúp các sản phẩm dưỡng da thẩm thấu tốt hơn.

## 3. Sử dụng toner cấp ẩm

Chọn toner không chứa cồn, giàu hyaluronic acid và glycerin để cấp ẩm cho da.

## 4. Serum dưỡng ẩm

Sử dụng serum chứa vitamin C, E và các peptide để nuôi dưỡng da từ sâu bên trong.

## 5. Kem dưỡng ẩm đậm đặc

Chọn kem dưỡng có kết cấu đậm đặc hơn so với mùa hè để khóa ẩm hiệu quả.

## 6. Chống nắng hàng ngày

Dù trời lạnh vẫn cần thoa kem chống nắng SPF 30+ để bảo vệ da khỏi tia UV.

## 7. Đắp mặt nạ dưỡng ẩm

Sử dụng mặt nạ dưỡng ẩm 2-3 lần/tuần để cung cấp độ ẩm sâu cho da.

## 8. Uống đủ nước

Duy trì việc uống 2-3 lít nước/ngày để cấp ẩm cho da từ bên trong.

## 9. Sử dụng máy tạo độ ẩm

Đặt máy tạo độ ẩm trong phòng để duy trì độ ẩm không khí 40-60%.

## 10. Chăm sóc môi và mắt

Sử dụng son dưỡng môi và kem mắt chuyên dụng để bảo vệ những vùng da mỏng manh.

Áp dụng đều đặn 10 bước này, bạn sẽ có làn da khỏe mạnh và rạng rỡ suốt mùa đông!
    `,
    author: "Dr. Nguyễn Thị Lan",
    publishedAt: "2024-01-15",
    readTime: "5 phút",
    category: "Chăm sóc da",
    tags: ["chăm sóc da", "mùa đông", "dưỡng ẩm", "skincare"],
    image: "/images/about-2.jpg?height=400&width=600",
    featured: true,
  },
  {
    slug: "loi-ich-massage-thai-doc",
    title: "Lợi Ích Tuyệt Vời Của Massage Thải Độc Cho Sức Khỏe",
    excerpt:
      "Massage thải độc không chỉ giúp thư giãn mà còn mang lại nhiều lợi ích sức khỏe. Tìm hiểu cách massage giúp cơ thể loại bỏ độc tố và tái tạo năng lượng.",
    content: `
# Lợi Ích Tuyệt Vời Của Massage Thải Độc Cho Sức Khỏe

Massage thải độc là một phương pháp chăm sóc sức khỏe tự nhiên, giúp cơ thể loại bỏ độc tố và tái tạo năng lượng một cách hiệu quả.

## Massage thải độc là gì?

Massage thải độc là kỹ thuật massage đặc biệt, tập trung vào việc kích thích hệ thống bạch huyết và tuần hoàn máu để giúp cơ thể loại bỏ độc tố tích tụ.

## Lợi ích của massage thải độc

### 1. Tăng cường hệ miễn dịch
Massage giúp kích thích hệ bạch huyết, tăng cường khả năng chống lại bệnh tật.

### 2. Cải thiện tuần hoàn máu
Các động tác massage giúp máu lưu thông tốt hơn, mang oxy và dưỡng chất đến các tế bào.

### 3. Giảm stress và căng thẳng
Massage giúp giải phóng hormone endorphin, mang lại cảm giác thư giãn và hạnh phúc.

### 4. Loại bỏ độc tố
Kích thích quá trình trao đổi chất, giúp cơ thể đào thải độc tố qua da và hệ bài tiết.

### 5. Cải thiện giấc ngủ
Massage giúp thư giãn cơ bắp và tinh thần, mang lại giấc ngủ sâu và chất lượng.

## Khi nào nên massage thải độc?

- Khi cảm thấy mệt mỏi, căng thẳng
- Sau kỳ nghỉ lễ ăn uống nhiều
- Khi da xỉn màu, mụn nhiều
- Muốn tăng cường sức khỏe tổng thể

Hãy đến Elysian Spa để trải nghiệm massage thải độc chuyên nghiệp!
    `,
    author: "Therapist Mai Anh",
    publishedAt: "2024-01-10",
    readTime: "4 phút",
    category: "Massage",
    tags: ["massage", "thải độc", "sức khỏe", "wellness"],
    image: "/images/Massage-Therapy.jpg?height=400&width=600",
    featured: false,
  },
  {
    slug: "xu-huong-lam-dep-2024",
    title: "Xu Hướng Làm Đẹp 2024: Những Điều Bạn Cần Biết",
    excerpt:
      "Năm 2024 mang đến nhiều xu hướng làm đẹp mới. Từ skincare tối giản đến công nghệ beauty hiện đại, khám phá những trend hot nhất năm nay.",
    content: `
# Xu Hướng Làm Đẹp 2024: Những Điều Bạn Cần Biết

Năm 2024 đánh dấu sự chuyển mình mạnh mẽ trong ngành làm đẹp với nhiều xu hướng mới thú vị và bền vững.

## 1. Skincare Tối Giản (Skinimalism)

Xu hướng sử dụng ít sản phẩm hơn nhưng chất lượng cao, tập trung vào những bước cơ bản nhất.

## 2. Làm Đẹp Bền Vững

- Sản phẩm thân thiện môi trường
- Bao bì có thể tái chế
- Thành phần tự nhiên, organic

## 3. Công Nghệ AI trong Beauty

- Phân tích da bằng AI
- Tư vấn sản phẩm cá nhân hóa
- Ứng dụng thử makeup ảo

## 4. Wellness Beauty

Kết hợp chăm sóc sắc đẹp với sức khỏe tinh thần và thể chất.

## 5. Inclusive Beauty

Sản phẩm phù hợp với mọi loại da, mọi độ tuổi và giới tính.

## 6. Microbiome Skincare

Chăm sóc hệ vi sinh trên da để duy trì làn da khỏe mạnh tự nhiên.

Hãy cập nhật những xu hướng này để có làn da đẹp nhất năm 2024!
    `,
    author: "Beauty Expert Linh Chi",
    publishedAt: "2024-01-05",
    readTime: "6 phút",
    category: "Xu hướng",
    tags: ["xu hướng", "làm đẹp", "2024", "beauty trends"],
    image: "/images/Anti-Aging-Facial.jpg?height=400&width=600",
    featured: true,
  },
  {
    slug: "cach-chon-serum-vitamin-c",
    title: "Cách Chọn Serum Vitamin C Phù Hợp Với Từng Loại Da",
    excerpt:
      "Vitamin C là thành phần vàng trong skincare, nhưng không phải ai cũng biết cách chọn đúng. Hướng dẫn chi tiết cách chọn serum vitamin C cho từng loại da.",
    content: `
# Cách Chọn Serum Vitamin C Phù Hợp Với Từng Loại Da

Vitamin C là một trong những thành phần quan trọng nhất trong skincare, nhưng việc chọn đúng loại serum vitamin C cho từng loại da là điều không phải ai cũng biết.

## Lợi ích của Vitamin C

- Chống oxy hóa mạnh mẽ
- Kích thích sản sinh collagen
- Làm sáng da, mờ thâm nám
- Bảo vệ da khỏi tác hại môi trường

## Các dạng Vitamin C phổ biến

### 1. L-Ascorbic Acid
- Dạng tinh khiết nhất
- Hiệu quả cao nhưng dễ oxy hóa
- Phù hợp da dầu, da hỗn hợp

### 2. Magnesium Ascorbyl Phosphate
- Ổn định hơn L-Ascorbic Acid
- Dịu nhẹ, ít kích ứng
- Phù hợp da nhạy cảm

### 3. Sodium Ascorbyl Phosphate
- Có tác dụng kháng khuẩn
- Phù hợp da mụn

## Cách chọn theo loại da

### Da khô
- Chọn serum có kết cấu dầy, chứa hyaluronic acid
- Nồng độ 10-15%

### Da dầu
- Chọn dạng L-Ascorbic Acid
- Kết cấu nhẹ, thấm nhanh
- Nồng độ 15-20%

### Da nhạy cảm
- Bắt đầu với nồng độ thấp (5-10%)
- Chọn dạng Magnesium Ascorbyl Phosphate

### Da mụn
- Chọn Sodium Ascorbyl Phosphate
- Tránh các thành phần gây bít tắc lỗ chân lông

## Cách sử dụng đúng

1. Sử dụng vào buổi sáng
2. Thoa sau toner, trước kem dưỡng
3. Luôn sử dụng kem chống nắng
4. Bảo quản nơi tối, mát

Hãy đến Elysian Spa để được tư vấn chọn serum vitamin C phù hợp nhất!
    `,
    author: "Skincare Specialist Hương Giang",
    publishedAt: "2024-01-01",
    readTime: "7 phút",
    category: "Chăm sóc da",
    tags: ["vitamin c", "serum", "skincare", "chăm sóc da"],
    image: "/images/about-4.webp?height=400&width=600",
    featured: false,
  },
];

export const categories = [
  { name: "Chăm sóc da", count: 12 },
  { name: "Massage", count: 8 },
  { name: "Xu hướng", count: 6 },
  { name: "Wellness", count: 5 },
  { name: "DIY", count: 4 },
  { name: "Nutrition", count: 3 },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}
