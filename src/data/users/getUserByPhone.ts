import { user } from "../../model/users"
import { connection } from "../connection"


export const getUserByPhone = async (phone: string) : Promise<user> => {

    const result = await connection.raw(`SELECT * FROM MC_Users WHERE phone = "${phone}"`)

    return result[0][0]
}