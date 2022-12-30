import BigBox from "../components/lobby/BigBox";
import TopPadding from "../components/lobby/TopPadding";
import Chat from "../components/lobby/Chat";
import Middle from "../components/lobby/MiddlePannel";

export default function Lobby() {
  function useSocket(url) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
      fetch('http://localhost:5050/game').finally(() => {
        const socketio = io();
        socketio.on("connect", () => {
          console.log("connect");
          socketio.emit("hello");
        });
        socketio.on("disconnect", () => {
          console.log("disconnect");
        });
        setSocket(socketio);
      });
      function cleanup() {
        socket.disconnect();
      }
      return cleanup;
    }, []);
    return socket;
  }

  return (
    <BigBox>
      <TopPadding />
      <Middle />
      <Chat />
    </BigBox>
  );
}
