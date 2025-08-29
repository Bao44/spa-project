-- phpMyAdmin SQL Dump
-- version 4.9.10
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 19, 2025 at 05:02 PM +07:00
-- Server version: 10.1.18-MariaDB
-- PHP Version: 8.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+07:00"; -- Đặt múi giờ theo Việt Nam

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spa`
--

-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `spa` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `spa`;

--
-- Table structure for table `admin`
--
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Mã hóa bằng bcrypt
  email VARCHAR(100) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

--
-- Table structure for table `services`
--
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  originalPrice DECIMAL(10, 2) NULL,
  duration INT NOT NULL,
  category VARCHAR(50),
  benefits JSON,
  image VARCHAR(255) NULL
);

--
-- Table structure for table `customers`
--
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  history JSON DEFAULT '[]',
  UNIQUE KEY (email),
  UNIQUE KEY (phone)
);

--
-- Table structure for table `appointments`
--
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerId INT NULL,
  serviceId INT NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(5) NOT NULL,
  status ENUM('pending', 'confirmed', 'in-progress', 'completed', 'canceled') DEFAULT 'pending',
  note TEXT,
  fullName VARCHAR(100) NULL,
  email VARCHAR(100) NULL,
  phone VARCHAR(10) NULL,
  adminId INT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customerId) REFERENCES customers(id),
  FOREIGN KEY (serviceId) REFERENCES services(id),
  FOREIGN KEY (adminId) REFERENCES admin(id)
);

--
-- Table structure for table `sessions`
--
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  adminId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  expiresAt DATETIME NOT NULL,
  FOREIGN KEY (adminId) REFERENCES admin(id)
);

-- --------------------------------------------------------
-- Dữ liệu mẫu
-- --------------------------------------------------------

-- Dữ liệu cho bảng `services` (10 bản ghi)
INSERT INTO services (name, description, price, originalPrice, duration, category, benefits, image) VALUES
('Massage Thư Giãn Toàn Thân', 'Dịch vụ massage toàn thân giúp giảm căng thẳng và thư giãn cơ bắp.', 80, 100, 90, 'Massage', '["Thư giãn", "Giảm stress", "Cải thiện tuần hoàn"]', '/images/Massage-Therapy.jpg'),
('Chăm Sóc Da Mặt Cao Cấp', 'Liệu trình chăm sóc da mặt với công nghệ hiện đại, làm sáng da và giảm mụn.', 120, NULL, 60, 'Mặt', '["Làm sáng da", "Giảm mụn", "Dưỡng ẩm"]', '/images/Cham-Soc-Da-Mat.jpg'),
('Gói Chăm Sóc Cơ Thể Detox', 'Gói detox toàn diện giúp thải độc và tái tạo năng lượng.', 150, 180, 120, 'Body', '["Thải độc", "Tái tạo năng lượng", "Cải thiện sức khỏe"]', '/images/Deep-Tissue-Massage.jpeg'),
('Massage Đá Nóng', 'Massage bằng đá nóng giúp giảm đau nhức và tăng tuần hoàn máu.', 90, 110, 75, 'Massage', '["Giảm đau nhức", "Tăng tuần hoàn", "Thư giãn sâu"]', '/images/Hot-Stone-Massage.jpg'),
('Gói Dịch Vụ Chăm Sóc Da 3 Buổi', 'Gói 3 buchăm sóc da mặt với ổi giá ưu đãi.', 300, 350, 180, 'Gói dịch vụ', '["Làm sáng da", "Dưỡng ẩm", "Phục hồi da"]', '/images/Hydrafacial-Premium.jpg'),
('Chăm Sóc Da Chống Lão Hóa', 'Liệu trình đặc biệt giúp giảm nếp nhăn và tái tạo da.', 140, 160, 70, 'Mặt', '["Giảm nếp nhăn", "Tái tạo da", "Dưỡng ẩm sâu"]', '/images/Anti-Aging-Facial.jpg'),
('Massage Chân Cải Thiện Tầm Vóc', 'Massage chân chuyên sâu giúp cải thiện tuần hoàn và giảm mệt mỏi.', 250, 350, 60, 'Massage', '["Cải thiện tuần hoàn", "Giảm mệt mỏi", "Thư giãn chân"]', '/images/spa.webp'),
('Gói Thư Giãn Toàn Diện 2 Giờ', 'Kết hợp massage và chăm sóc da trong một gói dịch vụ cao cấp.', 200, 2500, 120, 'Gói dịch vụ', '["Thư giãn toàn diện", "Dưỡng da", "Giảm stress"]', '/images/Swedish-Relaxation-Massage.png'),
('Chăm Sóc Cơ Thể Bằng Tinh Dầu', 'Sử dụng tinh dầu thiên nhiên để nuôi dưỡng và làm mềm da.', 700, NULL, 90, 'Body', '["Nuôi dưỡng da", "Làm mềm da", "Thư giãn"]', '/images/Luxury-Body.jpg'),
('Massage Mẹ Bầu An Toàn', 'Dịch vụ massage chuyên biệt cho bà bầu, an toàn và thư giãn.', 320, 450, 80, 'Massage', '["Thư giãn", "Giảm đau lưng", "An toàn cho mẹ bầu"]', '/images/Slimming-Body.jpg');

-- Dữ liệu cho bảng `customers` (5 bản ghi)
INSERT INTO customers (fullName, email, phone, history) VALUES
('Nguyễn Văn Anh', 'vana@gmail.com', '0901234567', '[]'),
('Trần Thị Bê', 'tbi@gmail.com', '0912345678', '[]'),
('Lê Văn Xê', 'lvc@gmail.com', '0923456789', '[]'),
('Phạm Thị Dê', 'ptd@gmail.com', '0934567890', '[]'),
('Lý Minh Tèo', 'lmt@gmail.com', '0945678901', '[]');

-- Dữ liệu cho bảng `appointments` (5 bản ghi với status pending)
INSERT INTO appointments (customerId, serviceId, date, time, status, note, fullName, email, phone, createdAt) VALUES
(1, 1, '2025-08-20', '10:00', 'pending', 'Muốn massage thư giãn sâu', 'Nguyễn Văn Anh', 'vana@gmail.com', '0901234567', '2025-08-20 16:00:00'),
(2, 2, '2025-08-21', '14:00', 'pending', 'Đặt cho buổi chiều', 'Trần Thị Bê', 'tbi@gmail.com', '0912345678', '2025-08-21 16:30:00'),
(3, 3, '2025-08-22', '09:30', 'pending', 'Cần gói detox gấp', 'Lê Văn Xê', 'lvc@gmail.com', '0923456789', '2025-08-22 16:30:00'),
(4, 4, '2025-08-23', '16:00', 'pending', 'Thích massage đá nóng', 'Phạm Thị Dê', 'ptd@gmail.com', '0934567890', '2025-08-23 10:30:00'),
(5, 5, '2025-08-24', '11:00', 'pending', 'Đặt gói 3 buổi', 'Lý Minh Tèo', 'hve@gmail.com', '0945678901', '2025-08-24 13:00:00'),
(2, 6, '2025-08-25', '19:00', 'pending', 'Đặt gói 3 buổi', 'Trần Thị Bê', 'tbi@gmail.com', '0912345678', '2025-08-24 13:00:00'),
(4, 7, '2025-08-26', '09:30', 'pending', 'Cần gói detox gấp', 'Phạm Thị Dê', 'ptd@gmail.com', '0934567890', '2025-08-23 10:30:00'),
(1, 8, '2025-08-27', '17:00', 'pending', 'Đặt gói 3 buổi', 'Nguyễn Văn Anh', 'vana@gmail.com', '0901234567', '2025-08-20 16:00:00'),
(3, 9, '2025-08-28', '10:00', 'pending', 'Muốn massage thư giãn sâu', 'Lê Văn Xê', 'lvc@gmail.com', '0923456789', '2025-08-22 16:30:00'),
(5, 3, '2025-08-29', '11:00', 'pending', 'Đặt gói 3 buổi', 'Lý Minh Tèo', 'hve@gmail.com', '0945678901', '2025-08-24 13:00:00');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;