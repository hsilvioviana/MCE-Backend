import { Router } from "express"
import { makeAppointment } from "../controller/appointments/makeAppointment"


export const appointmentsRouter = Router()

appointmentsRouter.post("/make", makeAppointment)
