import { getAppointmentsByUserId } from "../../data/appointments/getAppointmentByUserId"
import { getAppointmentsByProviderId } from "../../data/appointments/getAppointmentsByProviderId"
import { getUserById } from "../../data/users/getUserById"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { parseISO, subHours, isPast, startOfDay, endOfDay, isValid } from "date-fns"
import { appointmentsOnDayDTO } from "../../model/appointments/appointmentsOnDayModels"
import { appointmentsOnDaySchema } from "../../validations/appointments/appointmentsOnDaySchema"
import { providerAppointmentDetails, userAppointmentDetails } from "../../model/appointments/globalModels"


export const appointmentsOnDayBusiness = async (input: appointmentsOnDayDTO) : Promise<userAppointmentDetails[] | providerAppointmentDetails[]> => {

    try {

        await appointmentsOnDaySchema.validate(input)

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        if (!isValid(parseISO(input.day))) {

            throw new Error("Data inválida")
        }

        const start = startOfDay(parseISO(input.day))
                
        const end = endOfDay(parseISO(input.day))

        if (user.role === ROLES.USER) {

            const appointments = await getAppointmentsByUserId(token.id)

            const result: any = []

            appointments.forEach(appointment => {

                const time = parseISO(appointment.date)
    
                if (time >= start && time <= end && !appointment.canceledDate) {

                    result.push({
                        past: isPast(time),
                        cancelable: !isPast(subHours(time, 6)),
                        id: appointment.id,
                        date: appointment.date,
                        provider: {
                            id: appointment.providerId,
                            nickname: appointment.providerNickname,
                            avatar: appointment.providerAvatar ? String(process.env.URL) + appointment.providerAvatar : ""
                        }
                    })
                }
            })

            return result
        }
        else {

            const appointments = await getAppointmentsByProviderId(token.id)

            const result: any = []

            appointments.forEach(appointment => {

                const time = parseISO(appointment.date)
    
                if (time >= start && time <= end && !appointment.canceledDate) {

                    result.push({
                        past: isPast(time),
                        cancelable: !isPast(subHours(time, 6)),
                        id: appointment.id,
                        date: appointment.date,
                        user: {
                            id: appointment.userId,
                            nickname: appointment.userNickname,
                            avatar: appointment.userAvatar ? String(process.env.URL) + appointment.userAvatar : ""
                        }
                    })
                }
            })

            return result
        }
    }
    catch (error) {

        throw new Error(error.message)
    }
}
