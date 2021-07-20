import { user } from "../../model/users"
import { connection } from "../connection"


export const getUserById = async (id: string) : Promise<user> => {

    const result = await connection.raw(`SELECT * FROM MC_Users WHERE id = "${id}"`)

    return result[0][0]
}
