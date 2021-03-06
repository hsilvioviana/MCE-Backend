import { Request, Response } from "express"
import { appointmentsDisponibilityBusiness } from "../../business/appointments/appointmentsDisponibilityBusiness"
import { appointmentsDisponibilityDTO, timeDisponibility } from "../../model/appointments/appointmentsDisponibilityModels"


export const appointmentsDisponibility = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const { providerId, day } = req.body

        const input: appointmentsDisponibilityDTO = { token, providerId, day }

        const disponibility: timeDisponibility[] = await appointmentsDisponibilityBusiness(input)

        res.status(200).send({ disponibility })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
