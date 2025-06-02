// types/mesas.ts

export type TableStatus =
  | "disponivel"
  | "ocupada"
  | "reservada"
  | "confirmacao_pendente"
  | "indisponivel"

export interface Table {
  id: string
  numero: number
  capacidade: number
  status: TableStatus
  cliente?: string
  horaOcupacao?: Date
  reserva?: {
    cliente: string
    horario: Date
    telefone: string
    pessoas: number
  }
  tempoRestante?: number
}
export type ActionType = "ocupar" | "liberar" | "confirmar_reserva" | "cancelar_reserva" | "indisponibilizar"

export interface TableAction {
  type:
    | "ocupar"
    | "liberar"
    | "confirmar_reserva"
    | "cancelar_reserva"
    | "indisponibilizar"
  tableId: string
  cliente?: string
}
