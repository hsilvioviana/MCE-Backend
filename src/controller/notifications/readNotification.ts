import { Request, Response } from "express"
import { readNotificationBusiness } from "../../business/notifications/readNotificationBusiness"
import { readNotificationDTO } from "../../model/notifications/readNotificationModels"


export const readNotification = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const id = req.params.id

        const input: readNotificationDTO = { token, id }

        await readNotificationBusiness(input)

        res.status(200).send({ message: "Notificação lida" })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
