export class SubmitCardDto {
	kind: string
	count: number
}

export enum GAME_STATE{
	READY,            			//입장 단계
	FIRST_CARD_SELECT,          //선턴 플레이어 카드 제출단계
	FIRST_MONEY_SELECT,         // 후턴 플레이어 카드 제출 단계
	SECOND_CARD_SELECT,     	// 후턴 플레이어 선택 단계 (승부 포기 따당)
	SECOND_CHOICE,
	THIRD_CHOICE_SELECT         // 따당시
}

export class Player {
    tiger: number;
    fox: number;
    rabbit: number;
    gam: number;
    drop: Boolean;
	token: number;
	submit_card: string;
	nickname: string;
	avatar: string;
	submit_cards: Array<string>;

    constructor() {
        this.tiger = 1;
        this.fox = 3;
        this.rabbit = 4;
        this.gam = 2;
        this.drop = true;
		this.token = 50;
		this.avatar = "/api/images/avatar/1";
		this.nickname = "nickname";
		this.submit_cards = new Array<string>();
		this.submit_card = "";
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

	submitCard(name: string) {
		if (name == "호랑이")
			this.tiger--;
		else if (name == "여우")
			this.fox--;
		else if (name == "토끼")
			this.rabbit--;
		else if (name == "곶감")
			this.gam--;
	}
}
