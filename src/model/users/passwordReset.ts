export type passwordResetDTO = {
 
    email: string,
    code: string,
    newPassword: string
}

export type passwordEditor = {

    id: string,
    newPassword: string
}

export type resetCode = {

    id: string,
    code: string,
    email: string,
    createdAt: string
}
