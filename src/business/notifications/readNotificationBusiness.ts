import { getNotificationById } from "../../data/notifications/getNotificationById"
import { readNotification } from "../../data/notifications/readNotification"
import { getUserById } from "../../data/users/getUserById"
import { readNotificationDTO } from "../../model/notifications/readNotificationModels"
import { getTokenData } from "../../services/authenticator"


export const readNotificationBusiness = async (input: readNotificationDTO) : Promise<void> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        const notification = await getNotificationById(input.id)

        if (!notification || notification.viewed) {

            throw new Error("Notificação não encontrada")
        }

        if (notification.receiverId !== user.id) {

            throw new Error("Você não pode ler a notificação de outra pessoa")
        }

        await readNotification(notification.id)
    }
    catch (error) {

        throw new Error(error.message)
    }
}
