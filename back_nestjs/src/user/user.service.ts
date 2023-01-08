import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
    constructor(
      @InjectRepository(UserRepository)
      private userRepository: UserRepository
    ){}

    async findByNickname(nickname: string) : Promise<User>{
      const found = await this.userRepository.findByNickname(nickname);
      if (!found)
        throw new HttpException("Not exist Nickname", 400);
      return found
    }

    async addUser(nickname:string, password:string) : Promise<User> {
      const found = await this.userRepository.findByNickname(nickname);
      if (found)
        throw new HttpException("Duplicate Nickname", 400);
      return await this.userRepository.addUser(nickname, password);
    }
}
