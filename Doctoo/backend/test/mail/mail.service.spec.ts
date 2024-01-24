import { Test, TestingModule } from '@nestjs/testing';
import { getTestMessageUrl } from 'nodemailer';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

describe('MailModule', () => {
  let module: TestingModule;
  let mailService: MailService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [MailModule],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
