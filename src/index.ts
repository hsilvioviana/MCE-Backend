import { app } from "./controller/app"
import { filesRouter } from "./routes/filesRouter"
import { usersRouter } from "./routes/usersRouter"


app.use("/users", usersRouter)
app.use("/files", filesRouter)
