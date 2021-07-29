export type passwordForgotDTO = {
   
    email: string
}

export type passwordResetCodeCreator = {

    id: string,
    email: string,
    code: string
}
