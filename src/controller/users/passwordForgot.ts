import { Request, Response } from "express"
import { passwordForgotBusiness } from "../../business/users/passwordForgotBusiness"
import { passwordForgotDTO } from "../../model/users"


export const passwordForgot = async (req: Request, res: Response) : Promise<void> => {

    try {

        const email = req.body.email

        const input: passwordForgotDTO = { email }

        await passwordForgotBusiness(input)

        res.status(200).send({ message: "Código enviado para o email fornecido" })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}