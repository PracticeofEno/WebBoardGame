import { useState } from "react";
import Image from "next/image";

export default function homeAvatar() {
  const [avatar, setAvatar] = useState("/images/avatar/1");

  function handleAvatarRefresh() {
    let tmp = Math.floor(Math.random() * 45) + 1;
    let newAvatar;
    newAvatar = avatar.substring(0, 15);
    newAvatar = newAvatar + tmp;
    setAvatar(newAvatar);
  }

  return (
    <div className={`avatar`}>
      <Image
        src={avatar}
        alt="Picture of the author"
        fill={true}
        sizes="100vw, 50vw,33vw"
        priority={true}
        className={`avatarImg`}
      />
      <button
        onClick={handleAvatarRefresh}
        className={`avatarRefresh`}
      ></button>
      <style jsx>
        {`
          .avatar {
            disflay: flex;
            width: 100%;
            height: 100%;
            border: 5px solid rgb(255, 255, 255);
            border-radius: 50%;
            margin: 0px;
            position: relative;
            justify-content: center;
            padding-bottom: 30.26%;
          }

          .avatarRefresh {
            cursor: pointer;
            position: absolute;
            bottom: 0px;
            right: -10px;
            padding: 0px;
            width: 40%;
            height: 40%;
            background-color: rgb(255, 255, 255);
            border: 2px solid rgb(255, 255, 255);
            border-radius: 50%;
            content: "";
          }

          .avatarImg {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}
