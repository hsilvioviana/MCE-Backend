import { Router } from "express"
import { appointments } from "../controller/appointments/appointments"
import { appointmentsDisponibility } from "../controller/appointments/appointmentsDisponibility"
import { appointmentsOnDay } from "../controller/appointments/appointmentsOnDay"
import { cancelAppointment } from "../controller/appointments/cancelAppointment"
import { changeSchedule } from "../controller/appointments/changeSchedule"
import { makeAppointment } from "../controller/appointments/makeAppointment"
import { setDaysOff } from "../controller/appointments/setDaysOff"


export const appointmentsRouter = Router()

appointmentsRouter.get("/", appointments)
appointmentsRouter.get("/disponibility", appointmentsDisponibility)
appointmentsRouter.get("/:day", appointmentsOnDay)
appointmentsRouter.post("/make", makeAppointment)
appointmentsRouter.post("/off", setDaysOff)
appointmentsRouter.put("/schedule/change", changeSchedule)
appointmentsRouter.delete("/cancel/:id", cancelAppointment)
