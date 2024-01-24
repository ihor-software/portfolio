import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import RequestWithUser from 'src/authentication/interface/requestWithUser.interface';
import { CreateChargeDto, AddCreditCardDto } from './dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('charge')
  @UseGuards(JwtAuthenticationGuard)
  async createCharge(@Body() charge: CreateChargeDto, @Req() request: RequestWithUser) {
    return await this.paymentService.charge(request.user.stripeCustomerId, charge.amount);
  }

  @Post('credit-card')
  @UseGuards(JwtAuthenticationGuard)
  async addCreditCard(@Body() creditCard: AddCreditCardDto, @Req() request: RequestWithUser) {
    return this.paymentService.addCreditCard(
      creditCard.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async listOfCards(@Req() request: RequestWithUser) {
    return this.paymentService.listCreditCards(request.user.stripeCustomerId);
  }

  @Delete(':paymentMethodId')
  @UseGuards(JwtAuthenticationGuard)
  async deleteCard(@Param('paymentMethodId') paymentMethodId: string) {
    return this.paymentService.deleteCard(paymentMethodId);
  }
}
