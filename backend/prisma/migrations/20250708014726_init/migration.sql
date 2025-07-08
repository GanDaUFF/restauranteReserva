-- CreateEnum
CREATE TYPE "StatusMesa" AS ENUM ('disponivel', 'ocupada', 'reservada', 'confirmacao_pendente', 'indisponivel');

-- CreateEnum
CREATE TYPE "StatusReserva" AS ENUM ('PENDENTE', 'CANCELADA', 'CONFIRMADA', 'ATIVA', 'CONCLUIDA');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('GERENTE', 'GARCOM', 'ATENDENTE');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesa" (
    "id" SERIAL NOT NULL,
    "numeroMesa" INTEGER NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "cliente" TEXT,
    "status" "StatusMesa" NOT NULL,
    "horaOcupacao" TIMESTAMP(3),

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "status" "StatusReserva" NOT NULL,
    "observacoes" TEXT,
    "telefone" TEXT,
    "confirmadoPor" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numeroMesa" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mesa_numeroMesa_key" ON "Mesa"("numeroMesa");

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_numeroMesa_fkey" FOREIGN KEY ("numeroMesa") REFERENCES "Mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
