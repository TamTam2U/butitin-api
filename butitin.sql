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


-- Dumping database structure for kedaibutitin
CREATE DATABASE IF NOT EXISTS `kedaibutitin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `kedaibutitin`;

-- Dumping structure for table kedaibutitin.applicant
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table kedaibutitin.applicant: ~0 rows (approximately)

-- Dumping structure for table kedaibutitin.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table kedaibutitin.category: ~0 rows (approximately)

-- Dumping structure for table kedaibutitin.item
CREATE TABLE IF NOT EXISTS `item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `deskripsi` longtext,
  `categoryId` bigint DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table kedaibutitin.item: ~0 rows (approximately)

-- Dumping structure for table kedaibutitin.order
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

-- Dumping data for table kedaibutitin.order: ~0 rows (approximately)

-- Dumping structure for table kedaibutitin.order_detail
CREATE TABLE IF NOT EXISTS `order_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `orderId` bigint NOT NULL,
  `itemId` bigint NOT NULL,
  `quantity` int NOT NULL,
  `subTotal` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table kedaibutitin.order_detail: ~0 rows (approximately)

-- Dumping structure for table kedaibutitin.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `createAt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `updateAt` varchar(255) DEFAULT NULL,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table kedaibutitin.user: ~2 rows (approximately)
INSERT INTO `user` (`id`, `email`, `password`, `status`, `createAt`, `updateAt`, `deleteAt`) VALUES
	(1, 'jason@gmail.com', 'adasasd', 1, '12121', NULL, NULL),
	(2, 'kenny@gmail.com', 'lalalala', 1, '12234', NULL, NULL);

-- Dumping structure for table kedaibutitin.work_schedule
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

-- Dumping data for table kedaibutitin.work_schedule: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
