import { getUserById } from "../../data/users/getUserById"
import { daysOffCreator, setDaysOffDTO } from "../../model/appointments/setDaysOffModels"
import { ROLES } from "../../model/users/globalModels"
import { getTokenData } from "../../services/authenticator"
import { setDaysOffSchema } from "../../validations/appointments/setDaysOffSchema"
import { parseISO, subHours, startOfDay, endOfDay, isValid, isBefore } from "date-fns"
import { createDaysOff } from "../../data/appointments/createDaysOff"
import { generateId } from "../../services/idGenerator"


export const setDaysOffBusiness = async (input: setDaysOffDTO) : Promise<void> => {

    try {

        await setDaysOffSchema.validate(input)

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user || user.role !== ROLES.PERSONAL) {

            throw new Error("Token inválido")
        }

        const firstDayOff = parseISO(input.firstDayOff)
        const lastDayOff = parseISO(input.lastDayOff)

        if (!isValid(firstDayOff) || firstDayOff.getHours() !== 0 || firstDayOff.getMinutes() !== 0 || firstDayOff.getSeconds() !== 0) {

            throw new Error("O 'firstDayOff' é uma data inválida")
        }

        if (!isValid(lastDayOff) || lastDayOff.getHours() !== 0 || lastDayOff.getMinutes() !== 0 || lastDayOff.getSeconds() !== 0) {

            throw new Error("O 'lastDayOff' é uma data inválida")
        }

        const FirstDayGMT = input.firstDayOff.substring(19, 25)

        if (FirstDayGMT !== "-03:00") {

            throw new Error("Apenas o GMT -03:00 é aceito no campo 'firstDayOff'")
        }

        const LastDayGMT = input.lastDayOff.substring(19, 25)

        if (LastDayGMT !== "-03:00") {

            throw new Error("Apenas o GMT -03:00 é aceito no campo 'lastDayOff'")
        }

        if (isBefore(lastDayOff, firstDayOff)) {

            throw new Error("O último dia de folga deve ser depois do primeiro dia")
        }

        const newDaysOff: daysOffCreator = {

            id: generateId(),
            providerId: user.id,
            start: subHours(startOfDay(firstDayOff), 3).toISOString().substring(0, 19) + "-03:00",
            end:  subHours(endOfDay(lastDayOff), 3).toISOString().substring(0, 19) + "-03:00"
        }

        await createDaysOff(newDaysOff)
    }
    catch (error) {

        throw new Error(error.message)
    }
}
