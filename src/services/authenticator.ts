import * as jwt from "jsonwebtoken"
import { authenticationData } from "../model/users/globalModels"


export const generateToken = (payload: authenticationData) : string => {

   return jwt.sign(payload, process.env.JWT_KEY as string, { expiresIn: process.env.EXPIRES_IN })
}

export const getTokenData = (token: string) : authenticationData => {

   return jwt.verify(token, process.env.JWT_KEY as string) as authenticationData
}
