import Image from "next/image";

export default function CardTemplate({ name, src, detail }) {
  return (
    <div className="flex justify-centerrelative w-[12rem] h-[17.4rem] bg-card_template bg-no-repeat bg-center bg-contain">
      <div className="flex w-full flex-col">
        <div className="flex w-full h-[1.3rem] flex-row"/>
        <div className="flex w-full h-[1.3rem] flex-row">
          <div className="w-[1.5rem]"></div>
          <div className="w-[3rem] text-center text-xs font-['alssu']"> {name} </div>
        </div>
        <div className="flex w-full h-[9.5rem] flex-row"></div>
        <div className="flex w-full h-[4rem] flex-row">
          <div className="w-[2.5rem] h-[4rem] "></div>
          <div className="flex w-[7rem] h-[4rem] leading-[4rem] text-center text-base font-['alssu']">{detail}</div>
          <div className="w-[2.5rem] h-[4rem] "></div>
        </div>
      </div>
    </div>
  );
}
