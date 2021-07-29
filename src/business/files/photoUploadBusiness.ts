import { getTokenData } from "../../services/authenticator"
import fs from "fs"
import { getUserById } from "../../data/users/getUserById"
import { setAvatarCode } from "../../data/files/setAvatarCode"
import { avatarIdEditor, photoUploadDTO } from "../../model/files/photoUpload"


export const photoUploadBusiness = async (input: photoUploadDTO) : Promise<void> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        const oldAvatarId = user.avatar

        const directory = "./src/uploads/"

        fs.readdir(directory, (err, files) => {

            files.forEach(file => {

                if(file == oldAvatarId) {

                    fs.unlink( directory + file ,(err) => {})
                }    
            })
        })

        const avatarIdEditor: avatarIdEditor = { newAvatarId: input.newAvatarId, userId: user.id }

        await setAvatarCode(avatarIdEditor)
    }
    catch (error) {

        throw new Error(error.message)
    }
}
