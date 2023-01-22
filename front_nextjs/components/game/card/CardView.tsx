import { useEffect, useState } from "react";
import Card from "./Card"

export default function CardView({ tiger, fox, rabbit, gam, state, socket}) {

	return (
		<div className="w-full h-full relative flex flex-row justify-center">
			{
				(tiger > 0 && state > 0) && (
					<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
						<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{tiger}</p>
						<Card name={`호랑이`} socket={socket}/>
					</div>)
			}
			{
				(fox > 0 && state > 0) && (
					<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
						<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{fox}</p>
						<Card name={`여우`} socket={socket}/>
					</div>)
			}
			{
				(rabbit > 0 && state > 0) && (
					<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
						<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{rabbit}</p>
						<Card name={`토끼`} socket={socket}/>
					</div>)
			}
			{
				(gam > 0 && state > 0) && (
					<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
						<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{gam}</p>
						<Card name={`곶감`} socket={socket}/>
					</div>)
			}
			<style jsx>{`
			.cardBox:hover {
				transform: translateY(-10px);
				transition-duration: 0.1s;
				transform: scale(1.2);
				border-width: 2px;
				border-color: rgba(156, 163, 175, 700 var(--tw-border-opacity));
			}
		`}
			</style>
		</div>

	);
}
