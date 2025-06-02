// lib/mock/initialTables.ts

import { Table } from "@/types/mesas"

export const initialTables: Table[] = [
  {
    id: "1",
    numero: 1,
    capacidade: 2,
    status: "disponivel",
  },
  {
    id: "2",
    numero: 2,
    capacidade: 4,
    status: "ocupada",
    cliente: "Maria Santos",
    horaOcupacao: new Date(Date.now() - 30 * 60 * 1000), // 30 min atrás
  },
  {
    id: "3",
    numero: 3,
    capacidade: 6,
    status: "reservada",
    reserva: {
      cliente: "João Silva",
      horario: new Date(Date.now() + 30 * 60 * 1000), // em 30 min
      telefone: "(11) 99999-9999",
      pessoas: 4,
    },
  },
  {
    id: "4",
    numero: 4,
    capacidade: 4,
    status: "confirmacao_pendente",
    reserva: {
      cliente: "Pedro Oliveira",
      horario: new Date(Date.now() - 5 * 60 * 1000), // 5 min atrás
      telefone: "(11) 77777-7777",
      pessoas: 4,
    },
    tempoRestante: 10,
  },
  {
    id: "5",
    numero: 5,
    capacidade: 8,
    status: "disponivel",
  },
  {
    id: "6",
    numero: 6,
    capacidade: 2,
    status: "indisponivel",
  },
  {
    id: "7",
    numero: 7,
    capacidade: 4,
    status: "reservada",
    reserva: {
      cliente: "Ana Costa",
      horario: new Date(Date.now() + 45 * 60 * 1000), // em 45 min
      telefone: "(11) 66666-6666",
      pessoas: 3,
    },
  },
  {
    id: "8",
    numero: 8,
    capacidade: 6,
    status: "ocupada",
    cliente: "Carlos Ferreira",
    horaOcupacao: new Date(Date.now() - 60 * 60 * 1000), // 1h atrás
  },
]
