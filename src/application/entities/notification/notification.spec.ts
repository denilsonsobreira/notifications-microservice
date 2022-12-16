import { Content } from "./content";
import { Notification } from "./notification";

describe('Notification', () => {

    it('should be able to create a notification', () => {
        const notification = new Notification({
            category: 'Social',
            content: new Content('content of notification'),
            recipientId: 'recipient id'

        })
        expect(notification).toBeTruthy();
    });



})