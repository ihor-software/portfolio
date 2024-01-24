import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-08-16',
    });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({ name, email });
  }

  public async charge(customerId: string, amount: number) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        customer: customerId,
        currency: this.configService.get('STRIPE_CURRENCY'),
        automatic_payment_methods: { enabled: false },
        payment_method_types: ['card'],
      });

      return {
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  public async addCreditCard(paymentMethodId: string, customerId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethodId,
    });
  }

  public async listCreditCards(customerId: string) {
    const { data } = await this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    return data.map(el => ({ ...el.card, id: el.id }));
  }

  public async deleteCard(cardId: string) {
    const deleted = await this.stripe.paymentMethods.detach(cardId);
    return deleted;
  }
}
