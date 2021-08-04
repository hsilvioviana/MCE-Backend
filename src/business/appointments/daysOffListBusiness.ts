import { getDaysOffByProviderId } from "../../data/appointments/getDaysOffByProviderId"
import { getUserById } from "../../data/users/getUserById"
import { daysOffListDTO, daysOffListItem } from "../../model/appointments/daysOffListModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"


export const daysOffListBusiness = async (input: daysOffListDTO) : Promise<daysOffListItem[]> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user || user.role !== ROLES.PERSONAL) {

            throw new Error("Token inválido")
        }

        const daysOff = await getDaysOffByProviderId(user.id)

        return daysOff.map(item => {

            return {
                id: item.id,
                start: item.start,
                end: item.end.substring(0, 10) + "T00:00:00-03:00"
            }
        })
    }
    catch (error) {

        throw new Error(error.message)
    }
}
