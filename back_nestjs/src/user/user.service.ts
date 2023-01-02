import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

export type User = any;

@Injectable()
export class UserService {
    private userRepository : UserRepository = new UserRepository();

    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];

    constructor(
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }

    login(nickname: string, password :string) {
        return this.userRepository.findByNickname(nickname);
    }

    addUser(nickname: string, password :string) {
        return this.userRepository.addUser(nickname, password);
    }
}
