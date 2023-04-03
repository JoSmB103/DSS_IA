DROP DATABASE IF EXISTS `api_clientes`;

CREATE DATABASE IF NOT EXISTS `api_clientes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci;

USE `api_clientes`;

CREATE TABLE IF NOT EXISTS `tbl_clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `edad` int NOT NULL,
  `sueldo` decimal(8,2) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;