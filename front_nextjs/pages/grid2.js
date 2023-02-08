import { useEffect, useState, useRef  } from 'react';
import { Player, GAME_STATE } from '../utils/player';
import UserView from '../components/game/user/UserView';
import CardView from '../components/game/card/CardView';
import Grave from '../components/game/card/Grave';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import TokenControl from '../components/game/token/tokenControl';
import Battle from '../components/game/battle/battle';
import Choise from '../components/game/battle/choise';
import AlertModal from "../components/modal/AlterModal";
import ResultContent from "../components/game/battle/result";
import ResultModal from "../components/modal/ResultModal";
import internal from 'stream';

let socket;

export default function Grid() {
    const [host, setHost] = useState(false); // 방장 여부
    const [startable, setStartable] = useState(false); // 게임 시작 가능 여부
    const self_number = useRef(999);
    const [turn, setTurn] = useState(-1); //
    const [gameState, setGameState] = useState(GAME_STATE.READY); // 게임 상태

    const [mine, setMine] = useState(new Player()); //자신 데이터
    const [opponent, setOpponent] = useState(new Player()); //상대 데이터

	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState();
	const [resultOpen, setResultOpen] = useState(false);

	const [myResult, setMyResult] = useState();
	const [oppoResult, setOppoResult] = useState();
	const [winResult, setWinResult] = useState();

	useEffect( () => {
		console.log(`connectd addres : `)
		socket = io.connect(`/game`, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: 'Bearer ' + Cookies.get('jwt'),
                    },
                },
            },
        }, );
		return () => {
			socket?.disconnect();
        };
	}, [])


	useEffect(() => {
		const player_handler = message => {
			console.log(`set self_number.current -> ${message}`);
            self_number.current = message;
        };
        socket?.on('player', player_handler);
		return () => {
			socket?.off('player', player_handler);
        };
	}, []);

	useEffect(() => {
		const current_player_handler = ({ player1_number, player1_nickname,  player1_avatar, player2_nickname, player2_avatar,player2_number,}) => {
			console.log(`self_number.current -> ${self_number.current}`);
            if (self_number.current == player1_number) {
                setMine({ ...mine, nickname: player1_nickname, avatar: player1_avatar});
                setOpponent({...opponent, nickname: player2_nickname, avatar: player2_avatar});
            } else if (self_number.current == player2_number) {
                setMine({ ...mine,nickname: player2_nickname,avatar: player2_avatar});
                setOpponent({ ...opponent,nickname: player1_nickname, avatar: player1_avatar});
            }
        };
        socket?.on('current_player', current_player_handler);

		return () => {
			socket?.off('current_player', current_player_handler);
        };
	}, [mine, opponent])

    useEffect(() => {
        const connect_handler = () => {
            console.log('socket connect');
        };
        socket?.on('connect', connect_handler);

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
			console.log(message);
			if (message.winner == self_number.current) {
				setModalContent(`승자 : ${mine.nickname}`);
				setModalOpen(true);
			}
			else {
				setModalContent(`승자 : ${opponent.nickname}`);
				setModalOpen(true);
			}
			setGameState(0);
        });

        socket?.on('error', data => {
			setModalContent(data.message);
			setModalOpen(true);
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
			let tmp;
			if (data.player1 > data.player2) {
				if (self_number.current == 1) 
					tmp = mine.nickname;
				else
					tmp = opponent.nickname
			}
			else {
				if (self_number.current == 1) 
					tmp = opponent.nickname;
				else
					tmp = mine.nickname
			}
            setGameState(GAME_STATE.FIRST_CARD_SELECT);
			setModalContent(`first turn is ${tmp}  --> ${data.player1} vs ${data.player2}`);
			setModalOpen(true);
			setStartable(false);
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
            if (self_number.current == 1) {
                mine.submit_cards.push(data.player1_card);
                opponent.submit_cards.push(data.player2_card);
				setMyResult(data.player1_card);
				setOppoResult(data.player2_card);
				setWinResult(data.winner);
            } 
			else {
                mine.submit_cards.push(data.player2_card);
                opponent.submit_cards.push(data.player1_card);
				setMyResult(data.player2_card);
				setOppoResult(data.player1_card);
				setWinResult(data.winner);
            }

			if (data.winner == 3) {
				mine.token = mine.token + (Number(data.token) / 2);
				opponent.token = opponent.token + (Number(data.token) / 2);
			}
			else if (data.winner == self_number.current) {
				mine.token = mine.token + (Number(data.token));
				if (data.gam == true)
					opponent.token = opponent.token - 10
			}
			else {
				opponent.token = opponent.token + (Number(data.token));
				if (data.gam == true)
					mine.token = mine.tokenb - 10
			}

            setMine({
                ...mine,
                submit_card: '',
                submit_cards: mine.submit_cards,
				submit_token: 0,
				token: mine.token
            });
            setOpponent({
                ...opponent,
                submit_card: '',
                submit_cards: opponent.submit_cards,
				submit_token: 0,
				token: opponent.token
            });

			setResultOpen(true);
        };
        socket?.on('result', result_handler);

        const submit_card_handler = data => {
            if (data.player_number == self_number.current) {
                let tmp = mine;
                tmp['' + data.kind] = tmp['' + data.kind] - 1;
                setMine({ ...mine, tiger: tmp.tiger,  fox: tmp.fox,  rabbit: tmp.rabbit, gam: tmp.gam, submit_card: data.kind, avatar: mine.avatar});
            } else {
                let tmp = opponent;
                tmp.submit_card = '메롱 안보여줌';
                setOpponent({ ...opponent, submit_card: tmp.submit_card });
            }
        };
        socket?.on('submit_card', submit_card_handler);

        const drop_handler = (data) => {
			if (data.player == self_number.current) {
				mine.drop = false;
				if (data.state == GAME_STATE.THIRD_CHOICE_SELECT) {
					mine.token = mine.token + (data.token / 2)
					opponent.token = opponent.token + data.token;
				}
				else {
					opponent.token = opponent.token + data.token;
				}
				console.log(`drop my tokne ->${mine.token}`)
			}
			else {
				if (data.state == GAME_STATE.THIRD_CHOICE_SELECT) {
					opponent.token = opponent.token + (data.token / 2)
					mine.token = mine.token + data.token;
				}
				else {
					mine.token = mine.token + data.token;
				}
			}
            mine.submit_cards.push("back");
            opponent.submit_cards.push("back");
            setMine({
                ...mine,
				drop: mine.drop,
                submit_card: '',
                submit_cards: mine.submit_cards,
				token: mine.token, 
				avatar: mine.avatar
            });
            setOpponent({
                ...opponent,
                submit_card: '',
                submit_cards: opponent.submit_cards,
				token : opponent.token
            });
        };
        socket?.on('drop', drop_handler);

		const submit_token_handler = (data) => {
			console.log("submit_token_event_handler");
			console.log(data);
			console.log(data.player_number);
			console.log(self_number.current);
			console.log(data.player_number == self_number.current)
			if (data.player_number == self_number.current) {
                let tmp = mine.token - data.count;
				mine.submit_token = mine.submit_token + data.count;
                setMine({ ...mine, token: tmp, avatar: mine.avatar});
            } else {
                opponent.token = opponent.token - data.count;
				opponent.submit_token = opponent.submit_token + data.count
                setOpponent({ ...opponent, token: opponent.token });
            }
        };
        socket?.on('submit_token', submit_token_handler);

        return () => {
            // socket?.off('current_player', current_player_handler);
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
			socket?.off('submit_token', submit_token_handler);
        };
    }, [mine, opponent, turn, gameState, host, startable]);

    function tmp() {
        console.log(`tmp mine.nickname => ${mine.nickname}`);
        console.log(`self_number.current is => ${self_number.current}`);
    }

    function start() {
        socket.emit('start', null);
    }


    return (
        <div className="wrapper">
			<AlertModal isOpen={modalOpen} closeFunction={() => setModalOpen(false)}>
				{ modalContent }
			</AlertModal>
			<ResultModal isOpen={resultOpen} closeFunction={() => setResultOpen(false)}>
				<ResultContent card_1={oppoResult} card_2={myResult} winner={winResult} self_number={self_number.current} closeFunction={() => setResultOpen(false)}/>
			</ResultModal>
			
            <div className="a border-2 border-red-100 bg-test bg-contain bg-cover">
                <Grave
                    cards1={mine.submit_cards}
                    cards2={opponent.submit_cards}
                    state={gameState}
                />
            </div>
            <div className={`b ${(turn != self_number.current) && (gameState > 0) && 'blink' } 
							${opponent.avatar == "/api/images/avatar/1" && "bg-1"}
							${opponent.avatar == "/api/images/avatar/2" && "bg-2"}
							${opponent.avatar == "/api/images/avatar/3" && "bg-3"}
							bg-center bg-cover`}>
                <UserView
                    nickname2={opponent.nickname}
                    src2={opponent.avatar}
                />
            </div>
            <div className="c flex justify-center items-center bg-test bg-contain bg-cover">
			{
					(gameState > 0) && <p className='font-alssu text-3xl'>x{opponent.submit_token}</p>
				}	
				{
					(gameState > 0) && <p className='font-alssu text-9xl mx-[2rem]'>x{opponent.token}</p>
				}
            </div>
            <div className="e flex bg-battle bg-cover bg-center bg-no-repeat justify-center items-center">
                {host && startable && (
                    <button onClick={start} className="bg-red-400 w-[5rem] h-[3rem] border-2 border-black">
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
            <div className={`f bg-test bg-contain bg-cover ${((turn == self_number.current) && ((gameState == GAME_STATE.SECOND_CHOICE) || gameState == GAME_STATE.THIRD_CHOICE_SELECT)) && 'blink' }`}>
                {
					(turn == self_number.current) && ((gameState == GAME_STATE.SECOND_CHOICE || gameState == GAME_STATE.THIRD_CHOICE_SELECT)) && (
                        <Choise socket={socket} gameState={gameState} drop={mine.drop}/>
                    )
				}
            </div>
            <div className={`i flex flex-row ${((turn == self_number.current) && (gameState == GAME_STATE.FIRST_CARD_SELECT || gameState == GAME_STATE.SECOND_CARD_SELECT)) && 'blink' } bg-test bg-contain bg-cover`}>
					<CardView
	                    tiger={mine.tiger}
                    	fox={mine.fox}
                    	rabbit={mine.rabbit}
                    	gam={mine.gam}
                    	state={gameState}
                    	socket={socket}
                	/>
            </div>
            <div className="j flex flex-row justify-center items-center bg-test bg-contain bg-cover">
				{
					(gameState > 0) && <p className='font-alssu text-3xl'>x{mine.submit_token}</p>
				}	
				{
					(gameState > 0) && <p className='font-alssu text-9xl mx-[2rem]'>x{mine.token}</p>
				}
            </div>
            <div className={`l ${mine.avatar == "/api/images/avatar/1" && "bg-1"}
							${mine.avatar == "/api/images/avatar/2" && "bg-2"}
							${mine.avatar == "/api/images/avatar/3" && "bg-3"} bg-center bg-cover`}>
                <UserView nickname2={mine.nickname} src2={mine.avatar} />
            </div>
			<div className={`k bg-test bg-contain bg-cover ${((turn == self_number.current) && (gameState == GAME_STATE.FIRST_MONEY_SELECT)) && 'blink' }`}>
				{
					(turn == self_number.current && gameState == GAME_STATE.FIRST_MONEY_SELECT) && (
						<TokenControl socket={socket}/>
					)
				}
            </div>
            <style jsx>{`
                .wrapper {
                    display: grid;
                    width: 100vw;
                    height: 100vh;
                    grid-template-columns: repeat(8, 1fr);
                    grid-template-rows: 0.5fr 0.5fr 1.5fr 1fr 0.5fr;
                    grid-template-areas:
                        'b b b b b b c c'
                        'a e e e e e f f'
                        'a e e e e e f f'
                        'i i i i i i k k'
                        'l l l l l l j j';
                }

				.k {
                    grid-area: k;
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
                .i {
                    grid-area: i;
                }
                .j {
                    grid-area: j;
                }
                .l {
                    grid-area: l;
                }

                div {
                    border: 1px solid black;
                }

				@keyframes blink-effect {
					50% {
					  border-color: #F15B5B;
					  border-width: 0.25rem;
					}
				  }
				  
				.blink {
					animation: blink-effect 1.5s step-end infinite;
			`}</style>
        </div>
    );
}
