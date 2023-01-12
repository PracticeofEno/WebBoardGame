import { Server, Socket } from "socket.io";
import { Player, SubmitCardDto } from "./game.player";
import { GAME_STATE } from "../../util/utils"
import { count } from "console";

export class GameData {

	constructor(room: string, gamAdventage: number = 10, wait: number = 8, max: number = 9, min: number = 3) {
		this.room = room;
		this.gamAdventage = gamAdventage;
		this.wait = wait;
		this.max = max;
		this.players = new Array<Player>();
		this.players.push(new Player());
		this.players.push(new Player());
		this.turn = 0;
		this.sockets = new Array<Socket>();
		this.host = null;
		this.min = min;
		this.roomState = 0;
		this.player1_token = 0;
		this.player2_token = 0;
	}

	room: string;
	sockets: Socket[];
	turn: number;
	gamAdventage: number;
	wait: number;
	max: number;
	min: number;
	players: Player[];
	host: Socket;
	roomState: number;
	player1_card: number;
	player2_card: number;
	player1_token: number;
	player2_token: number;

	ConvertCardNumber(kind: string): number {
		switch (kind) {
			case "gam":
				return 0;
			case "rabbit":
				return 1;
			case "fox":
				return 2;
			case "tiger":
				return 3;
		}
	}

	getMaxToken(): number {
		if (this.players[0].token > this.players[1].token) {
			return this.players[1].token;
		}
		return this.players[0].token;
	}

	getWinnerPlayerNumber(): number {
		if (this.player1_card == 3 && this.player2_card == 0) {
			return 1;
		}
		else if (this.player1_card == 0 && this.player2_card == 3) {
			return 0;
		}
		if (this.player1_card > this.player2_card)
			return 0;
		else if (this.player1_card < this.player2_card)
			return 1;
		else 
			return 2;
	}

	isEndGame() : Boolean{
		if (this.players[0].isCardEmpty() == true || this.players[1].isCardEmpty() == true || 
			this.players[0].isTokenEmpty() == true || this.players[1].isTokenEmpty() == true) {
				return true;
			}
		return false;
	}

	sendTurn() {
		this.sendMessage("turn", {
			turn : this.turn,
			state: this.roomState
		});
	}

	sendMessage(message_name: string, data: any) {
		for (let i = 0; i < this.sockets.length; i++) {
			this.sockets[i].emit(message_name, data);
		}
	}

	matchDraw() {
		this.players[0].increaseToken(this.player1_token);
		this.players[1].increaseToken(this.player2_token);
		this.player1_token = 0;
		this.player2_token = 0;
	}

	processBattle() {
		console.log("processBattle");
		console.log(this.player1_token);
		console.log(this.player2_token);
		if (this.player1_token > this.player2_token) {
			this.players[1].decreaseToken(this.player1_token - this.player2_token);
			console.log(this.player1_token - this.player2_token);
			console.log(this.player2_token + (this.player1_token - this.player2_token));
			this.player2_token = this.player2_token + (this.player1_token - this.player2_token);
			console.log(`player[2] submit token ${this.player1_token - this.player2_token}`);
		}
		else if (this.player1_token < this.player2_token) {
			this.players[0].decreaseToken(this.player2_token - this.player1_token);
			console.log(this.player2_token - this.player1_token);
			console.log(this.player1_token + (this.player2_token - this.player1_token));
			this.player1_token = this.player1_token + (this.player2_token - this.player1_token);
			console.log(`player[1] submit token ${this.player1_token - this.player2_token}`);
		}

		let winner = this.getWinnerPlayerNumber();
		let looser = (winner ? 0 : 1)
		let gamExist: Boolean = false;
		if ((this.player1_card == 0 && this.player2_card == 3) || (this.player1_card == 3 && this.player2_card == 0))
			gamExist = true;
		if (winner == 2) {
			console.log("match draw");
			this.sendMessage("draw", null);
			this.matchDraw();
		}
		else {
			if(gamExist) {
				this.players[winner].increaseToken(this.gamAdventage);
				this.players[looser].decreaseToken(this.gamAdventage);
				console.log(`gamExist`);
			}
			this.players[winner].increaseToken(this.player1_token);
			this.players[winner].increaseToken(this.player2_token);
			this.player1_token = 0;
			this.player2_token = 0;
			this.sendMessage("result", {
				winner: winner,
				player1_card: this.player1_card,
				player2_card: this.player2_card,
			});
			console.log(`Result Winner -> player[${winner}] -> card [${this.player1_card} vs ${this.player2_card}]`);
		}
		if (this.players[0].isCardEmpty() == true || this.players[0].isTokenEmpty() == true) {
			this.sendMessage("end", {
				"winner": 1,
			})
		}
		else if (this.players[1].isCardEmpty() == true || this.players[1].isTokenEmpty() == true) {
			this.sendMessage("end", {
				"winner": 0,
			})
		}
		else {
			this.roomState = GAME_STATE.FIRST_CARD_SELECT;
			this.sendTurn();
			console.log(`Next Round start`);
		}
	}

	processDrop() {
		this.matchDraw();
		this.sendMessage("drop", null);
		this.roomState = GAME_STATE.FIRST_CARD_SELECT;
		this.sendTurn();
		console.log(`Process Drop`);
	}

