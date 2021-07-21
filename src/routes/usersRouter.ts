import { Router } from "express"
import { login } from "../controller/users/login"
import { profileEdit } from "../controller/users/profileEdit"
import { signup } from "../controller/users/signup"


export const usersRouter = Router()

usersRouter.post("/signup", signup)
usersRouter.post("/login", login)
usersRouter.put("/profile/edit", profileEdit)