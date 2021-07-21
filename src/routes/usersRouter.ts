import { Router } from "express"
import { login } from "../controller/users/login"
import { passwordForgot } from "../controller/users/passwordForgot"
import { profileEdit } from "../controller/users/profileEdit"
import { signup } from "../controller/users/signup"


export const usersRouter = Router()

usersRouter.post("/signup", signup)
usersRouter.post("/login", login)

usersRouter.post("/password/forgot", passwordForgot)
usersRouter.put("/profile/edit", profileEdit)