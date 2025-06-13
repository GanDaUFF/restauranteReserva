-- CreateTable
CREATE TABLE "Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataHora" DATETIME NOT NULL,
    "numeroMesa" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "confirmadoPor" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
