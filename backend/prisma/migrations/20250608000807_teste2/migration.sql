/*
  Warnings:

  - You are about to drop the column `reservaId` on the `Mesa` table. All the data in the column will be lost.
  - Made the column `numeroMesa` on table `Reserva` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroMesa" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "cliente" TEXT,
    "status" TEXT NOT NULL,
    "horaOcupacao" DATETIME
);
INSERT INTO "new_Mesa" ("capacidade", "cliente", "horaOcupacao", "id", "numeroMesa", "status") SELECT "capacidade", "cliente", "horaOcupacao", "id", "numeroMesa", "status" FROM "Mesa";
DROP TABLE "Mesa";
ALTER TABLE "new_Mesa" RENAME TO "Mesa";
CREATE UNIQUE INDEX "Mesa_numeroMesa_key" ON "Mesa"("numeroMesa");
CREATE TABLE "new_Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataHora" DATETIME NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "telefone" TEXT,
    "confirmadoPor" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numeroMesa" INTEGER NOT NULL,
    CONSTRAINT "Reserva_numeroMesa_fkey" FOREIGN KEY ("numeroMesa") REFERENCES "Mesa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reserva" ("confirmadoPor", "criadoEm", "dataHora", "id", "nomeResponsavel", "numeroMesa", "quantidade", "status", "telefone") SELECT "confirmadoPor", "criadoEm", "dataHora", "id", "nomeResponsavel", "numeroMesa", "quantidade", "status", "telefone" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
