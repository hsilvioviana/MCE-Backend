import { Request, Response } from "express"
import { daysOffListBusiness } from "../../business/appointments/daysOffListBusiness"
import { daysOffListDTO, daysOffListItem } from "../../model/appointments/daysOffListModels"


export const daysOffList = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const input: daysOffListDTO = { token }

        const daysOff: daysOffListItem[] = await daysOffListBusiness(input)

        res.status(200).send({ daysOff })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
