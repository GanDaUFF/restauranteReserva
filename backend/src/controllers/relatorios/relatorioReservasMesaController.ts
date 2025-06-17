import type { Request, Response } from "express"
import { relatorioReservasMesaService } from "../../service/relatorios/relatorioReservasMesaService"

export const relatorioReservasMesa = async (req: Request, res: Response) => {
  try {
    const { numeroMesa } = req.params
    const { dataInicio, dataFim } = req.query

    if (!numeroMesa) {
      return res.status(400).json({
        error: "Número da mesa é obrigatório",
      })
    }

    const resultado = await relatorioReservasMesaService(
      Number.parseInt(numeroMesa),
      dataInicio ? new Date(dataInicio as string) : undefined,
      dataFim ? new Date(dataFim as string) : undefined,
    )

    res.json(resultado)
  } catch (error) {
    console.error("Erro ao gerar relatório de reservas por mesa:", error)
    res.status(500).json({
      error: "Erro interno do servidor",
    })
  }
}
