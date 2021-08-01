import { notification } from "../../model/notifications/globalModels"
import { connection } from "../connection"


export const createNotification = async (input: notification) : Promise<any> => {

    await connection.raw(`INSERT INTO MC_Notifications VALUES 
    ("${input.id}", ${input.viewed}, "${input.content}", "${input.receiverId}", "${input.createdAt}")`)
}
