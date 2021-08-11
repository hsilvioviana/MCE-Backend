import { providerAppointment } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getAppointmentsByProviderId = async (providerId: string) : Promise<providerAppointment[]> => {

    const result = await connection.raw(`SELECT a.id, a.date, a.canceledDate, u.id AS userId,
    u.nickname as userNickname, u.avatar as userAvatar, u.phone as userPhone
    FROM MC_Appointments a JOIN MC_Users u ON a.userId = u.id
    WHERE providerId = "${providerId}"`)

    return result[0]
}
