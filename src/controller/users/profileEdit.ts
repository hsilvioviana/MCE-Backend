import { Request, Response } from "express"
import { profileEditBusiness } from "../../business/users/profileEditBusiness"
import { authentication, profileEditDTO } from "../../model/users"


export const profileEdit = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const { nickname, email, phone, password, newPassword } = req.body

        const input: profileEditDTO = { token, nickname, email, phone, password, newPassword }

        const authentication: authentication = await profileEditBusiness(input)
        
        res.status(200).send({ user: authentication.user, token: authentication.token })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}