import Image from "next/image";
import { useState } from "react";
import Avatar from "../avatar"

export default function LoginUI() {
  const [nickname, setNickname] = useState("");
  const [tabStatus, setTabStatus] = useState("anonymous");

  return (
    <div className="flex justify-evenly flex-col w-[50rem] h-[50rem]">
      <input
        type="text"
        className="h-24 border text-5xl px-4 placeholder:font-alssu"
        placeholder={"이름"}
      >
      </input>
        
      <input
        type="text"
        className="h-24 border text-5xl px-4 placeholder:font-alssu "
        placeholder={"암호"}
      >
      </input>

      <div className="flex justify-between items-center h-24 space-x-0">
          <button className="button w-2/5 h-full rounded-2xl">
            입장
          </button>

          <button className="button w-2/5 h-full rounded-2xl">
            회원 가입
          </button>
      </div>

      <button className="button h-24 rounded-2xl">
            손님으로 입장
      </button>

      <button className="button h-24 rounded-2xl">
            구글 계정으로 입장
      </button>

      <style jsx>{`
        .button {
          font-family: "alssu", sans-serif;
          font-size: 3rem;
          letter-spacing: 0.4rem;
          font-weight: 500;
          color: #000;
          background-image: url('/images/button_background.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transition: all 0.3s ease 0s;
          cursor: pointer;
        }
        
        .button:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}
