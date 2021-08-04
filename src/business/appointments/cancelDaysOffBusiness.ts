import { cancelDayOff } from "../../data/appointments/cancelDayOff"
import { getDayOffById } from "../../data/appointments/getDayOffById"
import { getUserById } from "../../data/users/getUserById"
import { cancelDaysOffDTO } from "../../model/appointments/cancelDaysOffModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"


export const cancelDaysOffBusiness = async (input: cancelDaysOffDTO) : Promise<void> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user || user.role !== ROLES.PERSONAL) {

            throw new Error("Token inválido")
        }

        const dayOff = await getDayOffById(input.id)

        if (!dayOff) {

            throw new Error("Dias de folga não encontrados")
        }

        if (dayOff.providerId !== user.id) {

            throw new Error("Você não pode apagar os dias de folga de outra pessoa")
        }

        await cancelDayOff(dayOff.id)
    }
    catch (error) {

        throw new Error(error.message)
    }
}
