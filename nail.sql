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
-- Cơ sở dữ liệu: `nail`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE users
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name  VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    phone      VARCHAR(15),
    dob        DATETIME     NOT NULL,
    gender     BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE services
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(100)   NOT NULL,
    description      TEXT,
    price            DECIMAL(10, 2) NOT NULL,
    image            TEXT,
    duration_minutes INT            NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products
(
    id             INT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(100)   NOT NULL,
    product_type   VARCHAR(50),
    description    TEXT,
    price          DECIMAL(10, 2) NOT NULL,
    image          TEXT,
    stock_quantity INT            NOT NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE appointments
(
    appointment_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id          INT      NOT NULL,
    service_id       INT      NOT NULL,
    appointment_date DATETIME NOT NULL,
    status           VARCHAR(20) DEFAULT 'pending',
    created_at       TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (service_id) REFERENCES services (id)
);

CREATE TABLE cart
(
    cart_id    INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    product_id INT NOT NULL,
    quantity   INT NOT NULL,
    added_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);


-- Thêm dữ liệu mẫu cho bảng `users`
INSERT INTO users (first_name, last_name, email, password, phone, dob, gender)
VALUES ('Mai', 'Nguyen', 'mai.nguyen@email.com', '$2y$10$hashedpassword1', '0901234567', '1995-05-15', 1),

       ('Lan', 'Tran', 'lan.tran@email.com', '$2y$10$hashedpassword2', '0912345678', '1990-08-20', 1),
       ('Hùng', 'Phạm', 'hung.pham@email.com', '$2y$10$hashedpassword3', '0923456789', '1988-03-10', 0),
       ('Anh', 'Lê', 'anh.le@email.com', '$2y$10$hashedpassword4', '0934567890', '1997-11-25', 1),
       ('Bình', 'Đỗ', 'binh.do@email.com', '$2y$10$hashedpassword5', '0945678901', '1993-07-30', 0);

-- Thêm dữ liệu mẫu cho bảng `services`
INSERT INTO services (name, description, price, image, duration_minutes)
VALUES ('Manicure cơ bản', 'Cắt, dũa móng, sơn màu đơn giản.', 150000.00, 'images/manicure_basic.jpg', 30),
       ('Manicure gel', 'Sơn gel bền màu, giữ móng sáng bóng.', 250000.00, 'images/manicure_gel.jpg', 45),
       ('Pedicure cơ bản', 'Chăm sóc móng chân, sơn màu cơ bản.', 180000.00, 'images/pedicure_basic.jpg', 40),
       ('Pedicure spa', 'Massage và chăm sóc móng chân chuyên sâu.', 300000.00, 'images/pedicure_spa.jpg', 60),
       ('Sơn gel ombre', 'Sơn gel chuyển màu độc đáo.', 280000.00, 'images/ombre_gel.jpg', 50),
       ('Đắp móng bột', 'Tạo móng giả bằng bột acrylic.', 350000.00, 'images/acrylic_nails.jpg', 90),
       ('Đắp móng gel', 'Tạo móng giả bằng gel bền nhẹ.', 400000.00, 'images/gel_nails.jpg', 90),
       ('Vẽ nail art đơn giản', 'Họa tiết đơn giản trên móng.', 100000.00, 'images/nail_art_simple.jpg', 30),
       ('Vẽ nail art phức tạp', 'Họa tiết cầu kỳ, thiết kế theo yêu cầu.', 200000.00, 'images/nail_art_complex.jpg',
        60),
       ('Chăm sóc cuticle', 'Cắt da thừa, dưỡng móng khỏe mạnh.', 80000.00, 'images/cuticle_care.jpg', 20),
       ('Sơn gel 3D', 'Tạo họa tiết 3D nổi trên móng.', 300000.00, 'images/3d_gel.jpg', 60),
       ('Tháo móng gel/bột', 'Tháo móng giả an toàn, bảo vệ móng thật.', 100000.00, 'images/nail_removal.jpg', 30),
       ('Sơn móng chân gel', 'Sơn gel bền màu cho móng chân.', 200000.00, 'images/pedicure_gel.jpg', 45),
       ('Đính đá móng', 'Trang trí móng bằng đá lấp lánh.', 150000.00, 'images/nail_stones.jpg', 40),
       ('Massage tay/chân', 'Massage thư giãn kèm dưỡng da.', 120000.00, 'images/massage.jpg', 30);

-- Thêm dữ liệu mẫu cho bảng `products`
INSERT INTO products (name, product_type, description, price, image, stock_quantity)
VALUES ('Sơn gel OPI đỏ', 'Sơn móng', 'Sơn gel màu đỏ đậm, bền màu 2-3 tuần.', 200000.00, 'images/opi_red.jpg', 50),
       ('Sơn gel OPI nude', 'Sơn móng', 'Sơn gel màu nude tự nhiên.', 200000.00, 'images/opi_nude.jpg', 40),
       ('Sơn thường Essie hồng', 'Sơn móng', 'Sơn thường màu hồng phấn thời thượng.', 150000.00,
        'images/essie_pink.jpg', 60),
       ('Sơn gel DND xanh', 'Sơn móng', 'Sơn gel màu xanh ngọc, sáng bóng.', 220000.00, 'images/dnd_green.jpg', 30),
       ('Sơn gel CND vàng', 'Sơn móng', 'Sơn gel màu vàng ánh kim.', 230000.00, 'images/cnd_gold.jpg', 25),
       ('Sơn top coat', 'Sơn móng', 'Lớp phủ bóng bảo vệ móng.', 100000.00, 'images/top_coat.jpg', 70),
       ('Sơn base coat', 'Sơn móng', 'Lớp lót bảo vệ móng trước khi sơn.', 100000.00, 'images/base_coat.jpg', 65),
       ('Nước rửa móng acetone', 'Dụng cụ', 'Dung dịch tẩy sơn móng hiệu quả.', 80000.00, 'images/acetone.jpg', 100),
       ('Kềm cắt móng', 'Dụng cụ', 'Kềm cắt móng chất lượng cao.', 50000.00, 'images/nail_clipper.jpg', 80),
       ('Dũa móng kim cương', 'Dụng cụ', 'Dũa móng bền, tạo hình móng chính xác.', 30000.00, 'images/diamond_file.jpg',
        90),
       ('Bộ 10 cây cọ vẽ nail', 'Dụng cụ', 'Cọ vẽ nail đa dạng kích cỡ.', 120000.00, 'images/nail_brush_set.jpg', 40),
       ('Đá trang trí móng 1mm', 'Phụ kiện', 'Đá lấp lánh kích thước 1mm.', 50000.00, 'images/stones_1mm.jpg', 100),
       ('Đá trang trí móng 2mm', 'Phụ kiện', 'Đá lấp lánh kích thước 2mm.', 60000.00, 'images/stones_2mm.jpg', 80),
       ('Sticker nail hoa', 'Phụ kiện', 'Miếng dán nail họa tiết hoa.', 30000.00, 'images/flower_sticker.jpg', 120),
       ('Sticker nail kim tuyến', 'Phụ kiện', 'Miếng dán nail lấp lánh kim tuyến.', 35000.00,
        'images/glitter_sticker.jpg', 110),
       ('Bột acrylic trắng', 'Nguyên liệu', 'Bột acrylic trắng để đắp móng.', 150000.00, 'images/acrylic_white.jpg',
        50),
       ('Bột acrylic hồng', 'Nguyên liệu', 'Bột acrylic hồng tự nhiên.', 150000.00, 'images/acrylic_pink.jpg', 50),
       ('Gel đắp móng clear', 'Nguyên liệu', 'Gel trong suốt để đắp móng.', 200000.00, 'images/gel_clear.jpg', 40),
       ('Gel đắp móng nude', 'Nguyên liệu', 'Gel màu nude để đắp móng.', 220000.00, 'images/gel_nude.jpg', 35),
       ('Dầu dưỡng móng', 'Chăm sóc', 'Dầu dưỡng cuticle và móng.', 80000.00, 'images/cuticle_oil.jpg', 60),
       ('Kem dưỡng da tay', 'Chăm sóc', 'Kem dưỡng ẩm da tay.', 100000.00, 'images/hand_cream.jpg', 70),
       ('Mặt nạ chân', 'Chăm sóc', 'Mặt nạ dưỡng da chân mềm mại.', 120000.00, 'images/foot_mask.jpg', 50),
       ('Sơn gel ánh nhũ', 'Sơn móng', 'Sơn gel ánh nhũ thời thượng.', 250000.00, 'images/glitter_gel.jpg', 30),
       ('Sơn thường OPI trắng', 'Sơn móng', 'Sơn thường màu trắng tinh khôi.', 150000.00, 'images/opi_white.jpg', 60),
       ('Sơn gel DND tím', 'Sơn móng', 'Sơn gel màu tím mộng mơ.', 220000.00, 'images/dnd_purple.jpg', 35),
       ('Máy mài móng mini', 'Dụng cụ', 'Máy mài móng cầm tay tiện lợi.', 300000.00, 'images/nail_drill.jpg', 20),
       ('Đèn UV/LED', 'Dụng cụ', 'Đèn UV/LED để làm khô gel.', 500000.00, 'images/uv_led_lamp.jpg', 15),
       ('Bộ vệ sinh móng', 'Dụng cụ', 'Bộ dụng cụ vệ sinh móng chuyên nghiệp.', 150000.00,
        'images/nail_cleaning_kit.jpg', 40),
       ('Hộp đựng dụng cụ nail', 'Dụng cụ', 'Hộp đựng dụng cụ nail gọn gàng.', 100000.00, 'images/nail_tool_box.jpg',
        30),
       ('Băng keo trang trí nail', 'Phụ kiện', 'Băng keo tạo họa tiết nail.', 25000.00, 'images/nail_tape.jpg', 150);

-- Thêm dữ liệu mẫu cho bảng `appointments`
INSERT INTO appointments (user_id, service_id, appointment_date, status)
VALUES (6, 16, '2025-08-10 10:00:00', 'confirmed'),
       (7, 23, '2025-08-10 14:00:00', 'pending'),
       (8, 17, '2025-08-11 09:30:00', 'completed'),
       (9, 18, '2025-08-12 15:00:00', 'pending'),
       (10, 22, '2025-08-13 11:00:00', 'confirmed');

-- Thêm dữ liệu mẫu cho bảng `cart`
INSERT INTO cart (user_id, product_id, quantity)
VALUES (6, 31, 2),
       (7, 33, 1),
       (8, 38, 3),
       (9, 40, 2),
       (10, 41, 1);