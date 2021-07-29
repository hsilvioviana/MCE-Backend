import { deleteResetCode } from "../../data/users/deleteResetCode"
import { editPassword } from "../../data/users/editPassword"
import { getResetCodeByEmail } from "../../data/users/getResetCodeByEmail"
import { getUserByEmail } from "../../data/users/getUserByEmail"
import { authentication } from "../../model/users/globalModels"
import { passwordEditor, passwordResetDTO } from "../../model/users/passwordReset"
import { generateToken } from "../../services/authenticator"
import { compare, hash } from "../../services/hashManager"
import { passwordResetSchema } from "../../validations/users/passwordResetSchema"


export const passwordResetBusiness = async (input: passwordResetDTO) : Promise<authentication> => {

    try {

        await passwordResetSchema.validate(input)

        const emailUser = await getUserByEmail(input.email)
        if (!emailUser) {

            throw new Error("Email não encontrado")
        }

        const resetCode = await getResetCodeByEmail(input.email)
        if (!resetCode || !await compare(input.code, resetCode.code)) {

            throw new Error("Código Inválido")
        }

        const passwordEditor: passwordEditor = { id: emailUser.id, newPassword: await hash(input.newPassword) }

        await editPassword(passwordEditor)

        await deleteResetCode(input.email)

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
