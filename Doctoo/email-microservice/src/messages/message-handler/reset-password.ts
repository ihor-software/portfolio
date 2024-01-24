import { Injectable } from '@nestjs/common';
import { MessageHandler } from './message-handler.interface';
import { MailService } from '../mail.service';

@Injectable()
export class ResetPasswordHandler implements MessageHandler {
  constructor(private readonly mailService: MailService) {}

  handle(message: any): void {
    this.mailService.sendResetConfirmationMail(message.email, message.token);
  }
}
