import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { CountRecipientNotifications } from "./count-recipient-notifications"


describe('Count recipients notifications', () => {
    it('should be able to count notifications by recipientId', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository)

        await notificationsRepository.create(makeNotification({recipientId:'recipient-1'}));
        await notificationsRepository.create(makeNotification({recipientId:'recipient-1'}));
        await notificationsRepository.create(makeNotification({recipientId:'recipient-2'}));
        
        const {count:recipient1} = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });
        const {count:recipient2} = await countRecipientNotifications.execute({
            recipientId: 'recipient-2'
        });
        const {count:recipient3} = await countRecipientNotifications.execute({
            recipientId: 'recipient-3'
        });

        expect(recipient1).toEqual(2)
        expect(recipient2).toEqual(1)
        expect(recipient3).toEqual(0)
    })

})