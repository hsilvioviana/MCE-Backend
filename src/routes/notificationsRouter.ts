import { Router } from "express"
import { currentNotifications } from "../controller/notifications/currentNotifications"



export const notificationsRouter = Router()

notificationsRouter.get("/", currentNotifications)
