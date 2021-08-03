import { schedule } from "../model/appointments/globalModels"


export const scheduleOfTheDay = (schedule: schedule, time: Date) => {

    const weekIndex = time.getDay()

    const days = [schedule.sunday, schedule.monday, schedule.tuesday, schedule.wednesday,
        schedule.thursday, schedule.friday, schedule.saturday]
    
    return days[weekIndex]
}
