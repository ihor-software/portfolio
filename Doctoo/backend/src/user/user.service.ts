import { HttpException, HttpStatus, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserSettings } from './entities';

import * as bcrypt from 'bcryptjs';
import { PaymentService } from 'src/payment';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserSettings) private settingRepository: typeof UserSettings,
    private paymentService: PaymentService,
  ) {}

  private readonly logger = new Logger(UserService.name);

  checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  comparePassword(password: string, password_confirmation: string) {
    if (password !== password_confirmation) {
      this.logger.error('Password and password confirmation do not match', UserService.name);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Password and password confirmation do not match',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    this.comparePassword(createUserDto.password, createUserDto.password_confirmation);
    const stripeCustomer = await this.paymentService.createCustomer(
      `${createUserDto.first_name} ${createUserDto.last_name}`,
      createUserDto.email,
    );

    const createdUser = await (
      await this.userRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
        stripeCustomerId: stripeCustomer.id,
      })
    ).reload();

    this.logger.log(`User ${createdUser.id} created`);
    await this.settingRepository.create({ user_id: createdUser.id });
    return createdUser;
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getByPhoneNumber(phone_number: string) {
    const user = await this.userRepository.findOne({ where: { phone_number } });
    if (user) {
      return user;
    }
    return null;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.scope(null).findByPk(id);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    const [numberOfAffectedRows, [updatedUser]] = await this.userRepository.update(
      { ...updateUserDto },
      { where: { id }, returning: true },
    );

    if (numberOfAffectedRows > 0) {
      this.logger.log(`User ${id} updated`);
    }

    return await updatedUser.reload();
  }

  async remove(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    await user.destroy();

    this.logger.log(`User ${id} deleted`);
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken: string = await bcrypt.hash(refreshToken, 10);
    const user = await this.findOne(id);
    const userSettings = await this.settingRepository.findByPk(id);
    if (!userSettings.isTwoFactor) {
      await this.userRepository.update(
        {
          ...user,
          currentHashedRefreshToken,
        },
        { where: { id } },
      );
    }
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.findOne(id);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
