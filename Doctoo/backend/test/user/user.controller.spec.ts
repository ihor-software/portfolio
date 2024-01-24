import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/user';
import { UserService } from 'src/user';
import { UpdateUserDto } from 'src/user';

import { testUserInput } from './user.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createdUser = {
        ...testUserInput,
        password: 'hashedPassword',
      };

      userService.create = jest.fn().mockResolvedValue(createdUser);

      const result = await userController.create(testUserInput);
      expect(result).toBe(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [testUserInput];
      userService.findAll = jest.fn().mockResolvedValue(users);

      const result = await userController.findAll();
      expect(result).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const expectedUser = {
        ...testUserInput,
        password: 'hashedPassword',
        id: 1,
      };
      userService.findOne = jest.fn().mockResolvedValue(expectedUser);

      const result = await userController.findOne(expectedUser.id);
      expect(result).toBe(expectedUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const initialUser = {
        ...testUserInput,
        id: 1,
      };

      const updatedUser = {
        ...initialUser,
        email: 'updated@mail.com',
      };

      userService.update = jest.fn().mockResolvedValue(updatedUser);

      const result = await userController.update(initialUser.id, {
        ...updatedUser,
      } as UpdateUserDto);

      expect(result).toBe(updatedUser);
      expect(userService.update).toHaveBeenCalledWith(initialUser.id, updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const user = {
        ...testUserInput,
        id: 1,
      };

      userService.remove = jest.fn().mockResolvedValue(null);

      await userController.remove(user.id);
      expect(userService.remove).toHaveBeenCalledWith(user.id);
    });
  });
});
