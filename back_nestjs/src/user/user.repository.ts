import { User } from '../entity/user.entityt2'
export class UserRepository {
    private array: User[] = new Array();
    id_count = 0;

    constructor(

    ) { }
    

    findByNickname(name: string) {
        const found = this.array.find((element: User) => element.nickname === name);
        let ret = {...found};
        return ret;
    }

    addUser(nickname: string, password :string) {
        let tmp = new User();
        tmp.id = this.id_count++;
        tmp.nickname = nickname;
        tmp.password = password
        this.array.push(tmp);
        let ret = { ...tmp} 
        console.log(ret);
        return ret;
    }
}