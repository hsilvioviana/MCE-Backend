import nodemailer from "nodemailer"
import dotenv from "dotenv"
import exphbs from "express-handlebars"
import nodemailerhbs from "nodemailer-express-handlebars"
import { resolve } from "path"


dotenv.config()

const transporter = nodemailer.createTransport({
    
    service: "gmail",
    auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
    },
})

const viewPath = resolve(__dirname, "..", "..", "src", "views")

transporter.use("compile", nodemailerhbs({

    viewEngine: {
      
      layoutsDir: resolve(viewPath, "layouts"),
      extname: ".hbs",
    },
    viewPath,
    extName: ".hbs",
  }))

export default transporter
