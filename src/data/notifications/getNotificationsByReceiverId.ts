import { notification } from "../../model/notifications/globalModels"
import { connection } from "../connection"


export const getNotificationsByReceiverId = async (receiverId: string) : Promise<notification[]> => {

    const result = await connection.raw(`SELECT * FROM MC_Notifications WHERE receiverId = "${receiverId}"`)

    return result[0]
}
