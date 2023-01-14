export class SubmitCardDto {
	kind: string
	count: number
}

export class Player {
    tiger: number
    fox: number;
    rabbit: number;
    gam: number;
    drop: Boolean;
	token: number;
	submit_card: number;
	nickname: string;
	
    constructor() {
        this.tiger = 1;
        this.fox = 3;
        this.rabbit = 4;
        this.gam = 2;
        this.drop = true;
		this.token = 50;
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
		if (myCount == 0) {
			return false;
		}
		else {
			this["" + kind] = myCount - 1;
		}
		return true;
	}

	setNickname(nickname: string) {
		this.nickname = nickname
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
