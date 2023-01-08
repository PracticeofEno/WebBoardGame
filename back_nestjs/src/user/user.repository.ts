import { NotFoundException, HttpException } from "@nestjs/common";
import { CustomRepository } from "../configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity"
import * as bcrypt from "bcrypt";

@CustomRepository(User)
export class UserRepository extends Repository<User> {

    async findByNickname(nickname: string) : Promise<User> {
        const found = await this.findOne({
            where: {
                nickname: nickname,
            },
        })
        return found;
    }

    async addUser(nickname:string, password:string) : Promise<User>{
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        let user = new User();
        user.nickname = nickname;
        user.password = password;
        user.win = 0; 
        user.lose = 0;
        user.status = 0;
        await this.save(user);
        return user;
    }
}
