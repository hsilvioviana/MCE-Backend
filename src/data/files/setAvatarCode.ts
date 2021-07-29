import { avatarIdEditor } from "../../model/files/photoUpload"
import { connection } from "../connection"


export const setAvatarCode = async (input: avatarIdEditor) : Promise<void> => {

    await connection.raw(`UPDATE MC_Users SET avatar = "${input.newAvatarId}" WHERE id = "${input.userId}"`)
}
