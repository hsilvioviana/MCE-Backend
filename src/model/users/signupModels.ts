import { ROLES } from "./globalModels"


export type signupDTO = {

    nickname: string,
    email: string,
    phone: string,
    password: string,
    role: ROLES
}
 
export type userCreator = {
 
    id: string,
    nickname: string,
    email: string,
    phone: string,
    password: string,
    role: ROLES
}

