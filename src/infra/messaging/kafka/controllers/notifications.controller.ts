import { SendNotification } from "@application/use-cases/send-notification";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

interface SendNotificationPayload {
    category:string    
    content:string    
    recipientId:string    
}

@Controller()
export class NotificationsController {

    constructor(
        private sendNotification: SendNotification
    ){}
    
    @EventPattern('notifications.send-notification')
    async handleSendNotification(@Payload() {category, content, recipientId}:SendNotificationPayload){
        this.sendNotification.execute({
            category,
            content,
            recipientId
        })
    }
}