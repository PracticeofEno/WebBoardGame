import Image from "next/image";
import { useEffect, useState } from "react";
import GraveCard from "./GraveCard"

export default function Grave(cards1, cards2) {
	const [player1Cards, setPlayer1Cards] = useState([]);
	const [player2Cards, setPlayer2Cards] = useState([]);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		let haha = new Array(cards1);
		let haha2 = new Array(cards2);
		setPlayer1Cards(haha);
		setPlayer2Cards(haha2);
	}, [])

	return (
		<div className="flex flex-col relative w-full h-full justify-center items-center">
			<div className="relative">
				<img src="/images/back.svg" onMouseOver={(e) => setVisible(true)} onMouseLeave={(e) => setVisible(false)} alt="" className="w-full h-full back" />
			</div>
			{
				(visible) && (
					<div className="absolute w-[550%] h-2/3 left-[10.5vw] bg-gray-400 cardBox flex-col">
						<div className="flex flex-row relaitve w-[100%] h-[50%] bg-pink-200 justify-start">
							{
								player1Cards.map((value, index) => {
									console.log(value);
									return (
										(value.cards1.length > 0)  && (<div key={index} className="w-[11%] h-full bg-gray-400">
											<GraveCard key={index} name={value} />
										</div>)
									)
								})
							}

						</div>
						{/* <div className="flex flex-row relaitve w-[100%] h-[50%] bg-blue-200">
							{
								player2Cards.map((value, index) => {
									console.log(value.cards2);
									return (
										(<div key={index} className="w-[11%] h-full bg-gray-400">
											<GraveCard key={index} name={value} />
										</div>)
									)
								})
							}
						</div> */}
					</div>
				)
			}


			<style jsx>{`
				.back:hover {
					transform: translateY(-10px);
					transition-duration: 0.1s;
				}

				.cardBox:hover {
					visibility: visible;
				}
			`}</style>
		</div>

	);
}