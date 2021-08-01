import { Request, Response } from "express"
import { providersListBusiness } from "../../business/users/providersListBusiness"
import { provider, providersDTO } from "../../model/users/providersModels"


export const providersList = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const input: providersDTO = { token }

        const providers: provider[] = await providersListBusiness(input)

        res.status(200).send({ providers })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
