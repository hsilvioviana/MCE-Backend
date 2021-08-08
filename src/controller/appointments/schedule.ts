import { Request, Response } from "express"
import { scheduleBusiness } from "../../business/appointments/scheduleBusiness"
import { scheduleDTO } from "../../model/appointments/scheduleModels"


export const schedule = async (req: Request, res: Response) : Promise<void> => {

    try {

        const id = req.params.id

        const input: scheduleDTO = { id }

        const hours = await scheduleBusiness(input)

        res.status(200).send({ schedule: hours })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
