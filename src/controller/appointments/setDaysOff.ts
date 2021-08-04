import { Request, Response } from "express"
import { setDaysOffBusiness } from "../../business/appointments/setDaysOffBusiness"
import { setDaysOffDTO } from "../../model/appointments/setDaysOffModels"


export const setDaysOff = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const { firstDayOff, lastDayOff } = req.body

        const input: setDaysOffDTO = { token, firstDayOff, lastDayOff }

        await setDaysOffBusiness(input)

        res.status(200).send({ message: "Seus dias de folgas foram salvos"})
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
