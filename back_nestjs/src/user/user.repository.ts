import { NotFoundException, HttpException } from "@nestjs/common";
import { CustomRepository } from "../configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity"
import * as bcrypt from "bcrypt";

@CustomRepository(User)
export class UserRepository extends Repository<User> {

	async findById(id: number): Promise<User> {
		const found = await this.findOne({
			where: {
				id: id,
			},
		})
		return found;
	}

	async findByUserId(user_id: string): Promise<User> {
		const found = await this.findOne({
			where: {
				user_id: user_id,
			},
		})
		return found;
	}

	async findByNickname(nickname: string): Promise<User> {
		const found = await this.findOne({
			where: {
				nickname: nickname,
			},
		})
		return found;
	}

	async addUser(user_id: string, password: string): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hash = await bcrypt.hash(password, salt);
		let user = new User();
		user.nickname = "";
		user.password = hash;
		user.user_id = user_id;
		user.win = 0;
		user.lose = 0;
		user.status = 0;
		await this.save(user);
		return user;
	}

	async updateNickname(id: number, nickname: string): Promise<User | null> {
		let user = await this.findByNickname(nickname);
		let tmp = await this.findById(id);
		if (user == null) {
			tmp.nickname = nickname;
			await this.update(id, tmp);
			return tmp;
		}
		else {
			return null;
		}
	}
}
