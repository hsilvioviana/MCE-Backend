import { editSchedule } from "../../data/appointments/editSchedule"
import { getUserById } from "../../data/users/getUserById"
import { changeScheduleDTO, scheduleEditor } from "../../model/appointments/changeScheduleModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { changeScheduleSchema } from "../../validations/appointments/changeScheduleSchema"


export const changeScheduleBusiness = async (input: changeScheduleDTO) : Promise<void> => {

    try {

        await changeScheduleSchema.validate(input)

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user || user.role !== ROLES.PERSONAL) {

            throw new Error("Token inválido")
        }

        const newSchedule: scheduleEditor = {

            providerId: user.id,
            sunday: [...new Set(input.sunday)].sort((a, b) => { return Number(a) - Number(b) }).join(" "),
            monday: [...new Set(input.monday)].sort((a, b) => { return Number(a) - Number(b) }).join(" "),
            tuesday: [...new Set(input.tuesday)].sort((a, b) => { return Number(a) - Number(b) }).join(" "),
            thursday: [...new Set(input.thursday)].sort((a, b) => { return Number(a) - Number(b) }).join(" "),
            wednesday: [...new Set(input.wednesday)].sort((a, b) => { return Number(a) - Number(b) }).join(" "),
            friday: [...new Set(input.friday)].sort((a, b) => { return Number(a) - Number(b) }).join(" "),
            saturday: [...new Set(input.saturday)].sort((a, b) => { return Number(a) - Number(b) }).join(" "),
        }

        await editSchedule(newSchedule)
    }
    catch (error) {

        throw new Error(error.message)
    }
}
