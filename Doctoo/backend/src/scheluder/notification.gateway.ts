import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AppGateway.name);

  notifyNewNotification() {
    this.logger.log('new notification');
    this.server.emit('newNotification');
  }
}
