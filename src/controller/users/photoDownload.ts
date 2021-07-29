import { Request, Response } from "express"
import path from "path"


export const photoDownload = async (req: Request, res: Response) : Promise<void> => {

    try {

        const avatarFile = req.params.file

        res.status(200).sendFile(path.resolve('src', 'uploads', 'users', avatarFile))
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}