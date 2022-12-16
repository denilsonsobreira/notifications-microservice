import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';


@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private cancelNotification: CancelNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification
  ) { }

  @Get(':id/count')
  async countFromRecipient(@Param('id') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })
    return { count }
  }

  @Get(':id')
  async getFromRecipient(@Param('id') recipientId: string) {
    return this.getRecipientNotifications.execute({
      recipientId
    })
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    await this.readNotification.execute({
      notificationId
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    await this.unreadNotification.execute({
      notificationId
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId
    })

    return { notification: NotificationViewModel.toHTTP(notification) }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    await this.cancelNotification.execute({
      notificationId
    })
  }


}
