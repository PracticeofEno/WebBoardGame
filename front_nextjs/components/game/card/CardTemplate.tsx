import Image from "next/image";

export default function CardTemplate({ name, src, detail }) {
  return (
    <div className="flex w-full h-full padding">
      <Image
        src={src}
        alt="Picture of the author"
        fill={true}
        sizes="100vw, 50vw,33vw"
        priority={true}
        className={`test`}
      />
      <div style={{ height: "8%" }}></div>
      <div className={`name font-face`}> {name} </div>
      <div style={{ height: "55%" }}></div>
      <div className={`detail`}> {detail} </div>

    <style jsx>{`
        .test {
          object-fit: fill;
          object-position: 50% 50%;
        }

        .padding {
          padding-left: 25%;
          padding-right: 25%;
        }
        .name {
          width: 20%;
          height: 8%;
          z-index: 11;
          font-size: 75%;
          font-family: "alssu";
          margin-left: 24%;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .detail {
          padding-left: 30%;
          padding-right: 30%;
          font-size: 50%;
          font-family: "alssu";
          height: 20%;
          z-index: 11;
          overflow: hidden;
          word-wrap: break-word;
          padding-top: 3%;
        }
    `}</style>
    </div>
  );
}
