import { appointment } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getAppointmentById = async (id: string) : Promise<appointment> => {

    const result = await connection.raw(`SELECT * FROM MC_Appointments WHERE id = "${id}"`)

    return result[0][0]
}
