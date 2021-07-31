import { Router } from "express"
import { appointments } from "../controller/appointments/appointments"
import { appointmentsOnDay } from "../controller/appointments/appointmentsOnDay"
import { cancelAppointment } from "../controller/appointments/cancelAppointment"
import { makeAppointment } from "../controller/appointments/makeAppointment"


export const appointmentsRouter = Router()

appointmentsRouter.get("/", appointments)
appointmentsRouter.get("/:day", appointmentsOnDay)
appointmentsRouter.post("/make", makeAppointment)
appointmentsRouter.delete("/cancel/:id", cancelAppointment)
