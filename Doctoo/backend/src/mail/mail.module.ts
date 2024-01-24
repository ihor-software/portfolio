import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import path, { join, resolve } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST,
          secure: false,
          port: +process.env.MAIL_PORT,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: process.env.MAIL_FROM,
        },
        template: {
          dir: join(__dirname, './templates/'),
          adapter: new HandlebarsAdapter(),
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
