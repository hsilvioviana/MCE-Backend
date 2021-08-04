import { Request, Response } from "express"
import { cancelDaysOffBusiness } from "../../business/appointments/cancelDaysOffBusiness"
import { cancelDaysOffDTO } from "../../model/appointments/cancelDaysOffModels"


export const cancelDaysOff = async (req: Request, res: Response) : Promise<void> => {
    
    try {

        const token = req.headers.authorization as string

        const id = req.params.id

        const input: cancelDaysOffDTO = { token, id }

        await cancelDaysOffBusiness(input)

        res.status(200).send({ message: "Dias de folga cancelados com sucesso" })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
