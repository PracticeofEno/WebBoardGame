import Image from "next/image";
import { useEffect, useState } from "react";
import { GAME_STATE } from "../../../utils/player";
import GraveCard from "../card/GraveCard"

export default function Choise({socket, gameState, drop}) {

	function Battle() {
		socket?.emit("submit_choice", {
			choice: 'battle'
		})
	}

	function Drop() {
		socket?.emit("submit_choice", {
			choice: 'drop'
		})
	}
	
	function Double() {
		socket?.emit("submit_choice", {
			choice: 'double'
		})
	}

	return (
		<div className="w-full h-full flex-col justify-start flex justify-center items-center">
			<button onClick={Battle} className="w-[8rem] h-[3rem] border-2 border-black my-1">승부</button>
			{
				drop && <button onClick={Drop} className="w-[8rem] h-[3rem] border-2 border-black my-1">포기</button>
			}
			{
				(gameState != GAME_STATE.THIRD_CHOICE_SELECT) && <button onClick={Double} className="w-[8rem] h-[3rem] border-2 border-black my-1">따당</button>
			}
		</div>
	);
}
