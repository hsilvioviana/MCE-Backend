export type appointment = {

    id: string,
    date: string,
    canceledDate: string | null,
    userId?: string,
    userNickname?: string,
    userAvatar?: string,
    providerId?: string,
    providerNickname?: string,
    providerAvatar?: string
}
