-- phpMyAdmin SQL Dump
-- version 4.9.10
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th8 7, 2025 lúc 14:00 PM
-- Phiên bản máy phục vụ: 10.1.18-MariaDB
-- Phiên bản PHP: 8.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `spa`
--

-- --------------------------------------------------------
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Mã hóa bằng bcrypt
  email VARCHAR(100) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE booking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  serviceId INT,
  date DATE NOT NULL,
  time VARCHAR(5) NOT NULL,
  note TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (serviceId) REFERENCES services(id)
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  history JSON
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerId INT,
  serviceId INT,
  date DATE NOT NULL,
  time VARCHAR(5) NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'canceled') DEFAULT 'pending',
  note TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customerId) REFERENCES customers(id),
  FOREIGN KEY (serviceId) REFERENCES services(id)
);

CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  adminId INT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  expiresAt DATETIME NOT NULL,
  FOREIGN KEY (adminId) REFERENCES admin(id)
);