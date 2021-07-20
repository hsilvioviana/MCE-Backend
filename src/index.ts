import { app } from "./controller/app"
import { usersRouter } from "./routes/usersRouter"


app.use("/users", usersRouter)