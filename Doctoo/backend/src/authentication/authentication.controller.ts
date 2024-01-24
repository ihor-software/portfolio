import {
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  Delete,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';
import RequestWithUser from './interface/requestWithUser.interface';
import JwtAuthenticationGuard from './guard/jwt-authentication.guard';
import { CreateUserDto, UserService } from '../user';
import JwtRefreshGuard from './guard/jwt-refresh.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './DTO/forgot-password.dto';
import { ResetPasswordDto } from './DTO/reset-password.dto';
import { Request, Response } from 'express';
import { UserSettingsService } from 'src/user/user-settings';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private userSettingsService: UserSettingsService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const { isTwoFactor } = await this.userSettingsService.getUserSettings(user.id);
    return isTwoFactor
      ? { message: 'Verify your identity first', id: user.id }
      : await this.authenticationService.logIn(request, user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    user.twoFactorAuthenticationSecret = undefined;
    const settings = await this.userSettingsService.getUserSettings(user.id);
    return { user, settings };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @ApiCreatedResponse({ description: 'Confirmation link was send to email to confirm user' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authenticationService.signup(createUserDto);
    return { message: 'Activation link was send to your email', user };
  }

  @ApiCreatedResponse({ description: 'User registration was confirmed successfully' })
  @Post('verify/:token')
  async verifyRegistration(@Param('token') token: string) {
    await this.authenticationService.verifyRegistration(token);
    return { message: 'Registration successfully completed' };
  }

  @ApiOkResponse({ description: 'Email with resetting confirmation was sended' })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    this.authenticationService.forgotPassword(forgotPasswordDto);
    return { message: 'Email with resetting confirmation was sended' };
  }

  @ApiOkResponse({ description: 'Email with resetting confirmation was sended' })
  @Post('reset-password/:token')
  resetPassword(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authenticationService.resetPassword(resetPasswordDto, token);
  }

  @ApiOkResponse({ description: 'User logged out' })
  @Delete('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    response.clearCookie('Refresh');
    return { message: 'Successful logout' };
  }

  @Post('2fa')
  @UseGuards(JwtAuthenticationGuard)
  async toggleTwoFactorAuthentication(@Req() request, @Body() body) {
    const isCodeValid = this.userSettingsService.isTwoFactorAuthenticationCodeValid(
      body.twoFACode,
      request.user.id,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const userSettings = await this.userSettingsService.getUserSettings(request.user.id);
    const updatesSettings = await this.userSettingsService.update(request.user.id, {
      isTwoFactor: !userSettings.isTwoFactor,
    });

    return updatesSettings;
  }

  @Post('2fa/generate')
  @UseGuards(LocalAuthenticationGuard)
  async generateOTPCode(@Req() request: RequestWithUser) {
    return this.userSettingsService.generateTwoFactorAuthenticationSecret(request.user);
  }

  @Post('2fa/verify')
  async verifyTwoOtp(@Req() request: Request, @Body() verifyOtpDto: { otp: string; id: number }) {
    const isCodeValid = await this.userSettingsService.isTwoFactorAuthenticationCodeValid(
      verifyOtpDto.otp,
      verifyOtpDto.id,
    );

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    return await this.authenticationService.logIn(request, verifyOtpDto.id);
  }
}
