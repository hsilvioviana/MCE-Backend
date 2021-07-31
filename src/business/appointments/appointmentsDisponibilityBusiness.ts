import { getUserById } from "../../data/users/getUserById"
import { appointmentsDisponibilityDTO } from "../../model/appointments/appointmentsDisponibilityModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { appointmentsDisponibilitySchema } from "../../validations/appointments/appointmentsDisponibilitySchema"
import { parseISO, startOfDay, endOfDay, isValid, isPast } from "date-fns"
import { getAppointmentsByProviderId } from "../../data/appointments/getAppointmentsByProviderId"


export const appointmentsDisponibilityBusiness = async (input: appointmentsDisponibilityDTO) : Promise<any> => {

    try {

        await appointmentsDisponibilitySchema.validate(input)

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        const provider = await getUserById(input.providerId)

        if (!provider || provider.role !== ROLES.PERSONAL) {

            throw new Error("Personal não encontrado")
        }

        if (!isValid(parseISO(input.day))) {

            throw new Error("Data inválida")
        }

        const start = startOfDay(parseISO(input.day))
                
        const end = endOfDay(parseISO(input.day))

        const appointments = await getAppointmentsByProviderId(provider.id)

        const appointmentsInTheDay: string[] = []

        appointments.forEach(appointment => {

            const time = parseISO(appointment.date)
            
            if (time > start && time < end && !appointment.canceledDate) {

                appointmentsInTheDay.push(appointment.date)
            }
        })

        const acceptedHours = String(process.env.ACCEPTED_HOURS).split(" ")

        const disponibility = acceptedHours.map(hour => {

            const value = `${input.day.substring(0, 11)}${hour}:00:00-03:00`

            return {
                time: `${hour}:00`,
                value,
                available: !(appointmentsInTheDay.includes(value) || isPast(parseISO(value)))
            }
        })
        
        return disponibility
    }
    catch (error) {

        throw new Error(error.message)
    }
}
