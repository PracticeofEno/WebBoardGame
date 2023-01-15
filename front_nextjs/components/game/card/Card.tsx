import Image from "next/image";

export default function Card({ name, src, detail }) {
  return (
	<div className="w-full h-full relative">
		<img src="/images/card_template.svg" alt="" className="w-full h-full"/>
		<img src={src} alt="" className="ImgCharacter"/>
		<div className="CardTitle">{name}</div>
      	<div className="CardDetail">{detail}</div>
		<style jsx>{`
			.ImgCharacter {
				width: 70%;
  				hight: 70%;
  				position: absolute;
  				top: 20%;
  				left: 13%;
			}

			.CardTitle {
				position: absolute;
  				top: 7%;
  				left: 16%;
  				font-size: 2.3vw;
  				font-weight: 500;
  				font-family: 'alssu';
			}

			.CardDetail {
				position: absolute;
  				bottom: 15%;
  				left: 17%;
  				font-size: 1vw;
  				font-weight: 300;
  				font-family: 'alssu';
  				text-align: center;
  				break-word;
			}
		`}</style>
	</div>
      
  );
}
