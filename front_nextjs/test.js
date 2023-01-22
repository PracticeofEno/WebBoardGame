// import { useEffect, useState, useContext } from "react";
// import { Player } from "../utils/player";
// import UserView from "../components/game/user/UserView";
// import CardView from "../components/game/card/CardView";
// import Grave from "../components/game/card/Grave";
// import io from "socket.io-client";
// import Cookies from "js-cookie";

// export default function Grid() {
//   const [socket, setSocket] = useState(999);
//   const [self_number, setSelfNumber] = useState(999);

//   useEffect(() => {
//     const socket_2 = socketio.connect("http://localhost:5000/game", {
//       transportOptions: {
//         polling: {
//           extraHeaders: {
//             Authorization: "Bearer " + Cookies.get("jwt"),
//           },
//         },
//       },
//     });
// 	setSocket(socket_2);

//     socket?.on("player", (message) => {
//       console.log(`self_nubmer ${self_number}`);
//       setSelfNumber(message);
//     });
//   }, [self_number]);

//   return (
//       <div>
//           <CardView 
// 		  	gameSocekt= {socket}
//           />
//       </div>
//   );
// }
