import { notification } from "../../model/notifications/globalModels"
import { connection } from "../connection"


export const getNotificationById = async (id: string) : Promise<notification> => {

    const result = await connection.raw(`SELECT * FROM MC_Notifications WHERE id = "${id}"`)

    return result[0][0]
}
