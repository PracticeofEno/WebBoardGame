import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserView({nickname2, src2}) {

	const [avatar, setAvatar] = useState("/api/images/avatar/1");
	const [nickname, setNickname] = useState("tmp");
	useEffect(() => {
		setAvatar(src2);
		setNickname(nickname2);
	})
	return (
		<div className={`relative w-full h-full flex flex-row justify-center` }>
			<div className="flex flex-row relative w-1/5 h-full justify-center items-center">
				<img src={`${avatar}`} width="100" height="114" alt="X" className="rounded-[12rem]"/>
			</div>
			<div className="flex relative w-1/5 h-full justify-center items-center text-7xl font-['alssu']">
					{nickname}
			</div>
			
		</div>
	);
}
