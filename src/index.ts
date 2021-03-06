import { app } from "./controller/app"
import { appointmentsRouter } from "./routes/appointmentsRouter"
import { filesRouter } from "./routes/filesRouter"
import { notificationsRouter } from "./routes/notificationsRouter"
import { usersRouter } from "./routes/usersRouter"


app.use("/users", usersRouter)
app.use("/files", filesRouter)
app.use("/appointments", appointmentsRouter)
app.use("/notifications", notificationsRouter)
