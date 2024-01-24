import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import axios from 'axios';

@Injectable()
export class RabbitMQService {
  private channel: amqp.Channel;

  constructor() {
    this.connect();
  }

  async connect() {
    const url = 'http://rabbitmq:15672/api/vhosts/email';
    const headers = {
      'Content-Type': 'application/json',
    };
    const auth = {
      username: 'guest',
      password: 'guest',
    };
    let isConnected = false;
    while (!isConnected) {
      try {
        const response = await axios.put(url, {}, { headers, auth });
        isConnected = true;
        console.log('connected');
      } catch (error) {
        console.log(error);
      }
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    await axios.put(
      'http://rabbitmq:15672/api/permissions/email/guest',
      { configure: '.*', write: '.*', read: '.*' },
      { headers, auth },
    );

    const connection = await amqp.connect('amqp://rabbitmq/email');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue('messages');
  }

  async consumeMessages(callback: (message: string) => void) {
    await this.channel.consume('messages', (msg) => {
      if (msg !== null) {
        callback(msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }
}
