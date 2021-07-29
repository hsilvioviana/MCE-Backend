import { passwordEditor } from "../../model/users/passwordReset"
import { connection } from "../connection"


export const editPassword = async (input: passwordEditor) : Promise<void> => {

    await connection.raw(`UPDATE MC_Users SET password = "${input.newPassword}", 
    updatedAt = CURDATE() WHERE id = "${input.id}"`)
}
