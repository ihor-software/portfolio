import { Injectable } from '@nestjs/common';
import { MessageHandler } from './message-handler.interface';
import { RegisterConfirmationHandler } from './register-handler';
import { ResetPasswordHandler } from './reset-password';

@Injectable()
export class MessageFactory {
  private handlers: { [key: string]: MessageHandler } = {};

  constructor(
    private readonly registerConfirmationHandler: RegisterConfirmationHandler,
    private readonly resetPasswordHandler: ResetPasswordHandler,
  ) {
    this.handlers['registerConfirmation'] = this.registerConfirmationHandler;
    this.handlers['reset'] = this.resetPasswordHandler;
  }

  getHandler(type: string): MessageHandler {
    const handler = this.handlers[type];
    if (!handler) {
      throw new Error(`Unsupported message type: ${type}`);
    }
    return handler;
  }
}
