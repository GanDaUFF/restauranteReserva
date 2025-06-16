import { Router } from "express"
import { relatorioReservasPeriodo } from "../controllers/relatorios/relatorioReservasPeriodoController"
import { relatorioReservasMesa } from "../controllers/relatorios/relatorioReservasMesaController"
import { relatorioReservasGarcom } from "../controllers/relatorios/relatorioReservasGarcomController"

const router = Router()

router.get("/reservas-periodo", relatorioReservasPeriodo)
router.get("/reservas-mesa/:numeroMesa", relatorioReservasMesa)
router.get("/reservas-garcom", relatorioReservasGarcom)

export default router
