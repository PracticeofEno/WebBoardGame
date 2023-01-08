import Image from "next/image";
import { useState } from "react";
import Avatar from "../avatar"

export default function LoginUI() {
  const [nickname, setNickname] = useState("");
  const [tabStatus, setTabStatus] = useState("anonymous");

  return (
    <div className="flex w-[35rem] h-96 bg-gray-400 bg-opacity-80 flex-col">
      <div className="flex w-[35rem] h-20 justify-center items-center">
        <div>this is announce ment</div>
      </div>
      <div className="flex w-[35rem] h-96 flex-col">
        <div className="flex w-full h-ull flex-row">
          <div className="flex w-[12rem] h-48 justify-center border-cyan-300 border-y-2 border-l-2 border-r-1">
            <Avatar/>
          </div>
          <div className="flex w-[22.2rem] h-48 bg-pink-400 justify-center flex-col">
            <div className="flex w-[22.2rem] h-24 justify-center items-center border-t-2 border-y border-l-2 border-x border-cyan-300 rounded">
              <input
                type="text"
                className="flex relative w-[14rem] h-[4rem] rounded"
                placeholder={"아이디"}
              ></input>
            </div>
            <div className="flex w-[22.2rem] h-24 justify-center items-center border-b-2 border-y border-l-2 border-x border-cyan-300 rounded">
              <input
                type="text"
                className="flex relative w-[14rem] h-[4rem] rounded"
                placeholder={"비밀번호"}
              ></input>
            </div>
          </div>
        </div>
        <div className="flex w-[35rem] h-full flex-row justify-center items-center">
          <button className="flex w-[12rem] h-[4rem] rounded-2xl button justify-center items-center">
            로그인
          </button>
          <div className="w-[3rem]"> </div>
          <button className="flex w-[12rem] h-[4rem] rounded-2xl button justify-center items-center">
            등록
          </button>
        </div>
      </div>
      <style jsx>{`
        .button {
          font-family: "alssu", sans-serif;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          font-weight: 500;
          color: #000;
          background-color: rgba(255, 0, 0, 0.3);
          border: none;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease 0s;
          cursor: pointer;
          outline: none;
        }
        .button:hover {
          background-color: #2ee59d;
          box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
          color: #fff;
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}
