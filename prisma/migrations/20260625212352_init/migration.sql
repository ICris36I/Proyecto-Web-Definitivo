-- CreateTable
CREATE TABLE `usuario` (
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `apellido` VARCHAR(30) NOT NULL,
    `rol` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(30) NOT NULL,
    `fecha` TIMESTAMP NOT NULL,
    `lugar` VARCHAR(30) NOT NULL,
    `imagen` INTEGER NULL,
    `valor` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `apellido` VARCHAR(30) NOT NULL,
    `eventoId` INTEGER NOT NULL,

    INDEX `inscrito_eventoId_idx`(`eventoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inscrito` ADD CONSTRAINT `inscrito_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
