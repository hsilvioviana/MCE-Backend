import { schedule } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getScheduleByProviderId = async (providerId: string) : Promise<schedule> => {

    const result = await connection.raw(`SELECT providerId, sunday, monday, tuesday, wednesday, thursday,
    friday, saturday FROM MC_Schedules WHERE providerId = "${providerId}"`)

    return result[0][0]
}