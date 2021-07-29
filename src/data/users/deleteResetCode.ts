import { connection } from "../connection"


export const deleteResetCode = async (email: string) : Promise<void> => {

    await connection.raw(`DELETE FROM MC_ResetPasswordCodes WHERE email = "${email}"`)
}
