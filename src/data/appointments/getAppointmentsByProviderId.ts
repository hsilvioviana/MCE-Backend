import { appointment } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getAppointmentsByProviderId = async (id: string) : Promise<appointment[]> => {

    const result = await connection.raw(`SELECT * FROM MC_Appointments WHERE providerId = "${id}"`)

    return result[0]
}
