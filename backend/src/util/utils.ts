export const generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
}

export enum GAME_STATE{
	READY,            //입장 단계
	FIRST_CARD_SELECT,        //선턴 플레이어 카드 제출단계
	FIRST_MONEY_SELECT,       // 후턴 플레이어 카드 제출 단계
	SECOND_CARD_SELECT,     // 후턴 플레이어 선택 단계 (승부 포기 따당)
	SECOND_CHOICE,
	THIRD_CHOICE_SELECT       // 따당시
}