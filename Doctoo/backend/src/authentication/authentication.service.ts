import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, User, UserService } from '../user';
import * as bcrypt from 'bcryptjs';
import { MailService } from '../mail';
import { ForgotPasswordDto } from './DTO/forgot-password.dto';
import { ResetPasswordDto } from './DTO/reset-password.dto';
import { Request } from 'express';
import { UserSettingsService } from 'src/user/user-settings';
import { PatientService } from 'src/patient';
import { RabbitMQService } from './rabbitmq.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    private settingsService: UserSettingsService,
    private readonly rabbitMQService: RabbitMQService,
    private patientService: PatientService,
  ) {}

  public async signup(createUserDto: CreateUserDto) {
    try {
      //check if confirmed user already exist
      const userByPhone = await this.userService.getByPhoneNumber(createUserDto.phone_number);
      if (userByPhone && userByPhone.phone_number === createUserDto.phone_number) {
        throw new BadRequestException('user with this phone number already exist');
      }
      const userByEmail = await this.userService.getByEmail(createUserDto.email);
      if (userByEmail.email === createUserDto.email) {
        throw new BadRequestException('user with this email already exist');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof HttpException) {
        const user = await this.userService.create(createUserDto);
        await this.patientService.create({ user_id: user.id });
        this.sendActivationMail(createUserDto);
        return user;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async sendActivationMail(createUserDto) {
    const token = await this.createEmailToken(createUserDto.email);
    const message = {
      type: 'registerConfirmation',
      email: createUserDto.email,
      firstName: createUserDto.first_name,
      lastName: createUserDto.last_name,
      token: token,
    };
    return await this.rabbitMQService.sendMessage(message);
  }

  public async verifyRegistration(token) {
    try {
      const verifiedToken = await this.jwtService.verifyAsync(token);
      const userToConfirm = await this.userService.getByEmail(verifiedToken.email);
      userToConfirm.is_confirmed = true;
      await userToConfirm.save();
      return;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Activation link lifetime was expired', HttpStatus.BAD_REQUEST);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createEmailToken(email: string) {
    const token = await this.jwtService.signAsync({ email }, { expiresIn: '1d' });
    return token;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  private async sendResettingMail(email: string) {
    const token = await this.createEmailToken(email);
    const message = {
      type: 'reset',
      email: email,
      token: token,
    };
    return await this.rabbitMQService.sendMessage(message);
  }

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.getByEmail(forgotPasswordDto.email);
    if (!user) throw new BadRequestException('User with this email does not exist');
    this.sendResettingMail(forgotPasswordDto.email);
  }

  public async resetPassword(resetPasswordDto: ResetPasswordDto, token: string) {
    try {
      const verifiedToken = await this.jwtService.verifyAsync(token);
      const user = await this.userService.getByEmail(verifiedToken.email);
      this.userService.comparePassword(
        resetPasswordDto.password,
        resetPasswordDto.password_confirmation,
      );
      return this.userService.update(user.id, resetPasswordDto);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Resetting link lifetime was expired', HttpStatus.BAD_REQUEST);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async logIn(request: Request, id: number): Promise<User | { message: string }> {
    const user = await this.userService.findOne(id);

    const accessTokenCookie = this.getCookieWithJwtToken(user.id);
    const refreshTokenCookie = this.getCookieWithJwtRefreshToken(user.id);
    await this.userService.setCurrentRefreshToken(refreshTokenCookie.token, user.id);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);

    return user;
  }
}
