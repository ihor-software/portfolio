import { Injectable } from '@nestjs/common';
import { MessageHandler } from './message-handler.interface';
import { MailService } from '../mail.service';

@Injectable()
export class RegisterConfirmationHandler implements MessageHandler {
  constructor(private readonly mailService: MailService) {}

  handle(message: any): void {
    this.mailService.sendRegisterConfirmationMail(
      message.email,
      message.firstName,
      message.lastName,
      message.token,
    );
  }
}
