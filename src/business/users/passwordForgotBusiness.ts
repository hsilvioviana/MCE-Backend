import { createResetCode } from "../../data/users/createResetCode"
import { getUserByEmail } from "../../data/users/getUserByEmail"
import { passwordForgotDTO, passwordResetCodeCreator } from "../../model/users"
import { hash } from "../../services/hashManager"
import { generateId } from "../../services/idGenerator"
import { resetCode } from "../../services/passwordForgotManager"
import { transporter } from "../../services/transporter"


export const passwordForgotBusiness  = async (input: passwordForgotDTO) : Promise<void> => {

    try {

        if (!input.email) {

            throw new Error("Você deve fornecer: 'email'")
        }

        const checkEmail = await getUserByEmail(input.email)
        if (!checkEmail) {

            throw new Error("Email não encontrado")
        }

        const code = resetCode()

        const codeCreator: passwordResetCodeCreator = {

            id: generateId(),
            email: input.email,
            code: await hash(code)
        }

        await createResetCode(codeCreator)

        transporter.sendMail({
            
            from: "<svtestcode@email.com>",
            to: input.email,
            subject: "Código de Recuperação de Senha",
            text: `Código: ${code}`
        })
    }
    catch (error) {

        throw new Error(error.message)
    }
}
