/*
  Warnings:

  - A unique constraint covering the columns `[numeroMesa]` on the table `Mesa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mesa_numeroMesa_key" ON "Mesa"("numeroMesa");
