import CardTemplate from "./CardTemplate";
import Image from "next/image";

export default function Card({name, src, detail}) {
    return (
        <div className={`relative w-full h-full overflow-hidden flex flex-col`}>
            <div className={`top_padding`}/>
            <CardTemplate name={name} src={src} detail={detail}/>
            <div className={`name relative font-face`}> {name} </div>
            <div className="relative image justify-center items-center"> 
                <div className="flex w-full h-full justify-center">
                <Image
                    src={`${src}`}
                    alt="Picture of the author"
                    fill={true}
                    sizes="1vw, 1vh, 1vw"
                    priority={true}
                />
                </div>
            </div>
            <div className={`detail pt-4`}> {detail} </div>
        <style jsx>{`
        .top_padding {
            height:7%;
        }
        .image {
            height:50%;
            z-index: 11;
        }
        .name {
            margin-left: 20%;
            width: 20%;
            height: 10%;
            z-index: 11;
            font-size:  10%;
            font-family: "alssu";
          }
          .detail {
            position: relative;
            width: 100%;
            height: 20%;
            font-size: 1%;
            padding-left: 25%;
            padding-right: 25%;
            font-size: xx-small;
            font-family: "alssu";
            z-index: 11;
            word-wrap: break-word;
          }
        `}</style>
        </div>
    )
  }