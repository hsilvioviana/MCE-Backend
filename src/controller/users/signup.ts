import { Request, Response } from "express"
import { signupBusiness } from "../../business/users/signupBusiness"
import { authentication, signupDTO } from "../../model/users"


export const signup = async (req: Request,res: Response) : Promise<void> => {

   try {
      
      const { nickname, email, phone, password, role } = req.body

      const input: signupDTO = { nickname, email, phone, password, role }

      const authentication: authentication = await signupBusiness(input)

      res.status(200).send({ user: authentication.user, token: authentication.token })
   } 
   catch (error) {

      res.status(400).send({ error: error.message })
   }
}