import { getUserById } from "../../data/users/getUserById"
import { profile, profileDTO } from "../../model/users/profileModels"
import { getTokenData } from "../../services/authenticator"


export const profileDetailsBusiness = async (input: profileDTO) : Promise<profile> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        const profile: profile = {

            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar ? String(process.env.URL) + "/files/photo/download/" + user.avatar : "",
            email: user.email,
            phone: user.phone
        }

        return profile
    }
    catch (error) {

        throw new Error(error.message)
    }
}
