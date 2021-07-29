import { user } from "../../model/users/globalModels"
import { connection } from "../connection"


export const getUserByEmail = async (email: string) : Promise<user> => {

    const result = await connection.raw(`SELECT * FROM MC_Users WHERE email = "${email}"`)

    return result[0][0]
}
