import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { User, UserService, UserSettings } from 'src/user';
import { testUserInput, UserMock } from './user.mock';
import { PaymentModule, PaymentService } from 'src/payment';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PaymentModule],
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn(),
            update: jest.fn(() => [1]),
            destroy: jest.fn(),
            scope: jest.fn(() => ({
              findByPk: jest.fn().mockResolvedValue(new UserMock(testUserInput) as any),
            })),
            reload: jest.fn(),
          },
        },
        {
          provide: User,
          useValue: UserMock,
        },
        {
          provide: getModelToken(UserSettings),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: PaymentService,
          useValue: {
            createCustomer: jest.fn(() => 'secret'),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepositoryMock = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = testUserInput;

      const createdUser = {
        ...createUserDto,
        password: 'hashedPassword',
        id: 1,
        stripeCustomerId: 'secret',
      };
      jest.spyOn(userRepositoryMock, 'create').mockResolvedValueOnce(new UserMock(createdUser));

      const result = await userService.create(createUserDto);

      expect(result['user']).toEqual(createdUser);
    });

    it('should throw an error if password and password confirmation do not match', async () => {
      const createUserDto = {
        ...testUserInput,
        password_confirmation: 'wrongPassword',
      };

      await expect(userService.create(createUserDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = testUserInput;

      jest.spyOn(userRepositoryMock, 'findAll').mockResolvedValueOnce([new UserMock(users) as any]);

      const result = await userService.findAll();

      expect(result).toBeInstanceOf(Array);
      expect(result[0]['user']).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = testUserInput;

      jest.spyOn(userRepositoryMock, 'findByPk').mockResolvedValueOnce(new UserMock(user) as any);

      const result = await userService.findOne(1);

      expect(result['user']).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepositoryMock, 'findByPk').mockResolvedValueOnce(null);

      await expect(userService.findOne(1)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const user = testUserInput;

      jest.spyOn(userRepositoryMock, 'findByPk').mockResolvedValueOnce(new UserMock(user) as any);
      jest.spyOn(User.prototype, 'destroy').mockResolvedValueOnce(undefined);

      const result = await userService.remove(1);

      expect(result).toEqual(undefined);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(userRepositoryMock, 'findByPk').mockResolvedValueOnce(null);

      await expect(userService.remove(1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        ...testUserInput,
        password: 'newPassword',
        password_confirmation: 'newPassword',
      };

      const userToUpdate = new UserMock({ ...testUserInput, id: 1 });

      jest.spyOn(userRepositoryMock, 'findByPk').mockResolvedValueOnce(userToUpdate as any);
      jest.spyOn(userService, 'checkPassword').mockResolvedValue(true);

      const updatedUser = new UserMock({ ...userToUpdate, ...updateUserDto });
      jest.spyOn(userRepositoryMock, 'update').mockResolvedValue([1, [updatedUser]] as any);

      const result = await userService.update(1, updateUserDto);

      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if user not found', async () => {
      const updateUserDto = {
        ...testUserInput,
        password: 'newPassword',
        password_confirmation: 'newPassword',
      };

      jest.spyOn(userRepositoryMock, 'findByPk').mockResolvedValueOnce(null);

      await expect(userService.update(1, updateUserDto)).rejects.toThrowError();
    });

    it('should throw an error if password and password confirmation do not match', async () => {
      const updateUserDto = {
        ...testUserInput,
        password: 'newPassword',
        password_confirmation: 'wrongPassword',
      };

      jest
        .spyOn(userRepositoryMock, 'findByPk')
        .mockResolvedValueOnce(new UserMock(testUserInput) as any);

      await expect(userService.update(1, updateUserDto)).rejects.toThrowError();
    });
  });
});
