import { Request, Response } from "express"
import { appointmentsBusiness } from "../../business/appointments/appointmentsBusiness"
import { appointmentsDTO } from "../../model/appointments/appointmentsModels"


export const appointments = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const input: appointmentsDTO = { token }

        const appointments = await appointmentsBusiness(input)

        res.status(200).send({ appointments })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
