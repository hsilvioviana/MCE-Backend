import { getAppointmentById } from "../../data/appointments/getAppointmentById"
import { getUserById } from "../../data/users/getUserById"
import { appointmentCancelator, cancelAppointmentDTO } from "../../model/appointments/cancelAppointment"
import { getTokenData } from "../../services/authenticator"
import { parseISO, subHours, isBefore, format, } from "date-fns"
import { cancelAppointment } from "../../data/appointments/cancelAppointment"
import { transporter } from "../../services/transporter"
import { pt } from "date-fns/locale"


export const cancelAppointmentBusiness = async (input: cancelAppointmentDTO) : Promise<void> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        const appointment = await getAppointmentById(input.id)

        if (!appointment) {

            throw new Error("Agendamento não encontrado")
        }

        if (appointment.canceledDate) {

            throw new Error("Esse agendamento já foi cancelado")
        }

        if (isBefore(subHours(parseISO(appointment.date), 6), new Date())) {

            throw new Error("Você não pode cancelar um agendamento com menos de 6 horas de antecedência")
        }

        const appointmentUser = await getUserById(appointment.userId)

        const appointmentProvider = await getUserById(appointment.providerId)

        const now = subHours(new Date(), 3).toISOString().substring(0, 19) + "-03:00"

        const appointmentCancelator: appointmentCancelator = {

            id: input.id,
            now
        }

        const canceledDate = format(new Date(appointment.date), "'dia' dd 'de' MMMM 'as' H:mm:ss", {locale: pt})

        if (user.id === appointmentUser.id) {

            await cancelAppointment(appointmentCancelator)

            transporter.sendMail({
            
                from: "<svtestcode@email.com>",
                to: appointmentProvider.email,
                subject: "Cancelamento de Aula",
                text: `O aluno ${appointmentUser.nickname} desmarcou a aula do ${canceledDate}`
            })
        }
        else if (user.id === appointmentProvider.id) {

            await cancelAppointment(appointmentCancelator)

            transporter.sendMail({
            
                from: "<svtestcode@email.com>",
                to: appointmentUser.email,
                subject: "Cancelamento de Aula",
                text: `O personal ${appointmentProvider.nickname} desmarcou a aula do ${canceledDate}`
            })
        }
        else {

            throw new Error("Você não pode cancelar esse agendamento")
        }
    }
    catch (error) {

        throw new Error(error.message)
    }
}
