import Image from "next/image";
import { useState } from "react";

export default function ChatMessage(Props) {
    
  return (
    <div className={`chatMessage`}>
        {`${Props.nickname} : ${Props.message}`}
        
      <style jsx>
        {`
            .chatMessage {
                display: flex;
                width: 100%;

            }
        `}
      </style>
    </div>
  );
}
