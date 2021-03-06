import { Router } from "express"
import { login } from "../controller/users/login"
import { passwordForgot } from "../controller/users/passwordForgot"
import { passwordReset } from "../controller/users/passwordReset"
import { profileDetails } from "../controller/users/profileDetails"
import { profileEdit } from "../controller/users/profileEdit"
import { providersList } from "../controller/users/providersList"
import { signup } from "../controller/users/signup"


export const usersRouter = Router()

usersRouter.post("/signup", signup)
usersRouter.post("/login", login)

usersRouter.get("/profile", profileDetails)
usersRouter.get("/providers", providersList)
usersRouter.post("/password/forgot", passwordForgot)
usersRouter.post("/password/reset", passwordReset)
usersRouter.put("/profile/edit", profileEdit)
