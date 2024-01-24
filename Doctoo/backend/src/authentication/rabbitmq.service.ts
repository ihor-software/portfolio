import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private channel: amqp.Channel;

  constructor() {
    this.connect();
  }

  async connect() {
    let isConnected = false;
    while (!isConnected) {
      try {
        const connection = await amqp.connect('amqp://rabbitmq/email');
        this.channel = await connection.createChannel();
        isConnected = true;
        console.log('success');
      } catch (error) {}
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    await this.channel.assertQueue('messages');
  }

  async sendMessage(message: any) {
    const messageJson = JSON.stringify(message);
    this.channel.sendToQueue('messages', Buffer.from(messageJson));
  }
}
