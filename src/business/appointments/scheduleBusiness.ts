import { getScheduleByProviderId } from "../../data/appointments/getScheduleByProviderId"
import { getUserById } from "../../data/users/getUserById"
import { schedule } from "../../model/appointments/globalModels"
import { scheduleDTO } from "../../model/appointments/scheduleModels"
import { ROLES } from "../../model/users/globalModels"


export const scheduleBusiness = async (input: scheduleDTO) : Promise<schedule> => {

    try {

        const provider = await getUserById(input.id)

        if (!provider || provider.role !== ROLES.PERSONAL) {

            throw new Error("Personal não encontrado")
        }

        const schedule =  await getScheduleByProviderId(provider.id)

        return schedule
    }
    catch (error) {

        throw new Error(error.message)
    }
}
