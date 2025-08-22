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
('Massage Thư Giãn Toàn Thân', 'Dịch vụ massage toàn thân giúp giảm căng thẳng và thư giãn cơ bắp.', 80000, 100000, 90, 'massage', '["Thư giãn", "Giảm stress", "Cải thiện tuần hoàn"]', '/images/Massage-Therapy.jpg'),
('Chăm Sóc Da Mặt Cao Cấp', 'Liệu trình chăm sóc da mặt với công nghệ hiện đại, làm sáng da và giảm mụn.', 1200000, NULL, 60, 'facial', '["Làm sáng da", "Giảm mụn", "Dưỡng ẩm"]', '/images/Cham-Soc-Da-Mat.jpg'),
('Gói Chăm Sóc Cơ Thể Detox', 'Gói detox toàn diện giúp thải độc và tái tạo năng lượng.', 150000, 180000, 120, 'body', '["Thải độc", "Tái tạo năng lượng", "Cải thiện sức khỏe"]', '/images/Deep-Tissue-Massage.jpeg'),
('Massage Đá Nóng', 'Massage bằng đá nóng giúp giảm đau nhức và tăng tuần hoàn máu.', 90000, 110000, 75, 'massage', '["Giảm đau nhức", "Tăng tuần hoàn", "Thư giãn sâu"]', '/images/Hot-Stone-Massage.jpg'),
('Gói Dịch Vụ Chăm Sóc Da 3 Buổi', 'Gói 3 buchăm sóc da mặt với ổi giá ưu đãi.', 300000, 350000, 180, 'package', '["Làm sáng da", "Dưỡng ẩm", "Phục hồi da"]', '/images/Hydrafacial-Premium.jpg'),
('Chăm Sóc Da Chống Lão Hóa', 'Liệu trình đặc biệt giúp giảm nếp nhăn và tái tạo da.', 140000, 160000, 70, 'facial', '["Giảm nếp nhăn", "Tái tạo da", "Dưỡng ẩm sâu"]', '/images/Anti-Aging-Facial.jpg'),
('Massage Chân Cải Thiện Tầm Vóc', 'Massage chân chuyên sâu giúp cải thiện tuần hoàn và giảm mệt mỏi.', 60000, 75000, 60, 'massage', '["Cải thiện tuần hoàn", "Giảm mệt mỏi", "Thư giãn chân"]', '/images/spa.webp'),
('Gói Thư Giãn Toàn Diện 2 Giờ', 'Kết hợp massage và chăm sóc da trong một gói dịch vụ cao cấp.', 200000, 250000, 120, 'package', '["Thư giãn toàn diện", "Dưỡng da", "Giảm stress"]', '/images/Swedish-Relaxation-Massage.png'),
('Chăm Sóc Cơ Thể Bằng Tinh Dầu', 'Sử dụng tinh dầu thiên nhiên để nuôi dưỡng và làm mềm da.', 110000, NULL, 90, 'body', '["Nuôi dưỡng da", "Làm mềm da", "Thư giãn"]', '/images/Luxury-Body.jpg'),
('Massage Mẹ Bầu An Toàn', 'Dịch vụ massage chuyên biệt cho bà bầu, an toàn và thư giãn.', 100000, 120000, 80, 'massage', '["Thư giãn", "Giảm đau lưng", "An toàn cho mẹ bầu"]', '/images/Slimming-Body.jpg');

-- Dữ liệu cho bảng `customers` (5 bản ghi)
INSERT INTO customers (fullName, email, phone, history) VALUES
('Nguyen Van A', 'vana@example.com', '0901234567', '[]'),
('Tran Thi B', 'tbi@example.com', '0912345678', '[]'),
('Le Van C', 'lvc@example.com', '0923456789', '[]'),
('Pham Thi D', 'ptd@example.com', '0934567890', '[]'),
('Hoang Van E', 'hve@example.com', '0945678901', '[]');

-- Dữ liệu cho bảng `appointments` (5 bản ghi với status pending)
INSERT INTO appointments (customerId, serviceId, date, time, status, note, fullName, email, phone, createdAt) VALUES
(1, 1, '2025-08-20', '10:00', 'pending', 'Muốn massage thư giãn sâu', 'Nguyen Van A', 'vana@example.com', '0901234567', '2025-08-19 16:00:00'),
(2, 2, '2025-08-21', '14:00', 'pending', 'Đặt cho buổi chiều', 'Tran Thi B', 'tbi@example.com', '0912345678', '2025-08-19 16:05:00'),
(3, 3, '2025-08-22', '09:30', 'pending', 'Cần gói detox gấp', 'Le Van C', 'lvc@example.com', '0923456789', '2025-08-19 16:10:00'),
(4, 4, '2025-08-23', '16:00', 'pending', 'Thích massage đá nóng', 'Pham Thi D', 'ptd@example.com', '0934567890', '2025-08-19 16:15:00'),
(5, 5, '2025-08-24', '11:00', 'pending', 'Đặt gói 3 buổi', 'Hoang Van E', 'hve@example.com', '0945678901', '2025-08-19 16:20:00');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;