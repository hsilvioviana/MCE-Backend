import { getUserByEmail } from "../../data/users/getUserByEmail";
import { authentication, loginDTO } from "../../model/users";
import { generateToken } from "../../services/authenticator";
import { compare } from "../../services/hashManager";


export const loginBusiness = async (input: loginDTO) : Promise<authentication> => {

    try {

        if (!input.email || !input.password) {

            throw new Error("Você deve fornecer: 'email' e 'password'")
        }

        const user = await getUserByEmail(input.email)

        if (!user) {

            throw new Error("Usuário não encontrado")
        }

        if (!await compare(input.password, user.password)) {

            throw new Error("Senha inválida")
        }

        const response: authentication = {

            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email
            },
            token: generateToken({ id: user.id, role: user.role })
        }

        return response
    }
    catch (error) {

        throw new Error(error.message)
    }
}