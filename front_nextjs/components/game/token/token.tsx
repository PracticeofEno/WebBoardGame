import Image from "next/image";
import { useEffect, useState } from "react";

export default function Token({gold}) {
	const [src2, setSrc2] = useState("");
	useEffect(() => {
		console.log(gold);
		if (gold == "1") 
			setSrc2("/images/1.svg");
		if (gold == "5") 
			setSrc2("/images/5.svg");
		if (gold == "10") 
			setSrc2("/images/10.svg");
	});
	
	return (
		<div className="relative w-full h-full">
			<Image
        		src={src2}
        		alt="Picture of the author"
        		fill={true}
        		sizes="100vw, 50vw,33vw"
        		priority={true}
      		/>
			<style jsx>{`
				
			`}</style>
		</div>
	);
}
