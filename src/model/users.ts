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
   avatar: string | undefined,
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
   email: string
}

export type authentication = {

   user: userAuthentication,
   token: string
}

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

export type userEditor = {

   id: string,
   nickname: string,
   email: string,
   phone: string
}

export type userAndPasswordEditor = {

   id: string,
   nickname: string,
   email: string,
   phone: string,
   newPassword: string
}