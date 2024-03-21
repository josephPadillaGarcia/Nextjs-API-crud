/*
  Warnings:

  - Added the required column `cargo` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `worker` ADD COLUMN `cargo` VARCHAR(255) NOT NULL;
