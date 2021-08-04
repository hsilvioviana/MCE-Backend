import { daysOffCreator } from "../../model/appointments/setDaysOffModels"
import { connection } from "../connection"


export const createDaysOff = async (input: daysOffCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO MC_DaysOff VALUES
    ("${input.id}", "${input.start}", "${input.end}", "${input.providerId}", CURDATE())`)
}
