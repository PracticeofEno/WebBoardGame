import { useEffect, useState } from "react";
import Card from "./Card"

export default function CardView({ tiger, fox, rabbit, gam}) {

	const [tc, setTc] = useState(0);
	const [fc, setFc] = useState(0);
	const [rc, setRc] = useState(0);
	const [gc, setGc] = useState(0);
	useEffect(() => {
		setTc(tiger);
		setFc(fox);
		setRc(rabbit);
		setGc(gam);
	}) 
  return (
	<div className="w-full h-full relative flex flex-row justify-center">
		{
			(tc > 0) && (
			<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
				<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{tc}</p>
				<Card name={`호랑이`}/>
			</div>)
		}
		{	
			(fc > 0) && (
			<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
				<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{fc}</p>
				<Card name={`여우`}/>
			</div>)
		}
		{
			(rc > 0) && (
			<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
				<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{rc}</p>
				<Card name={`토끼`}/>
			</div>)
		}
		{
			(gc > 0) && (
			<div className="flex flex-row w-[13rem] h-[16rem] mx-1 cardBox">
				<p className="absolute font-alssu font-bold text-black-600 pt-2 pl-[10.5rem] z-10 text-5xl">x{gc}</p>
				<Card name={`곶감`}/>
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
