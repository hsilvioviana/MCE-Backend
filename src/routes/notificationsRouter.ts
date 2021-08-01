import { Router } from "express"
import { currentNotifications } from "../controller/notifications/currentNotifications"
import { readNotification } from "../controller/notifications/readNotification"



export const notificationsRouter = Router()

notificationsRouter.get("/", currentNotifications)
notificationsRouter.post("/read/:id", readNotification)
