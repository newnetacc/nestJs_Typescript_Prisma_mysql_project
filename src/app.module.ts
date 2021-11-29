import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiClientModule } from './api-client/api-client.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

// uncomment this when other apis have been added
// import { ParseService } from './parse/parse.service';

import { UserModule } from './user/user.module';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceService } from './invoice/invoice.service';
import { UserMiddleware } from 'common/middleware/user.middleware';
import { IsClient } from 'common/middleware/is-client';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    ApiClientModule,
    UserModule,
    InvoiceModule, TasksModule
  ],
  controllers: [AppController, InvoiceController],
  providers: [AppService, InvoiceService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsClient).forRoutes('invoice/create', 'invoice/decode', 'invoice/check', 'invoice/pay', 'user');
    consumer.apply(UserMiddleware).forRoutes('invoice/create', 'invoice/pay', 'user');
  }
}
