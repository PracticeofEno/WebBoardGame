import { Server, Socket } from "socket.io";
import { Player, SubmitCardDto } from "./game.player";
import { GAME_STATE } from "../../util/utils"

export class GameData {

        constructor(room: string, gamAdventage: number = 10, wait: number = 8, max: number = 9, min: number = 3) {
                this.room = room;
                this.gamAdventage = gamAdventage;
                this.wait = wait;
                this.max = max;
                this.players = new Array<Player>();
                this.players.push(new Player());
                this.players.push(new Player());
                this.turn = 1;
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


        getResult(): number {
                if (this.players[0].token == this.players[1].token)
                        return 3;
                if (this.players[0].token > this.players[1].token)
                        return 1;
                else
                        return 2;
        }

        getPlayerNumber(client: Socket): number {
                if (this.players[0].socket.id == client.id)
                        return 1;
                else if (this.players[1].socket.id == client.id)
                        return 2;
                else
                        return -1;
        }

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
                        return 2;
                }
                else if (this.player1_card == 0 && this.player2_card == 3) {
                        return 1;
                }

                if (this.player1_card > this.player2_card)
                        return 1;
                else if (this.player1_card < this.player2_card)
                        return 2;
                else
                        return 3;
        }

        getStringWithCardNumber(number: number): string {
                if (number == 0)
                        return "gam";
                else if (number == 1)
                        return "rabbit";
                else if (number == 2)
                        return "fox";
                else if (number == 3)
                        return "tiger";
        }

        isDropAble(): Boolean {
                return this.players[this.turn - 1].drop;
        }

        isEndGame(): Boolean {
                if (this.players[0].isCardEmpty() == true || this.players[1].isCardEmpty() == true ||
                        this.players[0].isTokenEmpty() == true || this.players[1].isTokenEmpty() == true) {
                        return true;
                }
                return false;
        }

        sendTurn() {
                this.sendMessage("turn", {
                        turn: this.turn,
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
                if (this.roomState == GAME_STATE.THIRD_CHOICE_SELECT)
                        this.turn = this.turn == 1 ? 2 : 1;
                this.sendTurn();
        }

        processBattle() {
                console.log("processBattle");
                console.log(`player[0]-> ${this.player1_token} vs player[1]-> ${this.player2_token})`);
                if (this.player1_token > this.player2_token) {
                        let token = this.player1_token - this.player2_token;
                        this.players[1].decreaseToken(token);
                        this.player2_token = this.player2_token + (token);
                        this.sendMessage("submit_token", {
                                player_number: 2,
                                count: token
                        })
                        console.log(`player[1] submit token ${this.player1_token - this.player2_token}`);
                }
                else if (this.player1_token < this.player2_token) {
                        let token = this.player2_token - this.player1_token;
                        this.players[0].decreaseToken(token);
                        this.player1_token = this.player1_token + token;
                        this.sendMessage("submit_token", {
                                player_number: 1,
                                count: token
                        })
                        console.log(`player[0] submit token ${token}`);
                }

                let winner = this.getWinnerPlayerNumber();
                console.log(`winner => ${winner}`);
                let looser = (winner == 2 ? 1 : 2)
                let gamExist: Boolean = false;
                if ((this.player1_card == 0 && this.player2_card == 3) || (this.player1_card == 3 && this.player2_card == 0)) {
                        gamExist = true;
                        console.log("===gam is exist===")
                }
                if (winner == 3) {
                        console.log("match draw");
                        this.sendMessage("result", {
                                winner: winner,
                                player1_card: this.getStringWithCardNumber(this.player1_card),
                                player2_card: this.getStringWithCardNumber(this.player2_card),
                                token: this.player1_token + this.player2_token,
                        });
                        this.matchDraw();
                }
                else {
                        if (gamExist) {
                                this.players[winner - 1].increaseToken(this.gamAdventage);
                                this.players[looser - 1].decreaseToken(this.gamAdventage);
                                console.log(`gamExist`);
                        }
                        this.players[winner - 1].increaseToken(this.player1_token);
                        this.players[winner - 1].increaseToken(this.player2_token);
                        this.sendMessage("result", {
                                winner: winner,
                                player1_card: this.getStringWithCardNumber(this.player1_card),
                                player2_card: this.getStringWithCardNumber(this.player2_card),
                                token: this.player1_token + this.player2_token + (gamExist ? this.gamAdventage : 0),
                                gam: gamExist
                        });
                        this.player1_token = 0;
                        this.player2_token = 0;
                        console.log(`Result Winner -> player[${winner - 1}] -> card [${this.player1_card} vs ${this.player2_card}]`);
                }
                if (this.players[0].isCardEmpty() == true || this.players[0].isTokenEmpty() == true) {
                        this.sendMessage("end", {
                                "winner": this.getResult(),
                        })
                }
                else if (this.players[1].isCardEmpty() == true || this.players[1].isTokenEmpty() == true) {
                        this.sendMessage("end", {
                                "winner": this.getResult(),
                        })
                }
                else {
                        if (this.roomState == GAME_STATE.THIRD_CHOICE_SELECT && winner != 3)
                                this.turn = (this.turn == 1 ? 2 : 1);
                        this.roomState = GAME_STATE.FIRST_CARD_SELECT;
                        this.sendTurn();
                        console.log(`Next Round start`);
                }
        }

        processDrop() {
                if (this.isDropAble()) {
                        let token = (this.turn == 2 ? this.player1_token : this.player2_token);
                        console.log(`${this.player1_token} vs ${this.player2_token}`);
                        console.log(`${this.roomState}`);
                        this.players[this.turn - 1].drop = false;
                        this.sendMessage("drop", {
                                player: this.turn,
                                token: token,
                                state: this.roomState
                        });
                        this.matchDraw();

                        this.roomState = GAME_STATE.FIRST_CARD_SELECT;
                        this.sendTurn();
                        console.log(`Process Drop`);
                }
                else {
                        this.players[this.turn - 1].socket.emit("error", {
                                message: "Can't drop Choice"
                        })
                }

        }

        processDouble() {
                let mount;
                let opponent_money
                if (this.turn == 1) {
                        mount = this.player2_token;
                        opponent_money = this.players[1].token;
                }
                else {
                        mount = this.player1_token;
                        opponent_money = this.players[0].token;
                }

                if (opponent_money >= mount) 
                        mount = mount * 2;
                else
                        mount = opponent_money + mount;

                let tf = this.players[this.turn - 1].decreaseToken(mount);
                if (tf) {
                        this.sendMessage("submit_token", {
                                player_number: this.turn,
                                count: mount
                        })

                        if (this.turn == 1)
                                this.player1_token = this.player1_token + (mount);
                        else
                                this.player2_token = this.player2_token + (mount);
                        console.log(`player[${this.turn - 1}}] submit token -> ${mount}`);
                        this.roomState = GAME_STATE.THIRD_CHOICE_SELECT;
                        this.turn = (this.turn == 2 ? 1 : 2);
                        this.sendTurn();
                }
                else {
                        this.players[this.turn - 1].socket.emit("error", { message: `따당 - 토큰이 부족합니다` })
                }
        }

        Start(client: Socket) {
                console.log(`try start room ${client.id == this.host.id}`);
                if (this.roomState == GAME_STATE.READY && client.id == this.host.id) {
                        let player1_dice = Math.floor((Math.random() * 6) + 1);
                        let player2_dice = Math.floor((Math.random() * 6) + 1);
                        while (player1_dice == player2_dice) {
                                player1_dice = Math.floor((Math.random() * 6) + 1);
                                player2_dice = Math.floor((Math.random() * 6) + 1);
                        }
                        console.log(`dice -> ${player1_dice} vs ${player2_dice}`);
                        if (player1_dice > player2_dice)
                                this.turn = 1;
                        else
                                this.turn = 2;
                        console.log(`${this.room} - turn is ${this.turn == 2 ? "second player" : "first plyaer"}`);

                        this.sendMessage("start_game", {
                                player1: player1_dice,
                                player2: player2_dice,
                                turn: this.turn
                        })
                        this.roomState = GAME_STATE.FIRST_CARD_SELECT;
                        this.sendTurn();
                }
        }

        submitCard(client: Socket, kind: string): Boolean {
                if ((this.roomState == GAME_STATE.FIRST_CARD_SELECT || this.roomState == GAME_STATE.SECOND_CARD_SELECT)
                        && this.players[this.turn - 1].socket.id == client.id) {
                        if (this.players[this.turn - 1].setCard(kind)) {
                                console.log(`player[${this.turn - 1}] submit card ${kind}`);
                                if (this.roomState == GAME_STATE.FIRST_CARD_SELECT) {
                                        if (this.turn == 1)
                                                this.player1_card = this.ConvertCardNumber(kind);
                                        else
                                                this.player2_card = this.ConvertCardNumber(kind);
                                        this.roomState = GAME_STATE.FIRST_MONEY_SELECT;
                                        this.sendTurn();
                                        return true;
                                }
                                else if (this.roomState == GAME_STATE.SECOND_CARD_SELECT) {
                                        if (this.turn == 1)
                                                this.player1_card = this.ConvertCardNumber(kind);
                                        else
                                                this.player2_card = this.ConvertCardNumber(kind);
                                        this.roomState = GAME_STATE.SECOND_CHOICE;
                                        this.sendTurn();
                                        return true;
                                }
                        }
                        else {
                                client.emit("error", { message: `제출할 수 없는 카드입니다` })
                                return false;
                        }
                }
                else {
                        client.emit("error", { message: `${this.players[this.turn - 1].nickname} 님의 카드 선택 차례입니다` })
                        return false;
                }
        }

        submitToken(client: Socket, count: number): Number {
                if (this.roomState == GAME_STATE.FIRST_MONEY_SELECT && this.players[this.turn - 1].socket.id == client.id) {
                        if (count >= this.min && count <= this.max) {
                                if (count > this.getMaxToken()) {
                                        count = this.getMaxToken();
                                }
                                if (this.players[this.turn - 1].decreaseToken(count)) {
                                        console.log(`player[${this.turn - 1}] submit token : ${count}`);
                                        this.roomState = GAME_STATE.SECOND_CARD_SELECT;
                                        if (this.turn == 1)
                                                this.player1_token = Number(this.player1_token + count);
                                        else
                                                this.player2_token = Number(this.player2_token + count);
                                        this.turn = (this.turn == 2 ? 1 : 2);
                                        this.sendTurn();
                                        return count;
                                }
                                else {
                                        client.emit("error", { message: `토큰이 부족합니다` })
                                        return -1;
                                }
                        }
                        else {
                                client.emit("error", { message: `제출할 수 있는 유효한 토큰 수는 ${this.min} <= x <= ${this.max} 입니다` })
                                return -1;
                        }
                }
                else {
                        client.emit("error", { message: `${this.players[this.turn - 1].nickname} 님의 토큰 제출 차례입니다` })
                        return -1;
                }
        }

        submitChoice(client: Socket, choice: string) {
                if (((this.roomState == GAME_STATE.SECOND_CHOICE) || (this.roomState == GAME_STATE.THIRD_CHOICE_SELECT)) && this.players[this.turn - 1].socket.id == client.id) {
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
                        client.emit("error", { message: `${this.players[this.turn - 1].nickname} 님의 결정 차례입니다` })
                }
        }

        printfServerData() {
                console.log(this);
        }


}