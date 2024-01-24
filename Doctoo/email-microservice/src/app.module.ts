import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';
import { RabbitMQService } from './messages/rabbitmq.service';
import { MailModule } from './messages/mail.module';
import { MessageFactory } from './messages/message-handler/message-factory';
import { RegisterConfirmationHandler } from './messages/message-handler/register-handler';
import { ResetPasswordHandler } from './messages/message-handler/reset-password';

@Module({
  imports: [MailModule],
  controllers: [MessagesController],
  providers: [
    RabbitMQService,
    MessageFactory,
    RegisterConfirmationHandler,
    ResetPasswordHandler,
  ],
})
export class AppModule {}
