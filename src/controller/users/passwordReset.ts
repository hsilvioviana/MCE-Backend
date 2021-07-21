import { Request, Response } from "express"
import { passwordResetBusiness } from "../../business/users/passwordResetBusiness"
import { authentication, passwordResetDTO } from "../../model/users"


export const passwordReset = async (req: Request, res: Response) : Promise<void> => {

    try {

        const { email, code, newPassword } = req.body

        const input: passwordResetDTO = { email, code, newPassword }

        const authentication: authentication = await passwordResetBusiness(input)

        res.status(200).send({ user: authentication.user, token: authentication.token })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}