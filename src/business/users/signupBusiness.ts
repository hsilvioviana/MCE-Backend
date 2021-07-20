import { createUser } from "../../data/users/createUser"
import { getUserByEmail } from "../../data/users/getUserByEmail"
import { getUserByNickname } from "../../data/users/getUserByNickname"
import { getUserByPhone } from "../../data/users/getUserByPhone"
import { authentication, ROLES, signupDTO, userCreator } from "../../model/users"
import { generateToken } from "../../services/authenticator"
import { hash } from "../../services/hashManager"
import { generateId } from "../../services/idGenerator"


export const signupBusiness = async (input: signupDTO) : Promise<authentication> => {

    try {

        if (!input.nickname || !input.email || !input.phone || !input.password || !input.role) {

            throw new Error("Você deve fornecer: 'nickname', 'email', 'phone', 'password' e 'role'")
        }

        if (input.password.length < 6) {

            throw new Error("O campo 'password' deve ter no mínimo 6 caracteres")
        }

        if (!(input.role in ROLES)) {

            throw new Error("O campo 'role' deve ser: 'USER' ou 'PERSONAL'")
        }

        const checkNickname = await getUserByNickname(input.nickname)
        if (checkNickname) {

            throw new Error("'nickname' inválido")
        }

        const checkEmail = await getUserByEmail(input.email)
        if (checkEmail) {

            throw new Error("'email' inválido")
        }

        const checkPhone = await getUserByPhone(input.phone)
        if (checkPhone) {

            throw new Error("'phone' inválido")
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