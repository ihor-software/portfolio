import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthenticationService } from './google-authentication.service';
import TokenVerificationDto from './DTO/token-verification.dto';

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
  constructor(private readonly googleAuthenticationService: GoogleAuthenticationService) {}

  @Post('sign-in')
  async authenticate(@Body() tokenData: TokenVerificationDto, @Req() request: Request) {
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.googleAuthenticationService.authenticate(tokenData.token);

    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return user;
  }

  @Post('sign-up')
  async signup(@Body() tokenData: TokenVerificationDto) {
    return await this.googleAuthenticationService.signup(tokenData.token);
  }
}
