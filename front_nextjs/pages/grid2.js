import { useEffect, useState, useContext } from 'react';
import { Player, GAME_STATE } from '../utils/player';
import UserView from '../components/game/user/UserView';
import CardView from '../components/game/card/CardView';
import Grave from '../components/game/card/Grave';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import TokenControl from '../components/game/token/tokenControl';
import Battle from '../components/game/battle/battle';
import Choise from '../components/game/battle/choise';
import { MiddlewareNotFoundError } from 'next/dist/shared/lib/utils';

let socket;

export default function Grid() {
    const [host, setHost] = useState(false); // 방장 여부
    const [startable, setStartable] = useState(false); // 게임 시작 가능 여부
    const [self_number, setSelfNumber] = useState(999); // 방에서 자신의 번호
    const [turn, setTurn] = useState(-1); //
    const [gameState, setGameState] = useState(GAME_STATE.READY); // 게임 상태

    const [mine, setMine] = useState(new Player()); //자신 데이터
    const [opponent, setOpponent] = useState(new Player()); //상대 데이터


	useEffect(() => {
		socket = io.connect('http://localhost:5000/game', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: 'Bearer ' + Cookies.get('jwt'),
                    },
                },
            },
        });
		const player_handler = message => {
			console.log("set self_number -> message");
            setSelfNumber(message);
        };
        socket?.on('player', player_handler);

		return () => {
			socket?.off('player', player_handler);
            socket?.disconnect();
        };
	}, [self_number])

    useEffect(() => {
        const connect_handler = () => {
            console.log('socket connect');
        };
        socket?.on('connect', connect_handler);

        const current_player_handler = ({ player1_number, player1_nickname,  player1_avatar, player2_nickname, player2_avatar,player2_number,}) => {
			console.log("aaa");
            if (self_number == player1_number) {
				console.log("self_number == player1_number");
                // mine.nickname = player1_nickname;
				// mine.avatar = player1_avatar;
				// opponent.nickname = player2_nickname;
				// opponent.avatar = player2_avatar;
                setMine({ ...mine, nickname: player1_nickname, avatar: player1_avatar, });
                setOpponent({...opponent, nickname: player2_nickname, avatar: player2_avatar, });
            } else if (self_number == player2_number) {
				console.log("self_number == player2_number");
                // mine.nickname = player2_nickname;
				// mine.avatar = player2_avatar;
				// opponent.nickname = player1_nickname;
				// opponent.avatar = player1_avatar;
                setMine({ ...mine,nickname: player2_nickname,avatar: player2_avatar, });
                setOpponent({ ...opponent,nickname: player1_nickname, avatar: player1_avatar,});
            }
        };
        socket?.on('current_player', current_player_handler);

        const host_handler = message => {
            setHost(true);
        };
        socket?.on('host', host_handler);

        socket?.on('join_user', message => {
            console.log('user joined');
        });

        const ready_handler = message => {
            console.log('ready to start');
            setStartable(true);
        };
        socket?.on('ready', ready_handler);

        socket?.on('unready', message => {
            console.log('aa');
            setStartable(false);
        });

        socket?.on('end', message => {
            let message2 = 'winner is ' + message.winner;
            console.log(message);
        });

        socket?.on('error', data => {
            console.log(`error : ${data.message}`);
        });

        const start_handler = data => {
            setGameState(true);
            console.log('game start');
        };
        socket?.on('start', start_handler);

        const turn_handler = data => {
            console.log(data);
            setTurn(data.turn);
            setGameState(data.state);
        };
        socket?.on('turn', turn_handler);

        const start_game_handler = data => {
            setGameState(GAME_STATE.FIRST_CARD_SELECT);
            console.log('game start');
        };
        socket?.on('start_game', start_game_handler);

        const state_change_handler = data => {
            setGameState(data);
            console.log(`state_change -> ${data}`);
        };
        socket?.on('state_change', state_change_handler);

        //결과 나왔을때
        const result_handler = data => {
            console.log(data);
            if (self_number == 1) {
                mine.submit_cards.push(data.player1_card);
                opponent.submit_cards.push(data.player2_card);
            } else {
                mine.submit_cards.push(data.player2_card);
                opponent.submit_cards.push(data.player1_card);
            }
            setMine({
                ...mine,
                submit_card: '',
                submit_cards: mine.submit_cards,
            });
            setOpponent({
                ...opponent,
                submit_card: '',
                submit_cards: opponent.submit_cards,
            });
        };
        socket?.on('result', result_handler);

        const submit_card_handler = data => {
            if (data.player_number == self_number) {
                let tmp = mine;
                tmp['' + data.kind] = tmp['' + data.kind] - 1;
                setMine({ ...mine, tiger: tmp.tiger,  fox: tmp.fox,  rabbit: tmp.rabbit, gam: tmp.gam, submit_card: data.kind, });
            } else {
                let tmp = opponent;
                tmp.submit_card = '메롱 안보여줌';
                setOpponent({ ...opponent, submit_card: tmp.submit_card });
            }
        };
        socket?.on('submit_card', submit_card_handler);

        const drop_handler = data => {
            mine.submit_cards.push("back");
            opponent.submit_cards.push("back");
            setMine({
                ...mine,
                submit_card: '',
                submit_cards: mine.submit_cards,
            });
            setOpponent({
                ...opponent,
                submit_card: '',
                submit_cards: opponent.submit_cards,
            });
        };
        socket?.on('drop', drop_handler);

        return () => {
            socket?.off('current_player', current_player_handler);
            
            socket?.off('host', host_handler);
            socket?.off('ready', ready_handler);
            socket?.off('start', start_handler);
            socket?.off('turn', turn_handler);
            socket?.off('start_game', start_game_handler);
            socket?.off('state_change', state_change_handler);
            socket?.off('result', result_handler);
            socket?.off('submit_card', submit_card_handler);
            socket?.off('drop', drop_handler);
            socket?.off('connect', connect_handler);
        };
    }, [mine, opponent, turn, gameState, host, startable]);

    function tmp() {
        console.log(`tmp mine.nickname => ${mine.nickname}`);
        console.log(`self_number is => ${self_number}`);
    }

    function tmp2() {
        socket.emit('start', null);
    }

    return (
        <div className="wrapper">
            <div className="a border-2 border-red-100">
                <Grave
                    cards1={mine.submit_cards}
                    cards2={opponent.submit_cards}
                    state={gameState}
                />
            </div>
            <div className="b border-2 border-red-100">
                <UserView
                    nickname2={opponent.nickname}
                    src2={opponent.avatar}
                />
            </div>
            <div className="c">
                {self_number}
                Token Count
                <button onClick={tmp} className="bg-gray-400">
                    aa
                </button>
            </div>
            <div className="d">Navi Var</div>
            <div className="e bg-battle bg-cover bg-center bg-no-repeat ">
                {host && startable && (
                    <button onClick={tmp2} className="bg-red-400">
                        start
                    </button>
                )}
                {gameState > 0 && (
                    <Battle
                        mine={mine.submit_card}
                        opponent={opponent.submit_card}
                    />
                )}
            </div>
            <div className="f">
                {turn == self_number &&
                    gameState == GAME_STATE.SECOND_CHOICE && (
                        <Choise socket={socket} />
                    )}
            </div>
            <div className="g">chatting tab</div>
            <div className="i flex flex-row justify-center items-center">
                <CardView
                    tiger={mine.tiger}
                    fox={mine.fox}
                    rabbit={mine.rabbit}
                    gam={mine.gam}
                    state={gameState}
                    socket={socket}
                />
            </div>
            <div className="j">
                {turn == self_number &&
                    gameState == GAME_STATE.FIRST_MONEY_SELECT && (
                        <TokenControl socket={socket} />
                    )}
            </div>
            <div className="l">
                <UserView nickname2={mine.nickname} src2={mine.avatar} />
            </div>
            <style jsx>{`
                .wrapper {
                    display: grid;
                    width: 100vw;
                    height: 100vh;
                    grid-template-columns: repeat(10, 1fr);
                    grid-template-rows: 0.5fr 0.5fr 1.5fr 1fr 0.5fr;
                    grid-template-areas:
                        'b b b b b b b c d d'
                        'a e e e e e e f g g'
                        'a e e e e e e f g g'
                        'i i i i i i i j g g'
                        'l l l l l l l j g g';
                }

                .a {
                    grid-area: a;
                }
                .b {
                    grid-area: b;
                }
                .c {
                    grid-area: c;
                }
                .d {
                    grid-area: d;
                }
                .e {
                    grid-area: e;
                }
                .f {
                    grid-area: f;
                }
                .g {
                    grid-area: g;
                }
                .i {
                    grid-area: i;
                }
                .j {
                    grid-area: j;
                }
                .k {
                    grid-area: k;
                }
                .l {
                    grid-area: l;
                }

                div {
                    border: 1px solid black;
                }
            `}</style>
        </div>
    );
}
