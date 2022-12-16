import { Module } from '@nestjs/common';
import { NotificationsController } from './infra/http/controller/notifications.controller';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { HttpModule } from './infra/http.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule]
})
export class AppModule {}
