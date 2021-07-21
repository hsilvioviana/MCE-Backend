import { deleteResetCode } from "../../data/users/deleteResetCode"
import { editPassword } from "../../data/users/editPassword"
import { getResetCodeByEmail } from "../../data/users/getResetCodeByEmail"
import { getUserByEmail } from "../../data/users/getUserByEmail"
import { authentication, passwordEditor, passwordResetDTO } from "../../model/users"
import { generateToken } from "../../services/authenticator"
import { compare, hash } from "../../services/hashManager"


export const passwordResetBusiness = async (input: passwordResetDTO) : Promise<authentication> => {

    try {

        if (!input.email || !input.code || !input.newPassword) {

            throw new Error("Você deve fornecer: 'email', 'code' e 'newPassword'")
        }

        if (input.newPassword.length < 6) {

            throw new Error("O campo 'newPassword' deve ter no mínimo 6 caracteres")
        }

        const user = await getUserByEmail(input.email)
        if (!user) {

            throw new Error("Email não encontrado")
        }

        const checkCode = await getResetCodeByEmail(input.email)
        if (!checkCode || !await compare(input.code, checkCode.code)) {

            throw new Error("Código Inválido")
        }

        const passwordEditor: passwordEditor = { id: user.id, newPassword: await hash(input.newPassword) }

        await editPassword(passwordEditor)

        await deleteResetCode(input.email)

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
