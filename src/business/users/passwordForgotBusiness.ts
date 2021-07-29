import { createResetCode } from "../../data/users/createResetCode"
import { getUserByEmail } from "../../data/users/getUserByEmail"
import { passwordForgotDTO, passwordResetCodeCreator } from "../../model/users/passwordForgotModels"
import { hash } from "../../services/hashManager"
import { generateId } from "../../services/idGenerator"
import { resetCode } from "../../services/passwordForgotManager"
import { transporter } from "../../services/transporter"
import { passwordForgotSchema } from "../../validations/users/passwordForgotSchema"


export const passwordForgotBusiness  = async (input: passwordForgotDTO) : Promise<void> => {

    try {

        await passwordForgotSchema.validate(input)

        const emailUser = await getUserByEmail(input.email)
        if (!emailUser) {

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
