import { getUserById } from "../../data/users/getUserById"
import { appointmentCreator, makeAppointmentsDTO } from "../../model/appointments/makeAppointmentModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { makeAppointmentSchema } from "../../validations/appointments/makeAppointmentSchema"
import { parseISO, isFuture, isValid, subHours, format, isBefore, subMonths } from "date-fns"
import { generateId } from "../../services/idGenerator"
import { createAppointment } from "../../data/appointments/createAppointment"
import { getAppointmentsByProviderId } from "../../data/appointments/getAppointmentsByProviderId"
import { notification } from "../../model/notifications/globalModels"
import { createNotification } from "../../data/notifications/createNotification"
import { pt } from "date-fns/locale"
import { getScheduleByProviderId } from "../../data/appointments/getScheduleByProviderId"
import { scheduleOfTheDay } from "../../services/handleSchedule"


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

        if (isBefore(subHours(time, 2), new Date())) {

            throw new Error("Você não pode agendar uma aula com menos de 2 horas de antecedência")
        }

        if (!isBefore(subMonths(time, 2), new Date())) {

            throw new Error("Você não pode agendar uma aula com mais de 2 meses de antecedência")
        }

        const gmt = input.date.substring(19, 25)

        if (gmt !== "-03:00") {

            throw new Error("Apenas o GMT -03:00 é aceito")
        }

        const schedule = await getScheduleByProviderId(provider.id)

        const hours = scheduleOfTheDay(schedule, time)

        const acceptedHours = hours.split(" ").map(hour => Number(hour))

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

        const createdAt = subHours(new Date(), 3).toISOString().substring(0, 19) + "-03:00"

        const content = `Novo agendamento de ${user.nickname} ` + 
        format(new Date(input.date), "'dia' dd 'de' MMMM 'as' H:mm:ss", {locale: pt})
        
        const notification: notification = {

            id: generateId(),
            viewed: false,
            content,
            receiverId: provider.id,
            createdAt
        }

        await createNotification(notification)
    }
    catch (error) {

        throw new Error(error.message)
    }
}
