import CardTemplate from "./CardTemplate";

export default function Card({name, src, detail}) {
    return (
        <CardTemplate name={name} src={src} detail={detail}/>
    )
  }