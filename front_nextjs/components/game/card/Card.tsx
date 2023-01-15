import Image from "next/image";

export default function Card({ name, src, detail }) {
  return (
	<div className="w-full h-full relative">
		<img src="/images/card_template.svg" alt="" className="absolute w-full h-full"/>
		<img src={src} alt="" className="ImgCharacter"/>
		<p className="CardTitle">{name}</p>
      	<p className="CardDetail">{detail}</p>
		<style jsx>{`
			.ImgCharacter {
				width: 65%;
				height: 65%;
  				position: absolute;
  				top: 8%;
  				left: 16%;
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
