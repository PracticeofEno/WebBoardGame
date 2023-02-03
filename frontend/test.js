import { useEffect, useState, useContext } from "react";
import { Player } from "../utils/player";
import UserView from "../components/game/user/UserView";
import CardView from "../components/game/card/CardView";
import Grave from "../components/game/card/Grave";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { data } from "autoprefixer";

export default function Grid() {
  const [socket, setSocket] = useState(999);
  const [object, setObject] = useState(null);

  useEffect(() => {
    const socket_2 = socketio.connect("http://localhost:5000/game", {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: "Bearer " + Cookies.get("jwt"),
          },
        },
      },
    });
	setSocket(socket_2);

    socket?.on("current_user", (data) => {                 // 성공적으로 바뀌어서 바뀐 nickname이 랜더링됨
      setObject({...object, nickname: data.nickname})
    });

	socket?.on("some_event", (data) => {
		console.log(object.nickname)            // default value -> nickname
	})


  }, [self_number]);

  function showNickname() {
	console.log(object.nickname);                // example)       ->123 
  }

  return (
      <div>
          <CardView 
		  	gameSocekt= {socket}
          />
      </div>
  );
}
