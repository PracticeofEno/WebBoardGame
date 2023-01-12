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
    
    constructor() {
        this.tiger = 1;
        this.fox = 3;
        this.rabbit = 4;
        this.gam = 2;
        this.drop = true;
        this.one = 10;
        this.five = 5;
        this.ten = 3;
    }

	isCardEmpty() : Boolean {
		if ((this.tiger + this.fox + this.rabbit + this.gam) == 0)
			return true;
		return false;
	}

	isTokenEmpty() : Boolean {
		if ((this.one + this.five + this.ten) <= 0)
			return true;
		return false;
	}

	isValid(kind: string, count: number = 1) : Boolean{
		let myCount = this["" + kind];
		if (myCount >= count) {
			return true;
		}
		return false;
	}

	decraseValue(kind: string, count: number = 1) : Boolean {
		let myCount = this["" + kind];
		if (myCount >= count) {
			console.log(this["" + kind]);
			this["" + kind] = myCount - count;
			console.log(this["" + kind]);
			return true;
		}
		return false;
	}

}
