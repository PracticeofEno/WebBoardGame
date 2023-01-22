import Image from "next/image";
import { useEffect, useState } from "react";
import GraveCard from "../card/GraveCard"

export default function Battle({mine, opponent}) {
	const [myCard, setMyCard] = useState();
	const [oppoCard, setOppoCard] = useState();

	useEffect(() => {
		setMyCard(mine);
		setOppoCard(opponent);
	})

	return (
		<div className="w-full h-full flex-row justify-start">
			<div className="w-full h-1/5"></div>
			<div className="w-full h-3/5 flex flex-row justify-center">
				<div className="w-[13rem] h-full bg-blue-100 mx-10">
					{
						(oppoCard != "") && <GraveCard name={"뒷면"}/>
					}
				</div>
				<div className="w-[13rem] h-full mx-10">
					<GraveCard name={myCard}/>
				</div>
			</div>
			<div className="w-full h-1/5"></div>
		</div>
	);
}
