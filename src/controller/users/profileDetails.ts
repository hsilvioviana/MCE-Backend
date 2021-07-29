import { Request, Response } from "express"
import { profileDetailsBusiness } from "../../business/users/profileDetailsBusiness"
import { profileDTO, profile } from "../../model/users"
import path from "path"


export const profileDetails = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const input: profileDTO = { token }

        const profile: profile = await profileDetailsBusiness(input)

        res.status(200).send({ profile })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}