import { connection } from "../connection"


export const readNotification = async (id: string) : Promise<void> => {

    await connection.raw(`UPDATE MC_Notifications SET viewed = true WHERE id = "${id}"`)
}
