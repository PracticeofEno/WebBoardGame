import Image from "next/image";
import { useState } from "react";

export default function Player() {
    const [avatar, setAvatar] = useState("/images/avatar/1.svg");
    
  return (
    <div className={`player`}>
        <div className={`nickname`}>nickname</div>
        <div className={`imgContainer`}>
            <Image
                src={avatar}
                alt="Picture of the author"
                fill={true}
                sizes="100vw, 50vw,33vw"
                priority={true}
                className={`avatarImg`}
            />
        </div>
        
      <style jsx>
        {`
          .player {
            display: block;
            border: 4px rgba(14, 14, 10, 0.15) solid;
            border-radius: 50px;
            width: 100%;
            height: 100%;
            position: relative;
            flex-direction: column;
          }
          .nickname {
            display: flex;
            width: 70%;
            justify-content: center;
            height: 15%;
            align-items: center;
            font-size: 25px;
            background-color: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.7);
            border-radius: 100px;
            margin-left: 15%;
          }
          .imgContainer {
            display: flex;
            width: 100%;
            justify-content: center;
            height: 85%;
            position: relative;
          }
          .avatarImg{
            display: flex;
            width: 100%;
            justify-content: center;
            height: 15%;
          }
        `}
      </style>
    </div>
  );
}
