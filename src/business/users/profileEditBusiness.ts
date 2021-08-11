import { editUser } from "../../data/users/editUser"
import { editUserAndPassword } from "../../data/users/editUserAndPassword"
import { getUserByEmail } from "../../data/users/getUserByEmail"
import { getUserById } from "../../data/users/getUserById"
import { getUserByNickname } from "../../data/users/getUserByNickname"
import { getUserByPhone } from "../../data/users/getUserByPhone"
import { authentication } from "../../model/users/globalModels"
import { profileEditDTO } from "../../model/users/loginModels"
import { generateToken, getTokenData } from "../../services/authenticator"
import { compare, hash } from "../../services/hashManager"
import { profileEditSchema } from "../../validations/users/profileEditSchema"


export const profileEditBusiness = async (input: profileEditDTO) : Promise<authentication> => {

    try {

        const token = getTokenData(input.token)

        await profileEditSchema.validate(input)

        const user = await getUserById(token.id)

        const nicknameUser = await getUserByNickname(input.nickname)
        if (nicknameUser && nicknameUser.id !== user.id) {

            throw new Error("Apelido inválido")
        }

        const emailUser = await getUserByEmail(input.email)
        if (emailUser && emailUser.id !== user.id) {

            throw new Error("Email inválido")
        }

        const phoneUser = await getUserByPhone(input.phone)
        if (phoneUser && phoneUser.id !== user.id) {

            throw new Error("Telefone inválido")
        }

        if (input.newPassword) {

            if (!input.password) {

                throw new Error("Para alterar a senha é necessário fornecer a senha atual")
            }

            if (!await compare(input.password , user.password)) {

                throw new Error("Senha inválida")
            }

            await editUserAndPassword({ 
                id: user.id, 
                nickname: input.nickname, 
                email: input.email, 
                phone: input.phone,
                newPassword: await hash(input.newPassword)
            })
        }
        else {

            await editUser({ 
                id: user.id, 
                nickname: input.nickname, 
                email: input.email, 
                phone: input.phone
            })
        }

        const response: authentication = {

            user: {
                id: user.id,
                nickname: input.nickname,
                email: input.email,
                avatar : emailUser.avatar ? String(process.env.URL) + "/files/photo/download/" + emailUser.avatar : ""
            },
            token: generateToken({ id: user.id, role: user.role })
        }

        return response
    }
    catch (error) {

        throw new Error(error.message)
    }
}
