import { appointmentCreator } from "../../model/appointments/makeAppointmentModels"
import { connection } from "../connection"


export const createAppointment = async (input: appointmentCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO MC_Appointments (id, date, userId, providerId) VALUES
    ("${input.id}", "${input.date}", "${input.userId}", "${input.providerId}")`)
}
