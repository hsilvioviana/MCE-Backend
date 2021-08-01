import { notification } from "../../model/notifications/globalModels"
import { connection } from "../connection"


export const getNotificationsByReceiverId = async (id: string) : Promise<notification[]> => {

    const result = await connection.raw(`SELECT * FROM MC_Notifications WHERE receiverId = "${id}"`)

    return result[0]
}
