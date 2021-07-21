import { passwordResetCodeCreator } from "../../model/users"
import { connection } from "../connection"


export const createResetCode = async (input: passwordResetCodeCreator) : Promise<void> => {

    await connection.raw(`DELETE FROM MC_ResetPasswordCodes WHERE email = "${input.email}"`)

    await connection.raw(`INSERT INTO MC_ResetPasswordCodes VALUES 
    ("${input.id}", "${input.code}", "${input.email}", CURDATE())`)
}
