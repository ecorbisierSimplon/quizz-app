import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
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
          useClass: Repository, // Utilisez la classe Repository pour le mock
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

      
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue({
        getCount: () => Promise.resolve(1),
      } as unknown as SelectQueryBuilder<User>);

      const user: CreateUserDto = {
        sur_name: 'Test',
        first_name: 'User',
        role: 1,
        email: 'test@example.com',
        password: 'password',
        password_validation: 'password',

        password_first: 'password',
      };
      await expect(service.register(user)).rejects.toThrow('The email already exists!');
    });

    it('should throw an error if passwords do not match', async () => {
      
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue({
        getCount: () => Promise.resolve(0),
      } as unknown as SelectQueryBuilder<User>);

      const user: CreateUserDto = {
        sur_name: 'Test',
        first_name: 'User',
        role: 1,
        email: 'newuser@example.com',
        password: 'password',
        password_validation: 'differentpassword', 
        password_first: 'password',
      };
      
      await expect(service.register(user)).rejects.toThrow('1st login password or email are incorrect!');
    });
  });

});

