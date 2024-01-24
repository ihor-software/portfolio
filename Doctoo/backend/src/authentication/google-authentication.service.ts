import { ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, Auth } from 'googleapis';
import { AuthenticationService } from './authentication.service';
import { User, UserService } from '../user';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { PatientService } from 'src/patient';

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
    private readonly patientService: PatientService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');
    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    try {
      const user = await this.userService.getByEmail(email);
      return await this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
    }
  }

  async getCookiesForUser(user: User) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessTokenCookie,
      refreshTokenCookie,
    };
  }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException();
    }

    const { accessTokenCookie, refreshTokenCookie } = await this.getCookiesForUser(user);

    return {
      accessTokenCookie,
      refreshTokenCookie,
      user,
    };
  }

  async signup(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    );

    if (userInfo.status !== HttpStatus.OK) {
      throw new ConflictException('Sign up user confirmation error!');
    }

    let user;
    try {
      user = await this.userService.getByEmail(tokenInfo.email);
    } catch (ignored) {}

    if (user) {
      throw new ConflictException('User with such email already exists!');
    }

    const password = randomUUID(); // It won't be used by user so we don't need to know its value

    const createdUser = await this.userService.create({
      first_name: userInfo.data.given_name,
      last_name: userInfo.data.family_name,
      email: tokenInfo.email,
      phone_number: `+${380000000000 + Math.floor(Math.random() * 999999999)}`,
      is_confirmed: true,
      password: password,
      password_confirmation: password,
      role_cd: 'patient',
      gender_cd: 'male',
      isRegisteredWithGoogle: true,
      avatar: userInfo.data.picture,
    });

    const createPatient = await this.patientService.create({ user_id: createdUser.id });

    return createdUser;
  }
}
