<div align="center">
  <h1>🌸 Elysian Spa</h1>
  <p><strong>Nền tảng Đặt lịch Spa cao cấp</strong></p>
  <em>Website đặt lịch spa giàu tính năng kèm bảng điều khiển admin</em>
  <br><br>

<img src="https://img.shields.io/badge/ReactJS-282C34?logo=react&logoColor=61DAFB" alt="ReactJS logo" title="ReactJS" height="25" />
<img src="https://img.shields.io/badge/NextJs-282C34?logo=next.js" alt="NextJS logo" title="NextJS" height="25" />
<img src="https://img.shields.io/badge/MySQL-005C84?logo=MySql&logoColor=white" alt="MySQL logo" title="MySQL" height="25" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="MySQL logo" title="MySQL" height="25" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white" alt="MySQL logo" title="MySQL" height="25" />

</div>

---

## 🚀 Tổng quan dự án

<div align="center">
  <p><strong>Xây dựng bằng Next.js App Router, React, Tailwind CSS v4 và cơ sở dữ liệu MySQL</strong></p>
  <p>Bao gồm đặt lịch hẹn, quản lý dịch vụ, quản lý khách hàng, đăng nhập admin với session, thống kê/biểu đồ và gửi email</p>
</div>

### 🌐 Đường dẫn hệ thống

<div align="center">
  <table>
    <tr>
      <td align="center">
        <h4>🏠 Trang công khai</h4>
        <p>
          <code>/</code> (trang chủ)<br>
          <code>/services</code><br>
          <code>/booking</code><br>
          <code>/blog</code><br>
          <code>/contact</code>
        </p>
      </td>
      <td align="center">
        <h4>🔧 Trang quản trị</h4>
        <p>
          <code>/login</code>, <code>/register</code><br>
          <code>/admin</code> (dashboard)<br>
          <code>/admin/services</code><br>
          <code>/admin/bookings</code><br>
          <code>/admin/customers</code>
        </p>
      </td>
    </tr>
  </table>
</div>

---

## ✨ Tính năng nổi bật

<div>
  
- **Quy trình đặt lịch** với API phía server và lưu trữ vào MySQL
- **Xác thực Admin** (email + mật khẩu), sử dụng cookie session (`sessionId`) lưu trong DB  
- **Bảng điều khiển Admin** với KPI, biểu đồ, dịch vụ phổ biến
- **CRUD Dịch vụ** (tạo/sửa/xóa) và danh sách dịch vụ công khai
- **Trang khách hàng** với lịch sử đặt chỗ được tổng hợp  
- **Endpoint gửi email** (Gmail qua Nodemailer)
- **UI hiện đại** (Radix UI + Tailwind), responsive và dễ truy cập

</div>

---

## 🛠️ Công nghệ sử dụng

<div align="center">
  
### Frontend
**Next.js 15** (App Router) • **React 19** • **TypeScript**  
**Tailwind CSS v4** (qua `@tailwindcss/postcss`) • **Radix UI** • **shadcn/ui**

### Backend & Database

**Next.js API Routes** • **MySQL/Xampp** với `mysql2/promise`  
**bcryptjs** • **UUID** • **Nodemailer** (Gmail)

### Visualization & Tools

**Recharts** (biểu đồ) • **Axios/Fetch** • **Framer Motion** • **Lucide React**

</div>

---

## 📦 Yêu cầu hệ thống

<div align="center">
  <h3>⚡ Yêu cầu hệ thống</h3>
  <p>
    <strong>Node.js 18.18+</strong> (khuyến nghị 20+ LTS)<br>
    <strong>MySQL hoặc Xampp</strong><br>
    <strong>Tài khoản Gmail</strong> và App Password để gửi email
  </p>
</div>

---

## 🗂️ Cấu trúc dự án

<div align="center">
  
```
spa-project/
├── 📁 app/                         # Next.js App Router & API routes
│   ├── 📁 api/                    # REST endpoints
│   │   ├── 📁 appointments/       # Booking API
│   │   ├── 📁 admin/             # Admin auth & management
│   │   ├── 📁 services/          # Services CRUD
│   │   └── 📁 send-email/        # Email service
│   ├── 📁 admin/                  # Admin interface
│   │   ├── dashboard/            # KPI & analytics
│   │   ├── bookings/             # Booking management  
│   │   ├── services/             # Service management
│   │   └── customers/            # Customer management
│   ├── 📁 booking/, blog/, services/, contact/  # Public pages
├── 📁 components/                 # Reusable UI modules
│   ├── 📁 admin/                 # Admin components
│   ├── 📁 user/                  # Customer components  
│   └── 📁 ui/                    # shadcn/ui primitives
├── 📁 lib/
│   ├── 📄 db.ts                  # MySQL connection pool
│   └── 📄 utils.ts               # Common utilities
├── 📁 public/images/             # Static assets
└── 📄 spa.sql                    # Database schema & sample data
```

</div>

---

## ⚙️ Cấu hình môi trường

<div align="center">
  <h3>🔧 Tạo file <code>.env.local</code> tại thư mục gốc</h3>
</div>

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=spa

# Email Service (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

<div align="center">
  <strong>⚠️ Quan trọng:</strong><br>
  <em>Với Gmail, tạo App Password tại: Tài khoản > Bảo mật > Xác minh 2 bước > App passwords</em><br>
  <em>Không commit các file <code>.env*</code> lên repository</em>
</div>

---

