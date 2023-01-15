import Image from "next/image";
import { useEffect, useState } from "react";

export default function Token({gold}) {
	const [src2, setSrc2] = useState("/images/1.svg");
	useEffect(() => {
		if (gold === "1") 
			setSrc2("/images/1.svg");
		if (gold === "5") 
			setSrc2("/images/5.svg");
		if (gold === "10") 
			setSrc2("/images/10.svg");
	});
	
	return (
		<div className="relative w-full h-full flex-row justify-start">
			<Image
        		src={src2}
        		alt="코인 토큰"
        		fill={true}
        		priority={true}
				sizes="100vw, 100vw,100vw"
      		/>
			<style jsx>{`
				
			`}</style>
		</div>
	);
}
