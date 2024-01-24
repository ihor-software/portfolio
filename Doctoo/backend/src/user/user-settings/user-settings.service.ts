import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserSettings } from '../entities';
import { UpdateSettingsDto } from '../dto';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectModel(UserSettings) private settingsRepository: typeof UserSettings,
    @InjectModel(User) private userRepository: typeof User,
    private readonly configService: ConfigService,
  ) {}

  private async findUser(param: string, value: string | number) {
    const user = await this.userRepository.findOne({ where: { [param]: value } });

    if (!user.is_confirmed) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserSettings(id: number): Promise<UserSettings> {
    const user = await this.settingsRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    user_id: number,
    updateSettingsDto: UpdateSettingsDto,
  ): Promise<UserSettings | void> {
    const userConfigs = await this.getUserSettings(user_id);
    if (!userConfigs) return;

    const [rows, [updatedConfigs]] = await this.settingsRepository.update(updateSettingsDto, {
      where: { user_id },
      returning: true,
    });

    return updatedConfigs;
  }

  async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      user.email,
      this.configService.get('TWO_FA_APP_NAME'),
      secret,
    );
    await this.setTwoFactorAuthenticationSecret(secret, user.id);
    return {
      secret,
      otpauthUrl: await this.generateQrCodeDataURL(otpauthUrl),
    };
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return await this.userRepository.update(
      { twoFactorAuthenticationSecret: secret },
      { where: { id: userId }, returning: true },
    )[1];
  }

  async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, id: number) {
    const user = await this.userRepository.findByPk(id);

    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }
}
