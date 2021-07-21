import { editUser } from "../../data/users/editUser";
import { editUserAndPassword } from "../../data/users/editUserAndPassword";
import { getUserByEmail } from "../../data/users/getUserByEmail";
import { getUserById } from "../../data/users/getUserById";
import { getUserByNickname } from "../../data/users/getUserByNickname";
import { getUserByPhone } from "../../data/users/getUserByPhone";
import { authentication, profileEditDTO } from "../../model/users";
import { generateToken, getTokenData } from "../../services/authenticator";
import { compare, hash } from "../../services/hashManager";


export const profileEditBusiness = async (input: profileEditDTO) : Promise<authentication> => {

    try {

        const token = getTokenData(input.token)

        if (!input.nickname || !input.email || !input.phone) {

            throw new Error("Você deve fornecer: 'nickname', 'email' e 'phone'")
        }

        const user = await getUserById(token.id)

        const checkNickname = await getUserByNickname(input.nickname)
        if (checkNickname && checkNickname.id !== user.id) {

            throw new Error("'nickname' inválido")
        }

        const checkEmail = await getUserByEmail(input.email)
        if (checkEmail && checkEmail.id !== user.id) {

            throw new Error("'email' inválido")
        }

        const checkPhone = await getUserByPhone(input.phone)
        if (checkPhone && checkPhone.id !== user.id) {

            throw new Error("'phone' inválido")
        }

        if (input.newPassword) {

            if (!input.password) {

                throw new Error("Para alterar a senha é necessário fornecer a senha atual")
            }

            if (!await compare(input.password , user.password)) {

                throw new Error("Senha inválida")
            }

            if (input.newPassword.length < 6) {

                throw new Error("O campo 'newPassword' deve ter no mínimo 6 caracteres")
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
                email: input.email
            },
            token: generateToken({ id: user.id, role: user.role })
        }

        return response
    }
    catch (error) {

        throw new Error(error.message)
    }
}