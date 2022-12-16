import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { SendNotification } from "./send-notification"


describe('Send notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const sendNotification = new SendNotification(notificationsRepository)

        const {notification} = await sendNotification.execute({
            category: 'friend',
            content: 'This is a notification',
            recipientId: '123'
        })
        expect(notificationsRepository.notifications).toHaveLength(1)
        expect(notificationsRepository.notifications[0]).toEqual(notification)
    })
})