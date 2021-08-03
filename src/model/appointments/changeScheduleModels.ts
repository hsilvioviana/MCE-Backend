export type changeScheduleDTO = {

    token: string,
    sunday: number[],
    monday: number[],
    tuesday: number[],
    wednesday: number[],
    thursday: number[],
    friday: number[],
    saturday: number[]
}

export type scheduleEditor = {

    providerId: string,
    sunday: string,
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string
}
