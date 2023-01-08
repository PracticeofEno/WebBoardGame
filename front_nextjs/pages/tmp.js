import Head from "next/head";
import styles from "../styles/Home.module.css";
import MainPage from "../components/layout";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import Card from "./../components/game/card/Card";

let tmp = [
  {
    id: '1',
    name: "여우",
    src: "/images/fox.svg",
    detail: "토끼와 곶감을 이김",
 },
 {
  id: '2',
  name: "토끼",
  src: "/images/rabbit.svg",
  detail: "곶감을 이김",
},
{
  id: '3',
  name: "호랑이",
  src: "/images/tiger.svg",
  detail: "토끼,여우를 이김",
},
{
  id: '4',
  name: "곶감",
  src: "/images/gam.svg",
  detail: "호랑이를 이김",
},
];



export default function Tmp() {
  const [cards, setCards] = useState([]);
  let k = 3;

  useEffect(() => {
    setCards(tmp);
  });

  return (
    <div className={`flex absolute w-full h-full flex-col`}>
      <div className={`flex relative w-[12rem] h-[17.4rem] bg-gray-400 justify-center`}>
        <Card key={`${tmp[k].id}`} name={`${tmp[k].name}`} src={`${tmp[k].src}`} detail={`${tmp[k].detail}`}/>
      </div>
    </div>
  );
}