import Image from "next/image";
import { useState } from "react";
import HomeHeader from "./header";
import LoginUI from "./login";


export default function Home({ children, home }) {
  const [nickname, setNickname] = useState("");
  const [tabStatus, setTabStatus] = useState("anonymous");

  return (
    <main className="flex flex-col absolute w-full h-full justify-center items-center bg-no-repeat bg-center bg-contain ">
      <HomeHeader/>
      <h1 className="font-alssu text-black">얼쑤 : 곶감전</h1>
        <LoginUI/>
      <style jsx>
        {`
        h1{
          font-size: 11rem;
        }
        `}
      </style>
    </main>
  );
}
