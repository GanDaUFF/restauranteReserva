// types/mesas.ts

export type TableStatus =
  | "disponivel"
  | "ocupada"
  | "reservada"
  | "confirmacao_pendente"
  | "indisponivel"
export interface Table {
  id: string
  numeroMesa: number
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
export type ActionType =
  | "ocupada"
  | "disponivel"
  | "reservada"
  | "cancelar_reserva"
  | "indisponivel"

export interface TableAction {
  type: ActionType
  tableId: number
  cliente?: string
}