import { userEditor } from "../../model/users/profileEditModels"
import { connection } from "../connection"


export const editUser = async (input: userEditor) : Promise<void> => {

    await connection.raw(`UPDATE MC_Users SET nickname = "${input.nickname}", 
    email = "${input.email}", phone = "${input.phone}", updatedAt = CURDATE() WHERE id = "${input.id}"`)
}
