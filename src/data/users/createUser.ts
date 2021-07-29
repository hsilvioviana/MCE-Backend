import { userCreator } from "../../model/users/signupModels"
import { connection } from "../connection"


export const createUser = async (user: userCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO MC_Users VALUES
    ("${user.id}", "${user.nickname}", "", "${user.email}", "${user.phone}", "${user.password}", 
    "${user.role}", CURDATE(), CURDATE())`)
}
