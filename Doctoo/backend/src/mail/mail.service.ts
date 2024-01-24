import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user';
import { currentFrontendHost } from 'src/utils/hostUtils';

import * as bcrypt from 'bcryptjs';

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

  async sendRegisterConfirmationMail(createUserDto: CreateUserDto, token: string) {
    //check if user exist
    //generate  veryfication token
    const result = await this.mailerService.sendMail({
      to: createUserDto.email,
      subject: 'Email message for confirm registration',
      template: 'registrationConfirm',
      context: {
        firstName: createUserDto.first_name,
        lastName: createUserDto.last_name,
        verificationLink: `${currentFrontendHost()}/verify/${token}`,
      },
    });
    console.log(result);
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
