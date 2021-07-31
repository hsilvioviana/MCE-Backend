import { appointmentCancelator } from "../../model/appointments/cancelAppointment"
import { connection } from "../connection"


export const cancelAppointment = async (input: appointmentCancelator) : Promise<void> => {

    await connection.raw(`UPDATE MC_Appointments SET canceledDate = "${input.now}" 
    WHERE id = "${input.id}"`)
}
