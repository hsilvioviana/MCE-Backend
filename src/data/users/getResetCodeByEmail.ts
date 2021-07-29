import { resetCode } from "../../model/users/passwordReset"
import { connection } from "../connection"


export const getResetCodeByEmail = async (email: string) : Promise<resetCode> => {

    const result = await connection.raw(`SELECT * FROM MC_ResetPasswordCodes WHERE email = "${email}"`)

    return result[0][0]
}
