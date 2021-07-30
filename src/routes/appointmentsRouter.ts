import { Router } from "express"
import { appointments } from "../controller/appointments/appointments"
import { makeAppointment } from "../controller/appointments/makeAppointment"


export const appointmentsRouter = Router()

appointmentsRouter.get("/", appointments)
appointmentsRouter.post("/make", makeAppointment)
