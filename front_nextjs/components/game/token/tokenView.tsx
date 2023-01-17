import { useEffect, useState } from "react";
import Token from "../token/token"

export default function TokenView({gold}) {
	const [one, setOne] = useState(0);
	const [five, setFive] = useState(0);
	const [ten, setTen] = useState(0);
	useEffect(() => {
		let ten, five, one;
		if (gold > 10) {
			let tmp;
			tmp = gold / 10;
			gold = gold % 10;
			setTen(tmp);
		}
		if (gold > 5) {
			let tmp;
			tmp = gold / 5;
			gold = gold % 5;
			setFive(tmp);
		}
		setOne(gold);
	})

	return (
		<div className={`flex w-full h-full flex-row py-[2rem]`}>
			<div className="flex block w-1/3 h-full flex-col justify-start">
				{ 
					Array.apply(null, { length: ten }).map((e, i) => (
						<Token key={i} gold={10}/>
					))
				}
			</div>
			<div className="flex block w-1/3 h-full flex-row justify-start">
				{
					Array.apply(null, { length: five }).map((e, i) => (
						<Token key={i} gold={5}/>
					))
				}
			</div>
			<div className="flex block w-1/3 h-full flex-row justify-start">
				{
					Array.apply(null, { length: one }).map((e, i) => (
						<Token key={i} gold={1}/>
					))
				}
			</div>

		</div>
	);
}
