import { Router } from "express"
import { login } from "../controller/users/login"
import { passwordForgot } from "../controller/users/passwordForgot"
import { passwordReset } from "../controller/users/passwordReset"
import { photoUpload } from "../controller/users/photoUpload"
import { profileEdit } from "../controller/users/profileEdit"
import { signup } from "../controller/users/signup"


export const usersRouter = Router()

usersRouter.post("/signup", signup)
usersRouter.post("/login", login)

usersRouter.post("/password/forgot", passwordForgot)
usersRouter.post("/password/reset", passwordReset)
usersRouter.put("/profile/edit", profileEdit)
usersRouter.put("/photo/upload", photoUpload)
