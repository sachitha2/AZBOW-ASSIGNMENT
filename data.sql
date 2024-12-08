-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 08, 2024 at 01:42 PM
-- Server version: 10.8.3-MariaDB-1:10.8.3+maria~jammy
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Face', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(2, 'Lipstick', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(3, 'Lips', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(4, 'Lip Liner', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(5, 'Moisturiser', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(6, 'Skin', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(7, 'Body', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(8, 'Facewash', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(9, 'Hand', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(10, 'Hair', '2024-12-08 09:56:14', '2024-12-08 09:56:14'),
(12, 'TEST', '2024-12-08 13:31:56', '2024-12-08 13:31:56');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `in_stock` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `price`, `in_stock`, `createdAt`, `updatedAt`) VALUES
('P001', 'Aloe Facewash', 1200, 500, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P002', 'Damson Lip Liner', 1400, 150, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P003', 'Glow - Day Creame', 3250, 225, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P004', 'Hair Repair Conditioner', 1499, 320, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P005', 'Hair Repair Shampoo', 1899, 310, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P006', 'Jasmin Bodywash', 1450, 340, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P007', 'Kohomba Facewash', 1550, 500, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P008', 'Mint Bodywash', 1550, 200, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P009', 'Radient - Night Creame', 3000, 160, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P010', 'Red Glossy Lipstik', 2, 150, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P011', 'Tea Tree Facewash', 1350, 500, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P012', 'Tumeric Handwash', 600, 150, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P013', 'Wine Lip Liner', 1200, 75, '2024-12-08 10:03:49', '2024-12-08 10:03:49'),
('P014', 'TEST', 1899, 310, '2024-12-08 13:32:16', '2024-12-08 13:32:16');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `product_id` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES
('P001', 1),
('P001', 6),
('P001', 8),
('P002', 1),
('P002', 3),
('P002', 4),
('P003', 1),
('P003', 5),
('P003', 6),
('P003', 7),
('P004', 10),
('P005', 10),
('P006', 6),
('P006', 7),
('P007', 1),
('P007', 6),
('P007', 8),
('P008', 6),
('P008', 7),
('P009', 1),
('P009', 5),
('P009', 6),
('P009', 7),
('P010', 1),
('P010', 2),
('P010', 3),
('P011', 1),
('P011', 6),
('P011', 8),
('P012', 6),
('P012', 9),
('P013', 1),
('P013', 3),
('P013', 4),
('P014', 12);

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `product_id` varchar(255) NOT NULL,
  `product_description` text NOT NULL,
  `directions` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`product_id`, `product_description`, `directions`) VALUES
('P001', 'Removes dead skin and effective on dry skin types', 'HOW TO USE:\n\nWash face with clean water and apply product on face. Finally rinse with clean water'),
('P002', 'Defines and creates a neat lip outline resulting on full, bold lips.', 'HOW TO USE:\n\nPrime and line lips with lip liner.\nFill in to wear alone, or apply lipstick to complete the look.\nFor an even bolder look, fill in and apply Colour Lipstick on top'),
('P003', 'Keeps your skin from being damaged while you go through your everyday tasks', 'HOW TO USE:\n\nCleanse area to apply and apply cream'),
('P004', 'Repair your damaged and dry hair with this amazing solution', 'Wash hair with clean water and apply product. Rinse with clean cold water'),
('P005', 'Repair your damaged and dry hair with this amazing solution', 'Wash hair with clean water and apply product. Rinse with clean cold water'),
('P006', 'Makes you feel like you are in a field of jasmin. Feeling fresh and amazing', 'Wash body with clean water and apply. Finally rinse with clean water'),
('P007', 'For pimple prone skin. Fights germs and cleans your face', 'HOW TO USE:\n\nWash face with clean water and apply product on face. Finally rinse with clean water'),
('P008', 'Feel mint freshness all through your body and take the day with mint filled energy', 'Wash body with clean water and apply. Finally rinse with clean water'),
('P009', 'Rejuvinates your skin while you rest and sleep at night', 'HOW TO USE:\n\nCleanse area to apply and apply cream'),
('P010', 'Load your lips with long lasting and impeccable red colour to fulfill your makeup requirements.', 'HOW TO USE:\n\n1. Exfoliate your lips.\n2. Line your lips with the CCUK Lip definer, then fill them in.\n3. Blot your lips for an extra-matte finish.\n*Please note that actual colours may vary slightly.'),
('P011', 'Cleans the dirt and oil from your face and gives a bright healthy look', 'HOW TO USE:\n\nCleanse area to apply and apply cream'),
('P012', 'Effectifly removes dirt and germs from skin', 'Wash hands using one or two drops of the handwash whenever needed.'),
('P013', 'Defines and creates a neat lip outline resulting on full, bold lips.', 'HOW TO USE:\n\nPrime and line lips with lip liner.\nFill in to wear alone, or apply lipstick to complete the look.\nFor an even bolder look, fill in and apply Colour Lipstick on top'),
('P014', 'Makes you feel like you are in a field of jasmin. Feeling fresh and amazing', 'Wash body with clean water and apply. Finally rinse with clean water');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `image_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`image_id`, `product_id`, `image_url`) VALUES
(1, 'P001', '/uploads/images/1733652962717-481938549.png'),
(2, 'P001', '/uploads/images/1733652962893-97099624.png'),
(3, 'P002', '/uploads/images/1733652962921-205268543.png'),
(4, 'P002', '/uploads/images/1733652962947-562416391.png'),
(5, 'P003', '/uploads/images/1733652962986-163331935.png'),
(6, 'P003', '/uploads/images/1733652963013-662201173.png'),
(7, 'P004', '/uploads/images/1733652963031-173170408.png'),
(8, 'P005', '/uploads/images/1733652963054-130354243.png'),
(9, 'P006', '/uploads/images/1733652963074-848408083.png'),
(10, 'P007', '/uploads/images/1733652963096-152653321.png'),
(11, 'P007', '/uploads/images/1733652963123-412383031.png'),
(12, 'P007', '/uploads/images/1733652963159-757450528.png'),
(13, 'P008', '/uploads/images/1733652963198-106977546.png'),
(14, 'P009', '/uploads/images/1733652963212-988819260.png'),
(15, 'P009', '/uploads/images/1733652963250-89536779.png'),
(16, 'P010', '/uploads/images/1733652963277-473297188.png'),
(17, 'P010', '/uploads/images/1733652963297-970195722.png'),
(18, 'P010', '/uploads/images/1733652963325-348430019.png'),
(19, 'P010', '/uploads/images/1733652963341-540945073.png'),
(20, 'P011', '/uploads/images/1733652963355-319984020.png'),
(21, 'P011', '/uploads/images/1733652963369-496481376.png'),
(22, 'P012', '/uploads/images/1733652963384-860519045.png'),
(23, 'P013', '/uploads/images/1733652963402-447212197.png'),
(24, 'P013', '/uploads/images/1733652963411-753155641.png'),
(25, 'P013', '/uploads/images/1733652963423-62318532.png'),
(26, 'P014', '/uploads/images/1733664947900-155789603.png'),
(27, 'P014', '/uploads/images/1733665044018-26330850.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD UNIQUE KEY `product_categories_product_id_category_id_unique` (`product_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