## 🗄️ Khởi tạo cơ sở dữ liệu

<div align="center">
  <h3>💾 Import database schema và mẫu dữ liệu</h3>
</div>

### Windows PowerShell:

```powershell
# Từ thư mục gốc dự án (cần MySQL CLI trong PATH)
mysql -u root -p < .\spa.sql
```

### Hoặc sử dụng GUI tools:

- **MySQL Workbench**
- **phpMyAdmin**
- **Adminer**

<div align="center">
  <p><strong>📋 Các bảng sẽ được tạo:</strong></p>
  <code>admin</code> • <code>services</code> • <code>customers</code> • <code>appointments</code> • <code>sessions</code>
</div>

---

## 🚀 Cài đặt và chạy dự án

### 1️⃣ Clone repository

```bash
git clone https://github.com/yourusername/elysian-spa.git
cd elysian-spa
```

### 2️⃣ Cài đặt dependencies

```bash
npm install
```

### 3️⃣ Chạy development server

```bash
npm run dev
```

### 4️⃣ Build production

```bash
npm run build
npm start
```

<div align="center">
  <h3>🎉 Truy cập ứng dụng tại</h3>
  <strong><a href="http://localhost:3000">http://localhost:3000</a></strong>
</div>

---

## 👨‍💼 Quy trình Admin lần đầu

<div align="center">
  
### 📝 **Bước 1**: Đăng ký admin tại `/register`
*Lưu admin, tạo session trong DB, đặt cookie `sessionId`*

### 🔑 **Bước 2**: Đăng nhập tại `/login`

_Tạo session mới nếu thông tin hợp lệ_

### 📊 **Bước 3**: Truy cập dashboard tại `/admin`

_Session được lưu trong bảng `sessions` và xác thực qua cookie `sessionId`_

</div>

---

## 🔌 Tổng quan về API

<div align="center">
  <em>Tất cả endpoint nằm trong <code>app/api/*</code></em>
</div>

### 🔐 Authentication

```
POST /api/admin/register    → { email, username, password }
POST /api/admin/login       → { email, password } → Set HttpOnly sessionId cookie
GET  /api/admin/profile     → Return admin info or unauthorized
POST /api/admin/logout      → Delete session & cookie
```

### 🛎️ Services Management

```
GET    /api/admin/services     → List all services (admin)
POST   /api/admin/services     → Create service (admin)
GET    /api/admin/services/[id] → Get service by id
PUT    /api/admin/services/[id] → Update service by id
DELETE /api/admin/services/[id] → Delete service by id
GET    /api/users/services      → Public services grouped by category
```

### 📅 Appointments

```
GET  /api/appointments     → List appointments (join service info)
POST /api/appointments     → Create appointment { fullName, email, phone, serviceId, date, time, note? }
GET  /api/appointments/new → Get pending appointments
```

### 📧 Email Service

```
POST /api/send-email → { to, subject, text } (uses EMAIL_USER/EMAIL_PASSWORD)
```

<div align="center">
  <em>Thông báo chủ yếu bằng tiếng Việt</em>
</div>

---

## 📱 Hình ảnh Demo

<div align="center">
  
### 🏠 Trang chủ
![Homepage](https://via.placeholder.com/800x500/f3e8ff/8b5cf6?text=Customer+Homepage)

### 📊 Admin Dashboard

![Admin Dashboard](https://via.placeholder.com/800x500/e3f2fd/1976d2?text=Admin+Dashboard+Analytics)

### 📅 Hệ thống quản lí đặt lịch

![Booking System](https://via.placeholder.com/800x500/f1f8e9/388e3c?text=Booking+Management)

### 🛎️ Hệ thống quản lí dịch vụ

![Service Management](https://via.placeholder.com/800x500/fff3e0/f57c00?text=Service+Management)

</div>

---

## 💾 Dữ liệu mẫu trong cơ sở dữ liệu

<div align="center">

**10 dịch vụ Spa** • **5 khách hàng** • **10 lịch hẹn** với nhiều trạng thái khác nhau
 • **Nội dung tiếng Việt**

</div>

---

## 🎨 Tính năng UI/UX

<div align="center">
  <table>
    <tr>
      <td align="center">
        <h4>🎭 Modern Design</h4>
        <p>Tailwind CSS v4<br>
        Radix UI Components<br>
        shadcn/ui Style</p>
      </td>
      <td align="center">
        <h4>📱 Responsive</h4>
        <p>Mobile-first approach<br>
        Cross-device compatibility<br>
        Touch-friendly interface</p>
      </td>
      <td align="center">
        <h4>♿ Accessibility</h4>
        <p>ARIA compliant<br>
        Keyboard navigation<br>
        Screen reader support</p>
      </td>
    </tr>
  </table>
</div>

---

## 👥 Đội Ngũ Phát Triển

### Thành Viên Nhóm

| **Họ và Tên**      | **Vai Trò**                                   |
| ------------------ | --------------------------------------------- |
| Trương Quốc Bảo    | FullStack |

### Mentor

- `...`: 

## 📜 Giấy Phép

Dự án được phát hành dưới MIT License (https://opensource.org/licenses/MIT). Xem chi tiết trong file `LICENSE`.

## 📬 Liên Hệ

Nếu bạn có câu hỏi hoặc góp ý, vui lòng liên hệ qua:

- Email: tqbao44@gmail.com
- GitHub Issues: Mở issue trên GitHub (https://github.com/Bao44/spa-project/issues)

---
