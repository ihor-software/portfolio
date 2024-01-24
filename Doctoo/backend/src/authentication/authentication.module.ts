import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule, UserSettingsModule } from '../user';

import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { GoogleAuthenticationService } from './google-authentication.service';
import { GoogleAuthenticationController } from './google-authentication.controller';
import { MailModule } from '../mail';
import { AuthenticationController } from './authentication.controller';
import { RabbitMQService } from './rabbitmq.service';
import { PatientModule } from 'src/patient';

@Module({
  imports: [
    MailModule,
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
    UserSettingsModule,
    PatientModule,
  ],
  providers: [
    AuthenticationService,
    GoogleAuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    RabbitMQService,
  ],
  controllers: [AuthenticationController, GoogleAuthenticationController],
})
export class AuthenticationModule {}
