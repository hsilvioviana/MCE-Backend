import { ROLES, user } from "../../model/users/globalModels"
import { connection } from "../connection"


export const getProviders = async () : Promise<user[]> => {

    const result = await connection.raw(`SELECT * FROM MC_Users WHERE role = "${ROLES.PERSONAL}"`)

    return result[0]
}
