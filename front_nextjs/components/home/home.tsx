import Image from "next/image";
import { useState } from "react";
import LoginUI from "./login"

export default function Home({ children, home }) {
  const [nickname, setNickname] = useState("");
  const [tabStatus, setTabStatus] = useState("anonymous");

  return (
    <div className="flex flex-col absolute w-full h-full justify-center items-center bg-alssu_theme bg-opacity-20 bg-no-repeat bg-center bg-cover">
      <h1 className="font-alssu text-6xl mb-5 text-lime-300">얼쑤 곶감전</h1>
      <div className="flex w-[35rem] h-96 flex-col overflow-hidden relative border-4 rounded border-cyan-300 border-opacity-70">
        <LoginUI/>
      </div>    
      <style jsx>
        {`
        `}
      </style>
    </div>
  );
}
