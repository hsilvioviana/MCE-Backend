import { Request, Response } from "express"
import { appointmentsOnDayBusiness } from "../../business/appointments/appointmentsOnDayBusiness"
import { appointmentsOnDayDTO } from "../../model/appointments/appointmentsOnDayModels"
import { providerAppointmentDetails, userAppointmentDetails } from "../../model/appointments/globalModels"


export const appointmentsOnDay = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const day = req.params.day

        const input: appointmentsOnDayDTO = { token, day }

        const appointments: userAppointmentDetails[] | providerAppointmentDetails[] = await appointmentsOnDayBusiness(input)

        res.status(200).send({ appointments })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
