import type { Request, Response } from "express"
import { relatorioReservasPeriodoService } from "../../service/relatorios/relatorioReservasPeriodoService"

export const relatorioReservasPeriodo = async (req: Request, res: Response) => {
  try {
    const { dataInicio, dataFim, status } = req.query

    if (!dataInicio || !dataFim) {
      return res.status(400).json({
        error: "Data de início e fim são obrigatórias",
      })
    }

    const resultado = await relatorioReservasPeriodoService(
      new Date(dataInicio as string),
      new Date(dataFim as string),
      status as string,
    )

    res.json(resultado)
  } catch (error) {
    console.error("Erro ao gerar relatório de reservas por período:", error)
    res.status(500).json({
      error: "Erro interno do servidor",
    })
  }
}
