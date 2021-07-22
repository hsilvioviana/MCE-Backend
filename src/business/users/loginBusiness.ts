import { getUserByEmail } from "../../data/users/getUserByEmail"
import { authentication, loginDTO } from "../../model/users"
import { generateToken } from "../../services/authenticator"
import { compare } from "../../services/hashManager"
import { loginSchema } from "../../validations/loginSchema"


export const loginBusiness = async (input: loginDTO) : Promise<authentication> => {

    try {

        await loginSchema.validate(input)

        const emailUser = await getUserByEmail(input.email)

        if (!emailUser) {

            throw new Error("Usuário não encontrado")
        }

        if (!await compare(input.password, emailUser.password)) {

            throw new Error("Senha inválida")
        }

        const response: authentication = {

            user: {
                id: emailUser.id,
                nickname: emailUser.nickname,
                email: emailUser.email
            },
            token: generateToken({ id: emailUser.id, role: emailUser.role })
        }

        return response
    }
    catch (error) {

        throw new Error(error.message)
    }
}
