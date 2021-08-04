import { dayOff } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getDayOffById = async (id: string) : Promise<dayOff> => {

    const result = await connection.raw(`SELECT id, start, end, providerId 
    FROM MC_DaysOff WHERE id = "${id}"`)

    return result[0][0]
}
