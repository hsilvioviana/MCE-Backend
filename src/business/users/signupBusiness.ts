import { createUser } from "../../data/users/createUser"
import { getUserByEmail } from "../../data/users/getUserByEmail"
import { getUserByNickname } from "../../data/users/getUserByNickname"
import { getUserByPhone } from "../../data/users/getUserByPhone"
import { authentication } from "../../model/users/globalModels"
import { signupDTO, userCreator } from "../../model/users/signupModels"
import { generateToken } from "../../services/authenticator"
import { hash } from "../../services/hashManager"
import { generateId } from "../../services/idGenerator"
import { signupSchema } from "../../validations/users/signupSchema"


export const signupBusiness = async (input: signupDTO) : Promise<authentication> => {

    try {

        await signupSchema.validate(input)

        const nicknameUser = await getUserByNickname(input.nickname)
        if (nicknameUser) {

            throw new Error("Nickname inválido")
        }

        const emailUser = await getUserByEmail(input.email)
        if (emailUser) {

            throw new Error("Email inválido")
        }

        const phoneUser = await getUserByPhone(input.phone)
        if (phoneUser) {

            throw new Error("Telefone inválido")
        }

        const newUser: userCreator = {

            id: generateId(),
            nickname: input.nickname,
            email: input.email,
            phone: input.phone,
            password: await hash(input.password),
            role: input.role
        }

        await createUser(newUser)

        const response: authentication = {

            user: {
                id: newUser.id,
                nickname: newUser.nickname,
                email: newUser.email
            },
            token: generateToken({ id: newUser.id, role: newUser.role })
        }

        return response
    }
    catch (error) {

        throw new Error(error.message)
    }
}
