import { appointment } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getAppointmentsByProviderId = async (id: string) : Promise<appointment[]> => {

    const result = await connection.raw(`SELECT a.id, a.date, a.canceledDate, u.id AS userId,
    u.nickname as userNickname, u.avatar as userAvatar
    FROM MC_Appointments a JOIN MC_Users u ON a.userId = u.id
    WHERE providerId = "${id}"`)

    return result[0]
}
