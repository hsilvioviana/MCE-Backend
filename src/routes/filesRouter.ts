import { Router } from "express"
import { photoDownload } from "../controller/files/photoDownload"
import { photoUpload } from "../controller/files/photoUpload"


export const filesRouter = Router()

filesRouter.get("/photo/download/:file", photoDownload)
filesRouter.put("/photo/upload", photoUpload)
