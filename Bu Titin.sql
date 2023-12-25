USE butitin;

CREATE TABLE `user` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT "user",
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT 1,
  `otp` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255),
  `deleteAt` varchar(255)
);

CREATE TABLE `item` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `categoryId` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `deskripsi` longtext,
  `price` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255),
  `deleteAt` varchar(255)
);

CREATE TABLE `category` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255),
  `deleteAt` varchar(255)
);

CREATE TABLE `applicant` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `nik` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `noHp` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` longtext NOT NULL,
  `jenisKelamin` varchar(255) NOT NULL,
  `usia` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT "pending",
  `url_berkas` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255),
  `deleteAt` varchar(255)
);

CREATE TABLE `order` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `noInvoice` varchar(255) NOT NULL,
  `orderDate` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT "pending",
  `name` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255),
  `deleteAt` varchar(255)
);

CREATE TABLE `order_detail` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `orderId` bigint NOT NULL,
  `itemId` bigint NOT NULL,
  `quantity` int NOT NULL,
  `subTotal` varchar(255) NOT NULL,
  `orderDate` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255),
  `deleteAt` varchar(255)
);

CREATE TABLE `work_schedule` (
  `id` bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `day` varchar(255) NOT NULL,
  `startWork` varchar(255) NOT NULL,
  `endWork` varchar(255) NOT NULL,
  `createAt` varchar(255) NOT NULL,
  `updateAt` varchar(255),
  `deleteAt` varchar(255)
);

ALTER TABLE `item` ADD FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`);

ALTER TABLE `applicant` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `order_detail` ADD FOREIGN KEY (`orderId`) REFERENCES `order` (`id`);

ALTER TABLE `order_detail` ADD FOREIGN KEY (`itemId`) REFERENCES `item` (`id`);
