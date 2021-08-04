import { connection } from "../connection"


export const cancelDayOff = async (id: string) : Promise<void> => {

    await connection.raw(`DELETE FROM MC_DaysOff WHERE id = "${id}"`)
}
