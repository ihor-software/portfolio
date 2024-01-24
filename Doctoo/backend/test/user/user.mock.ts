import { CreateUserDto, User } from 'src/user';

export const testUserInput: CreateUserDto = {
  first_name: 'Ivan',
  last_name: 'ivanovich',
  email: 'ivanovichgw@mail.com',
  phone_number: '+380957777330',
  gender_cd: 'male',
  role_cd: 'patient',
  is_confirmed: true,
  password: '123456789',
  password_confirmation: '123456789',
  isRegisteredWithGoogle: false,
};

export class UserMock {
  private user: Partial<User>;

  constructor(partial?: Partial<User>) {
    this.user = partial || {};
  }

  public reload: jest.Mock = jest.fn().mockResolvedValue(this);
  public destroy: jest.Mock = jest.fn().mockResolvedValue(null);
}
