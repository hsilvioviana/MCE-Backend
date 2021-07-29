import { userAndPasswordEditor } from "../../model/users/profileEditModels"
import { connection } from "../connection"


export const editUserAndPassword = async (input: userAndPasswordEditor) : Promise<void> => {

    await connection.raw(`UPDATE MC_Users SET nickname = "${input.nickname}",
    email = "${input.email}", phone = "${input.phone}", password = "${input.newPassword}", 
    updatedAt = CURDATE() WHERE id = "${input.id}"`)
}
