-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for butitin
CREATE DATABASE IF NOT EXISTS `butitin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `butitin`;

-- Dumping structure for table butitin.applicant
CREATE TABLE IF NOT EXISTS `applicant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `nik` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `noHp` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` longtext NOT NULL,
  `jenisKelamin` varchar(255) NOT NULL,
  `usia` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `url_berkas` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `applicant_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table butitin.applicant: ~14 rows (approximately)
INSERT INTO `applicant` (`id`, `userId`, `nik`, `name`, `noHp`, `email`, `alamat`, `jenisKelamin`, `usia`, `status`, `url_berkas`, `createAt`, `updateAt`, `deleteAt`) VALUES
	(1, 6, '12345667', 'Fahmi', '95849322', 'string@gmail.com', 'stringasdfasfas', 'laki laki', '19', 'accepted', 'https://i.pinimg.com/236x/81/16/b5/8116b548f2d4f96eaefb1eadfe48a17c.jpg', '2023-11-17T12:38:07.743Z', NULL, NULL),
	(2, 6, '12321232', 'affan', '7678222', 'string@gmail.com', 'stringasasasasa', 'perempuan', '76', 'rejected', 'https://cdns.klimg.com/resized/670x/g/1/3/13_foto_bintang_korea_cewek_yang_tampil_berani_tanpa_pakai_celana_irene_-_suzy/p/idol_cewek_no_pants_look-20190923-006-non_fotografer_kly.jpg', '2023-11-17T13:15:05.137Z', NULL, NULL),
	(3, 1, '12321232', 'BUDI', '7678222', 'string@gmail.com', 'stringasasasasa', 'laki laki', '87', 'accepted', 'https://cdns.klimg.com/resized/670x/g/1/3/13_foto_bintang_korea_cewek_yang_tampil_berani_tanpa_pakai_celana_irene_-_suzy/p/idol_cewek_no_pants_look-20190923-006-non_fotografer_kly.jpg', '2023-11-17T13:16:32.397Z', NULL, NULL),
	(4, 1, '12321232', 'edi', '7678222', 'string@gmail.com', 'stringasasasasa', 'laki laki', '67', 'accepted', 'https://i.pinimg.com/474x/39/eb/1a/39eb1ad4c9377f3620120caf7117eb33.jpg', '2023-11-17T13:17:47.385Z', NULL, NULL),
	(5, 6, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'rejected', 'string', '2023-11-18T21:32:30.193Z', NULL, NULL),
	(6, 6, 'stringg', 'string', 'string', 'string', 'string', 'string', 'string', 'interview', 'string', '2023-12-02T20:11:59.864Z', NULL, NULL),
	(7, 6, 'gege', 'gege', 'string', 'string', 'string', 'string', 'string', 'rejected', 'string', '2023-12-02T20:22:38.102Z', NULL, NULL),
	(8, 6, 'dada', 'dada', 'string', 'string', 'string', 'string', 'string', 'accepted', 'string', '2023-12-02T20:22:50.327Z', NULL, NULL),
	(9, 6, 'haha', 'haha', 'string', 'string', 'string', 'string', 'string', 'pending', 'string', '2023-12-02T20:22:50.854Z', NULL, NULL),
	(10, 6, 'lala', 'lala', 'string', 'string', 'string', 'string', 'string', 'rejected', 'string', '2023-12-02T20:22:51.181Z', NULL, NULL),
	(11, 6, 'kaka', 'kaka', 'string', 'string', 'string', 'string', 'string', 'pending', 'string', '2023-12-02T20:22:51.363Z', NULL, NULL),
	(12, 6, 'mama', 'mama', 'string', 'string', 'string', 'string', 'string', 'pending', 'string', '2023-12-02T20:22:51.522Z', NULL, NULL),
	(13, 6, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'pending', 'string', '2023-12-02T20:22:51.837Z', NULL, NULL),
	(14, 6, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'pending', 'string', '2023-12-02T20:22:52.022Z', NULL, NULL);

-- Dumping structure for table butitin.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table butitin.category: ~2 rows (approximately)
INSERT INTO `category` (`id`, `name`, `createAt`, `updateAt`, `deleteAt`) VALUES
	(1, 'Makanan', '12121', NULL, NULL),
	(2, 'Minuman', '2023-11-18 00:58:50.891', NULL, NULL);

