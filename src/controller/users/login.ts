import { Response, Request } from "express"
import { loginBusiness } from "../../business/users/loginBusiness"
import { authentication, loginDTO } from "../../model/users"


export const login = async(req: Request, res: Response) : Promise<void> => {

    try {
        
        const { email, password } = req.body

        const input: loginDTO = { email, password}

        const authentication: authentication = await loginBusiness(input)

        res.status(200).send({ user: authentication.user, token: authentication.token })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}