export type appointment = {

    id: string,
    date: string,
    canceledDate: string | null,
    userId: string,
    providerId: string
}

export type userAppointment = {

    id: string,
    date: string,
    canceledDate: string | null,
    providerId: string,
    providerNickname: string,
    providerAvatar: string
}

export type providerAppointment = {

    id: string,
    date: string,
    canceledDate: string | null,
    userId: string,
    userNickname: string,
    userAvatar: string,
}

export type appointmentPersonDetails = {

    id: string,
    nickname: string,
    avatar: string
}

export type userAppointmentDetails = {

    past: boolean,
    cancelable: boolean,
    id: string,
    date: string,
    provider: appointmentPersonDetails
}

export type providerAppointmentDetails = {

    past: boolean,
    cancelable: boolean,
    id: string,
    date: string,
    user: appointmentPersonDetails
}

export type schedule = {

    providerId: string,
    sunday: string,
    monday: string,
    tuesday: string,
    wednesday: string,
    thursday: string,
    friday: string,
    saturday: string
}

export type dayOff = {

    id: string,
    start: string,
    end: string,
    providerId: string
}
