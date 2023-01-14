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
		<div className={`relative w-full h-full flex flex-row justify-center`}>
			<div className="flex relative w-1/5 h-full justify-center items-center">
				<Image
        			src={avatar}
					alt="x"
					width="100"
					height="100"
					priority={true}
      			/>
			</div>
			<div className="flex relative w-3/5 h-full justify-center items-center">
				{nickname}
			</div>
		</div>
	);
}
