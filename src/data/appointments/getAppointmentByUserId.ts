import { userAppointment } from "../../model/appointments/globalModels"
import { connection } from "../connection"


export const getAppointmentsByUserId = async (userId: string) : Promise<userAppointment[]> => {

    const result = await connection.raw(`SELECT a.id, a.date, a.canceledDate, u.id AS providerId,
    u.nickname as providerNickname, u.avatar as providerAvatar, u.phone as providerPhone
    FROM MC_Appointments a JOIN MC_Users u ON a.providerId = u.id
    WHERE userId = "${userId}"`)

    return result[0]
}
