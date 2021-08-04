import { dayOff } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getDaysOffByProviderId = async (providerId: string) : Promise<dayOff[]> => {

    const result = await connection.raw(`SELECT id, start, end, providerId 
    FROM MC_DaysOff WHERE providerId = "${providerId}"`)

    return result[0]
}
