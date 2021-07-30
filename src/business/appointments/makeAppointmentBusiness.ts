import { getUserById } from "../../data/users/getUserById"
import { appointmentCreator, makeAppointmentsDTO } from "../../model/appointments/makeAppointmentModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { makeAppointmentSchema } from "../../validations/appointments/makeAppointmentSchema"
import { parseISO, isFuture, isValid } from "date-fns"
import { generateId } from "../../services/idGenerator"
import { createAppointment } from "../../data/appointments/createAppointment"
import { getAppointmentsByProviderId } from "../../data/appointments/getAppointmentsByProviderId"

export const makeAppointmentBusiness = async (input: makeAppointmentsDTO) : Promise<void> => {

    try {

        await makeAppointmentSchema.validate(input)

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user || user.role !== ROLES.USER) {

            throw new Error("Token inválido")
        }

        const provider = await getUserById(input.providerId)

        if (!provider || provider.role !== ROLES.PERSONAL) {

            throw new Error("Personal não encontrado")
        }

        const time = parseISO(input.date)

        if (!isValid(time) || time.getMinutes() !== 0 || time.getSeconds() !== 0) {

            throw new Error("Data inválida")
        }

        if(!isFuture(time)) {

            throw new Error("Você não pode agendar um horário que já passou")
        }

        const acceptedHours = [8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19]

        if (!acceptedHours.includes(time.getHours())) {

            throw new Error("Horário Indisponível")
        }

        const appointments = await getAppointmentsByProviderId(provider.id)

        for (let appointment of appointments) {

            if (appointment.date === input.date && !appointment.canceledDate) {

                throw new Error("Horário Indisponível")
            }
        }

        const newAppointment: appointmentCreator = {

            id: generateId(),
            date: input.date,
            userId: user.id,
            providerId: provider.id
        }

        await createAppointment(newAppointment)   
    }
    catch (error) {

        throw new Error(error.message)
    }
}
