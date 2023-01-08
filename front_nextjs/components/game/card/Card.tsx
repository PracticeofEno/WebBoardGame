import CardTemplate from "./CardTemplate";
import Image from "next/image";

export default function Card({ name, src, detail }) {
  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col`}>
      <CardTemplate name={name} src={src} detail={detail} />
    </div>
  );
}
