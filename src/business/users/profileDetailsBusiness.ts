import { getUserById } from "../../data/users/getUserById"
import { profileDTO, profile } from "../../model/users"
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
            avatar: "http://localhost:3003/users/photo/download/" + user.avatar,
            email: user.email,
            phone: user.phone
        }

        return profile
    }
    catch (error) {

        throw new Error(error.message)
    }
}
