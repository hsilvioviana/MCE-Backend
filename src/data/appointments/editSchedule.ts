import { scheduleEditor } from "../../model/appointments/changeScheduleModels"
import { connection } from "../connection"


export const editSchedule = async (input: scheduleEditor) : Promise<void> => {

    await connection.raw(`UPDATE MC_Schedules SET sunday = "${input.sunday}", monday = "${input.monday}",
    tuesday = "${input.tuesday}", wednesday = "${input.wednesday}", thursday = "${input.thursday}",
    friday = "${input.friday}", saturday = "${input.saturday}" WHERE providerId = "${input.providerId}"`)
}
