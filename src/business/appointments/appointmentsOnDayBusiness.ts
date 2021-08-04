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

        const day = parseISO(input.day)

        if (!isValid(day) || day.getHours() !== 0 || day.getMinutes() !== 0 || day.getSeconds() !== 0) {

            throw new Error("Data inválida")
        }

        const start = startOfDay(day)
                
        const end = endOfDay(day)

        if (user.role === ROLES.USER) {

            const appointments = await getAppointmentsByUserId(token.id)

            const result: userAppointmentDetails[] = []

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
                            avatar: appointment.providerAvatar ? String(process.env.URL) + "/files/photo/download/" + appointment.providerAvatar : ""
                        }
                    })
                }
            })

            result.sort((a, b) => {

                if (parseISO(a.date) < parseISO(b.date)) {

                    return -1
                }
                else {

                    return 1
                }
            })

            return result
        }
        else {

            const appointments = await getAppointmentsByProviderId(token.id)

            const result: providerAppointmentDetails[] = []

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

            result.sort((a, b) => {

                if (parseISO(a.date) < parseISO(b.date)) {

                    return -1
                }
                else {

                    return 1
                }
            })

            return result
        }
    }
    catch (error) {

        throw new Error(error.message)
    }
}
