import { getNotificationsByReceiverId } from "../../data/notifications/getNotificationsByReceiverId"
import { getUserById } from "../../data/users/getUserById"
import { currentNotificationsDTO } from "../../model/notifications/currentNotificationsModels"
import { notification } from "../../model/notifications/globalModels"
import { getTokenData } from "../../services/authenticator"


export const currentNotificationsBusiness = async (input: currentNotificationsDTO) : Promise<notification[]> => {

    try {

        const token = getTokenData(input.token)

        const user = await getUserById(token.id)

        if (!user) {

            throw new Error("Token inválido")
        }

        const allNotifications = await getNotificationsByReceiverId(token.id)

        const currentNotifcations = allNotifications.filter(notification => !notification.viewed)

        return currentNotifcations
    }
    catch (error) {

        throw new Error(error.message)
    }
}
