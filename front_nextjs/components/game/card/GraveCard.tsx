import Image from "next/image";
import { useEffect, useState } from "react";

export default function Card({ name }) {

	let tmp = [
		{	id: '1',	name: "여우",	src: "/images/fox.svg",	detail: "　토끼,곶감을 이김",},
		{	id: '2',	name: "토끼",	src: "/images/rabbit.svg",	detail: "　곶감을 이김",},
		{	id: '3',	name: "호랑이",	src: "/images/tiger.svg",	detail: "　토끼,여우를 이김",},
		{	id: '4',	name: "곶감",	src: "/images/gam.svg",	detail: "　호랑이를 이김",},
		{	id: '5',	name: "뒷면",	src: "/images/gam.svg",	detail: "　호랑이를 이김",},
	];
	
	const [idx, setIdx] = useState(0);
	useEffect(() => {
		if (name == "호랑이") 
			setIdx(2);
		else if (name == "여우")
			setIdx(0);
		else if (name == "토끼")
			setIdx(1);
		else if (name == "곶감")
			setIdx(3);
		else if (name == "뒷면")
			setIdx(4);
	})

	return (
		<div className="w-full h-full relative">
			{
				(idx == 4) ? <img src="/images/back.svg" alt="" className="absolute w-full h-full px-2" /> : <img src="/images/card_template.svg" alt="" className="absolute w-full h-full" />
			}
			{
				(idx != 4) && <img src="/images/card_template.svg" alt="" className="absolute w-full h-full" />
			}
			{
				(idx != 4) && <img src={tmp[idx].src} alt="" className="ImgCharacter" />
			}
			<style jsx>{`
			.ImgCharacter {
				width: 65%;
				height: 65%;
  				position: absolute;
  				top: 8%;
  				left: 16%;siveri
			}

			.CardTitle {
				position: relative;
  				top: 7%;
  				left: 22%;
  				font-size: 1rem;
  				font-weight: 500;
  				font-family: 'alssu';
			}

			.CardDetail {
				position: absolute;
  				bottom: 15%;
  				left: 22%;
  				font-size: 1rem;
  				font-weight: 300;
  				font-family: 'alssu';
  				text-align: center;
  				break-word;
			}
		`}</style>
		</div>

	);
}