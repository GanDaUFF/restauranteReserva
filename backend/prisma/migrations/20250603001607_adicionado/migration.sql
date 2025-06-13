/*
  Warnings:

  - You are about to drop the column `numeroMesa` on the `Reserva` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Mesa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numeroMesa" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "cliente" TEXT,
    "status" TEXT NOT NULL,
    "horaOcupacao" DATETIME,
    "reservaId" INTEGER,
    CONSTRAINT "Mesa_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataHora" DATETIME NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "telefone" TEXT,
    "confirmadoPor" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Reserva" ("confirmadoPor", "criadoEm", "dataHora", "id", "nomeResponsavel", "quantidade", "status", "telefone") SELECT "confirmadoPor", "criadoEm", "dataHora", "id", "nomeResponsavel", "quantidade", "status", "telefone" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_reservaId_key" ON "Mesa"("reservaId");
