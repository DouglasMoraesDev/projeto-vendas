/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `arquivoPath` on the `Comprovante` table. All the data in the column will be lost.
  - You are about to drop the column `dataUpload` on the `Comprovante` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Foto` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Mercadoria` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Mercadoria` table. All the data in the column will be lost.
  - You are about to drop the column `dataVenda` on the `Venda` table. All the data in the column will be lost.
  - You are about to alter the column `tipoPagamento` on the `Venda` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caminho` to the `Comprovante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caminho` to the `Foto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Comprovante` DROP COLUMN `arquivoPath`,
    DROP COLUMN `dataUpload`,
    ADD COLUMN `caminho` VARCHAR(191) NOT NULL,
    ADD COLUMN `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Foto` DROP COLUMN `path`,
    ADD COLUMN `caminho` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Mercadoria` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Venda` DROP COLUMN `dataVenda`,
    ADD COLUMN `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `tipoPagamento` ENUM('AVISTA', 'PARCELADO') NOT NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemVenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendaId` INTEGER NOT NULL,
    `mercadoriaId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `precoUnitario` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemVenda` ADD CONSTRAINT `ItemVenda_vendaId_fkey` FOREIGN KEY (`vendaId`) REFERENCES `Venda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemVenda` ADD CONSTRAINT `ItemVenda_mercadoriaId_fkey` FOREIGN KEY (`mercadoriaId`) REFERENCES `Mercadoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
