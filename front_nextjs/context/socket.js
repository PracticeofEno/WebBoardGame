import io from "socket.io-client";
import { createContext } from "react"; 
import Cookies from "js-cookie";

export  const socket = io("http://localhost:5000/game", {
	transportOptions: {
	  polling: {
		extraHeaders: {
		  Authorization: "Bearer " + Cookies.get("jwt"),
		},
	  },
	},
  });
export const SocketContext = createContext();