-- CreateTable
CREATE TABLE `Worker` (
    `idworker` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `apellido` VARCHAR(255) NOT NULL,
    `edad` INTEGER NOT NULL,
    `dni` INTEGER NOT NULL,
    `points` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idworker`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
