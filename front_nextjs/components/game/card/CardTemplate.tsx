import Image from "next/image";

export default function CardTemplate({ name, src, detail }) {
  return (
    <div className="flex w-full h-full absolute test">
      <Image
        src={"/images/card_template.svg"}
        alt="Picture of the author"
        fill={true}
        sizes="1vw, 1vh, 1vw"
        priority={true}
        className={`test`}
      />
    <style jsx>{`
      .test {
        z-index: 10;
        
      }
    `}</style>
    </div>
  );
}
