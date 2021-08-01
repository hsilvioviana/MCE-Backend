import { Request, Response } from "express"
import { currentNotificationsBusiness } from "../../business/notifications/currentNotificationsBusiness"
import { currentNotificationsDTO } from "../../model/notifications/currentNotificationsModels"
import { notification } from "../../model/notifications/globalModels"


export const currentNotifications = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const input: currentNotificationsDTO = { token }

        const notifications: notification[] = await currentNotificationsBusiness(input)

        res.status(200).send({ notifications })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
