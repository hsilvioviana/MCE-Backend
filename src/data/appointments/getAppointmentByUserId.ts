import { appointment } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getAppointmentsByUserId = async (id: string) : Promise<appointment[]> => {

    const result = await connection.raw(`SELECT a.id, a.date, a.canceledDate, u.id AS providerId,
    u.nickname as providerNickname, u.avatar as providerAvatar
    FROM MC_Appointments a JOIN MC_Users u ON a.providerId = u.id
    WHERE userId = "${id}"`)

    return result[0]
}