-- Dumping structure for table butitin.item
CREATE TABLE IF NOT EXISTS `item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `categoryId` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `deskripsi` longtext,
  `price` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table butitin.item: ~8 rows (approximately)
INSERT INTO `item` (`id`, `categoryId`, `name`, `deskripsi`, `price`, `stock`, `gambar`, `createAt`, `updateAt`, `deleteAt`) VALUES
	(1, 1, 'Ayam Penyet', 'Pedes Banget', '3000', 40, 'https://awsimages.detik.net.id/community/media/visual/2022/01/12/resep-ayam-geprek-jogja-1_43.jpeg?w=1200', '2023-11-17T14:23:08.759Z', '2023-11-17T15:46:30.474Z', NULL),
	(3, 1, 'Mie Goreng', 'enak Banget', '5000', 22, 'https://cdn0-production-images-kly.akamaized.net/Tk__hIaiQK_9GDgOELc-f3WcSFU=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3129172/original/099632200_1589527804-shutterstock_1455941861.jpg', '2023-11-17T14:31:05.166Z', NULL, NULL),
	(4, 1, 'string', 'string', 'string', 23, 'string', '2023-11-17T15:49:03.104Z', NULL, '2023-11-17T15:49:09.163Z'),
	(5, 1, 'string', 'string', 'string', 23, 'string', '2023-11-17T15:56:15.747Z', NULL, '2023-11-17 22:56:21'),
	(6, 1, 'string', 'string', 'string', 23, 'string', '2023-11-17 22:58:07.927', NULL, '2023-11-17 22:59:16'),
	(7, 1, 'string', 'string', 'string', 23, 'string', '2023-11-17 23:03:13.706', NULL, NULL),
	(8, 1, 'string', 'string', 'string', 0, 'string', '2023-11-18 00:04:19.443', NULL, '2023-11-18 00:05:26'),
	(9, 1, 'string', 'string', 'string', 0, 'string', '2023-11-18 00:04:58.296', NULL, NULL);

-- Dumping structure for table butitin.order
CREATE TABLE IF NOT EXISTS `order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `noInvoice` varchar(255) NOT NULL,
  `orderDate` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `name` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table butitin.order: ~0 rows (approximately)

-- Dumping structure for table butitin.order_detail
CREATE TABLE IF NOT EXISTS `order_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `orderId` bigint NOT NULL,
  `itemId` bigint NOT NULL,
  `quantity` int NOT NULL,
  `subTotal` varchar(255) NOT NULL,
  `orderDate` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table butitin.order_detail: ~0 rows (approximately)

-- Dumping structure for table butitin.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'user',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'user',
  `otp` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table butitin.user: ~6 rows (approximately)
INSERT INTO `user` (`id`, `name`, `email`, `password`, `status`, `otp`, `createAt`, `updateAt`, `deleteAt`) VALUES
	(1, 'user', 'kenny@gmail.com', 'kennyy', 'admin', '1234', '12332', '2023-11-17T12:14:15.517Z', NULL),
	(2, 'jason', 'jason@gmail.com', 'JasssHaha', 'user', '649354', '2023-11-12T14:49:42.792Z', NULL, NULL),
	(3, 'bajo', 'bajo@gmail.com', 'jajaja', 'user', '966800', '2023-11-15T13:32:38.031Z', '2023-11-16T08:53:47.131Z', NULL),
	(4, 'fulan', 'fulan@gmail.com', 'admin123', 'user', '863296', '2023-11-17T09:14:02.998Z', NULL, NULL),
	(5, 'hoho', 'string@gmai.com', 'string', 'user', '2IETBx', '2023-11-17T11:52:33.374Z', NULL, NULL),
	(6, 'hoho', 'string@gmail.com', 'string', 'owner', '377743', '2023-11-17T11:54:05.062Z', NULL, NULL);

-- Dumping structure for table butitin.work_schedule
CREATE TABLE IF NOT EXISTS `work_schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `day` varchar(255) NOT NULL,
  `startWork` varchar(255) NOT NULL,
  `endWork` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table butitin.work_schedule: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
