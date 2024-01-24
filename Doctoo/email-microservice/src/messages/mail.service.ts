import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { currentFrontendHost } from 'src/utils/hostUtils';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(reciever: string) {
    console.log(reciever);
    const result = await this.mailerService.sendMail({
      to: reciever,
      subject: 'Test email message',
      html: '<h1>hello!</h1>',
    });
    console.log(result);
    return result;
  }

  async sendRegisterConfirmationMail(
    email: string,
    firstName: string,
    lastName: string,
    token: string,
  ) {
    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'Email message for confirm registration',
      template: 'registrationConfirm',
      context: {
        firstName: firstName,
        lastName: lastName,
        verificationLink: `${currentFrontendHost()}/verify/${token}`,
      },
    });
    return result;
  }

  async sendResetConfirmationMail(email: string, token: string) {
    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'Email message for confirm reseting password',
      template: 'resettingConfirm',
      context: {
        resettingLink: `${currentFrontendHost()}/reset-password/${token}`,
      },
    });
    return result;
  }
}
