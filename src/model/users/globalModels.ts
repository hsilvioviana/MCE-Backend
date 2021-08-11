export enum ROLES {

    USER = "USER",
    PERSONAL = "PERSONAL"
}

export type authenticationData = {

    id: string,
    role: ROLES
}

export type user = {

    id: string,
    nickname: string,
    avatar: string,
    email: string,
    phone: string,
    password: string,
    role: ROLES,
    createdAt: Date,
    updatedAt: Date
}

export type userAuthentication = {

    id: string
    nickname: string,
    email: string,
    avatar: string
}
 
export type authentication = {
 
    user: userAuthentication,
    token: string
}
