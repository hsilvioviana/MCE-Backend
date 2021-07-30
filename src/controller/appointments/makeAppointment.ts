import { Request, Response } from "express"
import { makeAppointmentBusiness } from "../../business/appointments/makeAppointmentBusiness"
import { makeAppointmentsDTO } from "../../model/appointments/makeAppointmentModels"


export const makeAppointment = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const { providerId, date } = req.body

        const input: makeAppointmentsDTO = { token, providerId, date }

        await makeAppointmentBusiness(input)

        res.status(200).send({ message: "Agendamento realizado" })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