	processDouble() {
		let mount;
		if (this.turn == 0) 
			mount = this.player2_token;
		else 
			mount = this.player1_token;

		let tf = this.players[this.turn].decreaseToken(mount * 2);
		if (tf) {
			if (this.turn == 0) 
				this.player1_token = this.player1_token + (mount * 2);
			else 
				this.player2_token = this.player2_token + (mount * 2);
			console.log(`player[${this.turn}}] submit token -> ${mount * 2}`);
			this.roomState = GAME_STATE.THIRD_CHOICE_SELECT;
			this.turn = (this.turn ? 0 : 1);
			this.sendTurn();
		}
		else {
			this.players[this.turn].socket.emit("error", { message: `따당 - 토큰이 부족합니다` })
		}
	}

	Start(client: Socket) {
		if (this.roomState == GAME_STATE.READY && client.id == this.host.id) {
			let player1_dice = Math.floor((Math.random() * 6) + 1);
			let player2_dice = Math.floor((Math.random() * 6) + 1);
			while (player1_dice == player2_dice) {
				player1_dice = Math.floor((Math.random() * 6) + 1);
				player2_dice = Math.floor((Math.random() * 6) + 1);
			}
			console.log(`dice -> ${player1_dice} vs ${player2_dice}`);
			if (player1_dice > player2_dice)
				this.turn = 0;
			else
				this.turn = 1;
			console.log(`${this.room} - turn is ${this.turn ? "second player" : "first plyaer"}`);
		
			this.sendMessage("start_game", {
				player1: player1_dice,
				player2: player2_dice,
				turn: `${this.turn ? 1 : 0}`
			})
			this.roomState = GAME_STATE.FIRST_CARD_SELECT;
			this.sendTurn();
		}
	}

	submitCard(client: Socket, kind: string) {
		if ((this.roomState == GAME_STATE.FIRST_CARD_SELECT || this.roomState == GAME_STATE.SECOND_CARD_SELECT)
			&& this.players[this.turn].socket.id == client.id) {
			if (this.players[this.turn].setCard(kind)) {
				console.log(`player[${this.turn}] submit card ${kind}`);
				if (this.roomState == GAME_STATE.FIRST_CARD_SELECT) {
					if (this.turn == 0)
						this.player1_card= this.ConvertCardNumber(kind);
					else 
						this.player2_card= this.ConvertCardNumber(kind);
					this.roomState = GAME_STATE.FIRST_MONEY_SELECT;
					this.sendTurn();
				}
				else if (this.roomState == GAME_STATE.SECOND_CARD_SELECT) {
					if (this.turn == 0)
						this.player1_card= this.ConvertCardNumber(kind);
					else 
						this.player2_card= this.ConvertCardNumber(kind);
					this.roomState = GAME_STATE.SECOND_CHOICE;
					this.sendTurn();
				}
			}
			else {
				client.emit("error", { message: `제출할 수 없는 카드입니다` })
			}
		}
		else {
			client.emit("error", { message: `player${this.turn}번 님의 카드 선택 차례입니다` })
		}
	}

	submitToken(client: Socket, count: number) {
		if (this.roomState == GAME_STATE.FIRST_MONEY_SELECT && this.players[this.turn].socket.id == client.id) {
			if (count >= this.min && count <= this.max) {
				if (count > this.getMaxToken()) {
					count = this.getMaxToken();
				}
				if (this.players[this.turn].decreaseToken(count)) {
					console.log(`${this.turn} player submit token : ${count}`);
					this.roomState = GAME_STATE.SECOND_CARD_SELECT;
					if (this.turn == 0)
						this.player1_token = Number(this.player1_token + count);
					else 
						this.player2_token = Number(this.player2_token + count);
					this.turn = (this.turn ? 0 : 1);
					this.sendTurn();
				}
				else {
					client.emit("error", { message: `토큰이 부족합니다` })
				}
			}
			else {
				client.emit("error", { message: `제출할 수 있는 유효한 토큰 수는 ${this.min} <= x <= ${this.max} 입니다` })
			}
		}
		else {
			client.emit("error", { message: `player${this.turn}번 님의 카드 선택 차례입니다` })
		}
	}

	submitChoice(client: Socket, choice: string) {
		if ( ((this.roomState == GAME_STATE.SECOND_CHOICE) || (this.roomState == GAME_STATE.THIRD_CHOICE_SELECT)) && this.players[this.turn].socket.id == client.id) {
			if (choice == "battle" || choice == "drop" || choice == "double") {
				if ((this.roomState == GAME_STATE.THIRD_CHOICE_SELECT) && choice == "double") {
					client.emit("error", { message: `라운드당 따당은 한번만 가능합니다` })
				}
				else {
					if (choice == "battle") 
						this.processBattle();
					else if (choice == "drop")
						this.processDrop();
					else 
						this.processDouble();
				}
			}
			else {
				client.emit("error", { message: `올바른 선택이 아닙니다` })
			}
		}
		else {
			client.emit("error", { message: `player${this.turn}번 님의 선택 차례입니다` })
		}
	}

	printfServerData() {
		console.log(this);
	}
}