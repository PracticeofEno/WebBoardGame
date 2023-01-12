import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getRoomJwtCode } from "./api/Game"
import queryString from 'query-string';
import axios from "axios";

const socketOptions = {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: "Bearer " + Cookies.get("jwt"),
        },
      },
    },
};


export default function Tmp() {
  const [room, setRoom] = useState("");
  const router = useRouter();
  let haha;

  useEffect(() => {
    (async () => {
      const posts = await axios.get(
        "/api/game/" + queryString.parse(router.asPath)["/test_invite?c"]
      );
      Cookies.set("jwt", posts.data);
      router.push('/test_lobby');
    })();
  }, []);

  const handleClick = () => {
    const res = {
        id: '15',
        room: room
    }
    Cookies.set('jwt', res);
    console.log(Cookies.get('jwt'));
    router.push('/test_lobby');
  };

  return (
    <div className={`flex absolute w-full h-full flex-col`}>
      <button onClick={handleClick} className="w-[9rem] h-[4rem] bg-gray-400 border-2 border-green-400">1</button>
      <input
        type="text"
        onChange={(e) => setRoom(e.target.value)}
        className="h-24 border text-5xl px-4 placeholder:font-alssu"
        placeholder={"이름"}
      ></input>
    </div>
  );
}
