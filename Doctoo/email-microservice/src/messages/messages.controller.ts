import { Controller } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { MailService } from './mail.service';
import { MessageFactory } from './message-handler/message-factory';
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private mailService: MailService,
    private readonly messageFactory: MessageFactory,
  ) {
    this.rabbitMQService.connect().then(() => {
      this.rabbitMQService.consumeMessages(this.handleMessage.bind(this));
    });
  }

  async handleMessage(message: string) {
    try {
      const messageJSON = JSON.parse(message);
      console.log(messageJSON);
      const messageType = messageJSON.type;
      const handler = this.messageFactory.getHandler(messageType);

      handler.handle(messageJSON);
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }
}
