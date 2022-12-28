import { useState } from "react";
import ChatMessage from "./ChatMessage";

export default function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {id: 1, nickname:"111", message:"hi"}, 
        {id: 2, nickname:"222", message:"hi"}
    ]);
    const ret = (): JSX.Element[] => {
        const ret2 = messages.map(
            (tmp, index) => {
                return (<ChatMessage id={tmp.id} message={tmp.message} nickname={tmp.nickname} key={index}/>)
        });
        return ret2;
    }

    function addChatMesage() {
        let tmp = messages.slice(0, 10);
        setMessages([{id: 1, message: message, nickname:"111"}, ...tmp] )
        setMessage("");
    }

    return (
      <div className={`chat`}>
        <div className={'chatUI'}>
            <input
                onChange={(e) => setMessage(e.target.value)}
                className={`inputText`}
                type="text"
                placeholder="message"
                maxLength={20}
                value={message}
              ></input>
            <button onClick={addChatMesage} className={'send'}>Send</button>
            
        </div>
        {
            ret()
        }
        <style jsx>
          {`
            .chat {
              display: flex;
              border: 4px rgba(14, 14, 10, 0.15) solid;
              width: 100%;
              height: 100%;
              position: relative;
              flex-direction: column-reverse;
              border-radius: 30px;
            }

            .chatUI {
                display: flex;
                flex-direction: row;
            }

            .inputText {
                position: relative;
                width: 85%;
                height: 100%;
                display: block;
                background-color: rgba(255, 255, 255, 0.3);
                border: 2px solid rgba(255, 255, 255, 0.7);
                border-radius: 15px;
                font-family: Bold;
                font-size: 28px;
                color: rgba(43, 67, 201, 0.8);
                padding: 0px 10px;
            }

            .send {
                position: relative;
                width: 15%;
                height: 100%;
                display: block;
                border: 2px solid rgba(255, 255, 255, 0.7);
                border-radius: 15px;
                font-family: Bold;
                font-size: 28px;
                color: rgba(43, 67, 201, 0.8);
                padding: 0px 10px;
            }
          `}
        </style>
      </div>
    );
  }