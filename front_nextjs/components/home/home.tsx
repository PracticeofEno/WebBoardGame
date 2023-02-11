import { useState } from "react";
import HomeHeader from "./header";
import LoginUI from "./login";


export default function Home({ children, home }) {
	const [nickname, setNickname] = useState("");
	const [tabStatus, setTabStatus] = useState("anonymous");

	return (
		<main className="flex flex-col absolute w-full h-full justify-center items-center bg-no-repeat bg-center bg-cover bg-back2">
			{/* <HomeHeader /> */}
			<div>
				<span className="font-alssu text-[8rem] text-black">얼쑤</span>
				<span className="font-alssu text-[8rem] text-white"> : </span>
				<span className="font-alssu text-[8rem] text-black">곶감전</span>
			</div>
			<LoginUI />

		</main>
	);
}
