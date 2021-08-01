import { getProviders } from "../../data/users/getProviders"
import { getUserById } from "../../data/users/getUserById"
import { provider, providersDTO } from "../../model/users/providersModels"
import { getTokenData } from "../../services/authenticator"


export const providersListBusiness = async (input: providersDTO) : Promise<provider[]> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id) 

        if (!user) {

            throw new Error("Token inválido")
        }

        const providers = await getProviders()

        return providers.map(provider => {

            return {
                id: provider.id,
                nickname: provider.nickname,
                avatar: provider.avatar ? process.env.URL + provider.avatar : ""
            }
        })
    }
    catch (error) {

        throw new Error(error.message)
    }
}
