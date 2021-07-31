import { Request, Response } from "express"
import { cancelAppointmentBusiness } from "../../business/appointments/cancelAppointmentBusiness"
import { cancelAppointmentDTO } from "../../model/appointments/cancelAppointmentModels"


export const cancelAppointment = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const id = req.params.id

        const input: cancelAppointmentDTO = { token, id }

        await cancelAppointmentBusiness(input)

        res.status(200).send({ message: "Agendamento cancelado" })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
