export type loginDTO = {

    email: string,
    password: string
}
 
export type profileEditDTO = {
 
    token: string,
    nickname: string,
    email: string,
    phone: string,
    password: string | undefined,
    newPassword: string | undefined
}
