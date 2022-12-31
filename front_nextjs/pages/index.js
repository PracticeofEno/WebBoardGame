import Head from 'next/head'
import styles from '../styles/Home.module.css';
import MainPage from '../components/layout'
import SocketIOClient from "socket.io-client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  useEffect(() => {
    console.log("execute useEffect");
    // connect to socket server
    const socket = SocketIOClient.connect("http://localhost:5050/game");

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    // update chat on new message dispatched
    socket.on("message", (message) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  return (
    <MainPage>
    </MainPage>
  )
}