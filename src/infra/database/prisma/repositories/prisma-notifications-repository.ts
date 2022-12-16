import { Notification } from "@application/entities/notification/notification";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";


@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {

    constructor(private prisma: PrismaService) { }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return await this.prisma.notification.count({
            where: {
                recipientId
            }
        })
    }
    
    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId
            }
        })

        return notifications.map(PrismaNotificationMapper.toDomain)
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })
        if (!notification) return null;
        return PrismaNotificationMapper.toDomain(notification)
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)
        await this.prisma.notification.create({
            data: raw
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)
        await this.prisma.notification.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }

}