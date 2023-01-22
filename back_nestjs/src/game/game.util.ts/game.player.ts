import { Socket } from 'socket.io';

export class SubmitCardDto {
	kind: string
	count: number
}


export class Player {
    tiger: number
    fox: number;
    rabbit: number;
    gam: number;
    drop: Boolean
    one: number;
    five: number;
    ten: number;
	socket: Socket;
	token: number;
	submit_card: number;
	nickname: string;
	avatar: string;

    
    constructor() {
        this.tiger = 1;
        this.fox = 3;
        this.rabbit = 4;
        this.gam = 2;
        this.drop = true;
        this.one = 10;
        this.five = 5;
        this.ten = 3;
		this.token = 50;
		this.nickname="default nickname";
		this.avatar="/api/images/avatar/1";
    }

	isCardEmpty() : Boolean {
		if ((this.tiger + this.fox + this.rabbit + this.gam) == 0)
			return true;
		return false;
	}

	isTokenEmpty() : Boolean {
		if (this.token <= 0)
			return true;
		return false;
	}

	setCard(kind: string) : Boolean{
		let myCount = this["" + kind];
		console.log(`myCount = ${myCount}`);
		if (myCount == 0) {
			return false;
		}
		else {
			this["" + kind] = myCount - 1;
		}
		return true;
	}

	decreaseToken(count: number) : Boolean{
		if (this.token >= count) {
			this.token = this.token - count;
			return true;
		}
		return false;
	}

	increaseToken(count: number) {
		this.token = this.token + count;
	}
}
