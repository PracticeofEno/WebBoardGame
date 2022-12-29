import { User } from '../entity/user.entityt2'
export class UserRepository {
    private array: User[] = new Array();
    id_count = 0;

    constructor(

    ) { }
    

    findByNickname(name: string) {
        const found = this.array.find((element: User) => element.nickname === name);
        return found;
    }

    addUser(nickname: string, password :string) {
        let tmp = new User();
        tmp.id = this.id_count++;
        tmp.nickname = nickname;
        this.array.push(tmp);
        console.log(tmp);
        return "201";
    }
}