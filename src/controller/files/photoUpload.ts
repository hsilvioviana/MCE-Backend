import { Request, Response } from "express"
import { photoUploadBusiness } from "../../business/files/photoUploadBusiness"
import multer from "multer"
import path from "path"
import { generateId } from "../../services/idGenerator"
import { photoUploadDTO } from "../../model/files/photoUpload"


export const photoUpload = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const newAvatarId = generateId() + ".jpg"

        const input: photoUploadDTO = { token, newAvatarId }

        await photoUploadBusiness(input)

        const storage = multer.diskStorage({

            destination: (req, file, cb) => {

                const acceptedExtensions = [".jpg", ".jpeg", ".png"]

                const extension = path.extname(file.originalname)

                if (acceptedExtensions.includes(extension)) {

                    cb(null, "./src/uploads/")
                }
            },
            filename: (req, file, cb) => {
                
                cb(null, newAvatarId)
            }
        })
        
        const upload = multer({ storage })

        upload.single("image")(req, res, () => {})

        res.status(200).send({ message: "Foto atualizada com sucesso" })
    }
    catch (error) {

        res.status(400).send({ error: error.message })
    }
}
