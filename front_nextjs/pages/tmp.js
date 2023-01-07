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
    src: "/images/card_template.svg",
    detail: "얼쑤얼쑤 다음줄도 한번 보자 근데 좀 작네 이건",
 },
];

export default function Tmp() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(tmp);
  });

  return (
    <div className={`flex absolute w-full h-full flex-col`}>
      <div className={`w-40 h-40`}>
        <Card key={`${tmp[0].id}`} name={`${tmp[0].name}`} src={`${tmp[0].src}`} detail={`${tmp[0].detail}`}/>
      </div>
    </div>
  );
}
