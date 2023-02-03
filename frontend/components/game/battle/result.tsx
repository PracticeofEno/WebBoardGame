import Image from "next/image";
import { useEffect, useState } from "react";
import { GAME_STATE } from "../../../utils/player";
import GraveCard from "../card/GraveCard"

export default function ResultContent({card_1, card_2, winner, self_number, closeFunction}) {
	return (
		<div onClick={closeFunction} className="w-full h-full flex-col justify-start flex justify-center items-center">
			<div className="relative flex flex-col w-[50rem] h-[50rem] bg-gray-400 bg-no-repeat bg-center bg-cover">
				{
					 (winner != self_number && winner != 3)&& (
						<div className={`w-full h-1/6  bg-red-400 bg-opacity-80 flex justify-center items-center`}>
							<p className="text-5xl"> 패배 </p>
						</div>
					)
				}
				{
					 (winner == self_number) && (
						<div className={`w-full h-1/6  bg-green-400 bg-opacity-80 flex justify-center items-center`}>
							<p className="text-5xl"> 승리 </p>
						</div>
					)
				}
				{
					(winner == 3) && (
						<div className={`w-full h-1/6  bg-gray-400 bg-opacity-80 flex justify-center items-center`}>
							<p className="text-5xl"> 무승부 </p>
						</div>
					)
				}
				<div className="flex flex-row w-full h-full flex-row bg-green-300 bg-opacity-80 justify-center items-center">
					<div className="w-1/2 h-full flex justify-center items-center bg-red-200 flex-col">
						<p className="font-alssu">상대 카드</p>
						<div className="flex flex-row w-[13rem] h-[16rem] mx-5 cardBox">
							<GraveCard name={card_1} />
						</div>
					</div>
					
					<div className="w-1/2 h-full flex flex-col justify-center items-center bg-blue-200">
					<p className="font-alssu">내 카드</p>
						<div className="flex flex-row w-[13rem] h-[16rem] mx-5 cardBox">
							<GraveCard name={card_2} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
