import { getUserById } from "../../data/users/getUserById"
import { appointmentsDisponibilityDTO, timeDisponibility } from "../../model/appointments/appointmentsDisponibilityModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { appointmentsDisponibilitySchema } from "../../validations/appointments/appointmentsDisponibilitySchema"
import { parseISO, startOfDay, endOfDay, isValid, isPast, isBefore, subHours, subMonths } from "date-fns"
import { getAppointmentsByProviderId } from "../../data/appointments/getAppointmentsByProviderId"
import { getScheduleByProviderId } from "../../data/appointments/getScheduleByProviderId"
import { scheduleOfTheDay } from "../../services/handleSchedule"
import { getDaysOffByProviderId } from "../../data/appointments/getDaysOffByProviderId"


export const appointmentsDisponibilityBusiness = async (input: appointmentsDisponibilityDTO) : Promise<timeDisponibility[]> => {

    try {

        await appointmentsDisponibilitySchema.validate(input)

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        const day = parseISO(input.day)

        if (!user) {

            throw new Error("Token inválido")
        }

        const provider = await getUserById(input.providerId)

        if (!provider || provider.role !== ROLES.PERSONAL) {

            throw new Error("Personal não encontrado")
        }

        if (!isValid(day)) {

            throw new Error("Data inválida")
        }

        if (!isBefore(subMonths(day, 2), new Date())) {

            return []
        }

        const start = startOfDay(day)
                
        const end = endOfDay(day)

        const appointments = await getAppointmentsByProviderId(provider.id)

        const appointmentsInTheDay: string[] = []

        appointments.forEach(appointment => {

            const time = parseISO(appointment.date)
            
            if (time >= start && time <= end && !appointment.canceledDate) {

                appointmentsInTheDay.push(appointment.date)
            }
        })

        const schedule = await getScheduleByProviderId(provider.id)

        const hours = scheduleOfTheDay(schedule, day)

        if (!hours) { 
            
            return [] 
        }

        const acceptedHours = hours.split(" ").map(hour => Number(hour))

        const daysOff = await getDaysOffByProviderId(provider.id)

        for (let dayOff of daysOff) {

            const dayOffStart = parseISO(dayOff.start)

            const dayOffEnd = parseISO(dayOff.end)

            if (dayOffStart <= day && dayOffEnd >= day) {

                return []
            }
        }

        const disponibility = acceptedHours.map(hour => {

            let hourFormated

            hour < 10 ? hourFormated = "0" + hour : hourFormated = hour

            const value = `${input.day.substring(0, 11)}${hourFormated}:00:00-03:00`

            return {
                time: `${hourFormated}:00`,
                value,
                available: !(appointmentsInTheDay.includes(value) || isPast(parseISO(value)) || isBefore(subHours(parseISO(value), 2), new Date()))
            }
        })
        
        return disponibility
    }
    catch (error) {

        throw new Error(error.message)
    }
}
