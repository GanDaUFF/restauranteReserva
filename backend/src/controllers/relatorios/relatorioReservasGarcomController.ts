import type { Request, Response } from "express"
import { relatorioReservasGarcomService } from "../../service/relatorios/relatorioReservasGarcomService"

export const relatorioReservasGarcom = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim } = req.query

    const resultado = await relatorioReservasGarcomService(
      dataInicio ? new Date(dataInicio as string) : undefined,
      dataFim ? new Date(dataFim as string) : undefined,
    )

    res.json(resultado)
  } catch (error) {
    console.error("Erro ao gerar relatório de reservas por garçom:", error)
    res.status(500).json({
      error: "Erro interno do servidor",
    })
  }
}
