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

    async findByUserId(user_id: string) : Promise<User>{
      const found = await this.userRepository.findByUserId(user_id);
      if (!found)
        throw new HttpException("Not exist user_id", 404);
      return found
    }

	async findById(id: number) : Promise<User>{
		const found = await this.userRepository.findById(id);
		if (!found)
		  throw new HttpException("Not exist id", 404);
		return found
	  }

	async findByNickname(nickname: string) : Promise<User>{
		const found = await this.userRepository.findByNickname(nickname);
		if (!found)
		  throw new HttpException("Not exist Nickname", 404);
		return found
	  }

    async addUser(id2:string, password:string) : Promise<User> {
      const found = await this.userRepository.findByUserId(id2);
      if (found)
        throw new HttpException("Duplicate Nickname", 409);
      return await this.userRepository.addUser(id2, password);
    }

	async updateNickname(id: number, nickname: string) {
		let result = await this.userRepository.updateNickname(id, nickname);
		if (result == null) {
			throw new HttpException("exist nickname", 409);
		}
		else {
			return result;
		}
	}
}
