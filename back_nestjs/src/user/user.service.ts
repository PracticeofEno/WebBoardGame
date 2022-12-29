import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    private userRepository : UserRepository = new UserRepository();


    constructor(
    ) {}

    login(nickname: string, password :string) {
        return this.userRepository.findByNickname(nickname);
    }

    addUser(nickname: string, password :string) {
        return this.userRepository.addUser(nickname, password);
    }
}
