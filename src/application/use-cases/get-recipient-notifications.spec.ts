import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { GetRecipientNotifications } from "./get-recipient-notifications"


describe('Get recipients notifications', () => {
    it('should be able to get notifications by recipientId', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository)

        await notificationsRepository.create(makeNotification({recipientId:'recipient-1'}));
        await notificationsRepository.create(makeNotification({recipientId:'recipient-1'}));
        await notificationsRepository.create(makeNotification({recipientId:'recipient-2'}));
        
        const {notifications:recipient1} = await getRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });
        const {notifications:recipient2} = await getRecipientNotifications.execute({
            recipientId: 'recipient-2'
        });
        const {notifications:recipient3} = await getRecipientNotifications.execute({
            recipientId: 'recipient-3'
        });

        expect(recipient1).toHaveLength(2)
        expect(recipient1).toEqual(
            expect.arrayContaining([
                expect.objectContaining({recipientId:'recipient-1'}),
                expect.objectContaining({recipientId:'recipient-1'})
            ])
        )

        expect(recipient2).toHaveLength(1)
        expect(recipient2).toEqual(
            expect.arrayContaining([
                expect.objectContaining({recipientId:'recipient-2'})
            ])
        )
        expect(recipient3).toHaveLength(0)
        expect(recipient2).toEqual(expect.arrayContaining([]))
    })

})