import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw an error if email already exists', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(new User());
      const user: CreateUserDto = {
        sur_name: 'Test',
        first_name: 'User',
        role: 1,
        email: 'test@example.com',
        password: 'password',
        password_validation: 'password',
      };
      await expect(service.register(user)).rejects.toThrow('The email already exists.');
    });

    it('should throw an error if passwords do not match', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);
      const user: CreateUserDto = {
        sur_name: 'Test',
        first_name: 'User',
        role: 1,
        email: 'test@example.com',
        password: 'password',
        password_validation: 'differentPassword',
      };
      await expect(service.register(user)).rejects.toThrow("The password isn't identical !");
    });

    
  });

  describe('testLogin', () => {
    it('should return a user if email exists', async () => {
      const user = new User();
      user.email = 'test@example.com';
      jest.spyOn(repo, 'find').mockResolvedValue([user]);
      expect(await service.testLogin('test@example.com')).toEqual(user);
    });

    it('should return undefined if email does not exist', async () => {
      jest.spyOn(repo, 'find').mockResolvedValue([]);
      expect(await service.testLogin('test@example.com')).toBeUndefined();
    });
  });

  });