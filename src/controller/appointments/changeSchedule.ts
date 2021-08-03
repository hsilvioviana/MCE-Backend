import { Request, Response } from "express"
import { changeScheduleBusiness } from "../../business/appointments/changeScheduleBusiness"
import { changeScheduleDTO } from "../../model/appointments/changeScheduleModels"


export const changeSchedule = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = req.body

        const input: changeScheduleDTO = { token, sunday, monday, tuesday, wednesday, thursday, friday, saturday }

        await changeScheduleBusiness(input)

        res.status(200).send({ message: "Horário editado com sucesso" })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
