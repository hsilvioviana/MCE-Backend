import { getAppointmentsByUserId } from "../../data/appointments/getAppointmentByUserId"
import { getAppointmentsByProviderId } from "../../data/appointments/getAppointmentsByProviderId"
import { getUserById } from "../../data/users/getUserById"
import { appointmentsDTO } from "../../model/appointments/appointmentsModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { parseISO, subHours, isPast } from "date-fns"
import { providerAppointmentDetails, userAppointmentDetails } from "../../model/appointments/globalModels"


export const appointmentsBusiness = async (input: appointmentsDTO) : Promise<userAppointmentDetails[] | providerAppointmentDetails[]> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        if (user.role === ROLES.USER) {

            const appointments = await getAppointmentsByUserId(token.id)

            return appointments.map(appointment => {

                const time = parseISO(appointment.date)
    
                return {
                    past: isPast(time),
                    cancelable: !isPast(subHours(time, 6)),
                    id: appointment.id,
                    date: appointment.date,
                    provider: {
                        id: appointment.providerId,
                        nickname: appointment.providerNickname,
                        avatar: appointment.providerAvatar ? String(process.env.URL) + appointment.providerAvatar : ""
                    }
                }
            })
        }
        else {

            const appointments = await getAppointmentsByProviderId(token.id)

            return appointments.map(appointment => {

                const time = parseISO(appointment.date)
    
                return {
                    past: isPast(time),
                    cancelable: !isPast(subHours(time, 6)),
                    id: appointment.id,
                    date: appointment.date,
                    user: {
                        id: appointment.userId,
                        nickname: appointment.userNickname,
                        avatar: appointment.userAvatar ? String(process.env.URL) + appointment.userAvatar : ""
                    }
                }
            })
        }
    }
    catch (error) {

        throw new Error(error.message)
    }
}
