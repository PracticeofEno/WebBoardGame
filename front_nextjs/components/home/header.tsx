import { useState } from "react";

export default function HomeHeader() {

    const [isClick, setClick] = useState(false);

    function toggleFullScreen(event) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }

    return (
      <header>
        <div className="naviItem"><button onClick={toggleFullScreen} className="w-full h-full bg-maximize bg-no-repeat bg-center bg-contain"></button></div>
        <div className="naviItem"><button onClick={() => {setClick((e) => !e);}} className="w-full h-full bg-rullbook bg-no-repeat bg-center bg-contain"></button></div>
        {isClick && (<div onClick={() => {setClick((e) => !e);}} className="topLayer flex justify-center items-center fixed top-0 left-0 w-screen h-screen backdrop-blur-sm">
          <div onClick={(event) => {
            event.stopPropagation();
          }}
          className="flex w-3/4 h-3/4">
            <div className="border-4 border-black w-1/2 h-full"></div>
            <div className="border-4 border-black w-1/2 h-full"></div>
          </div>
        </div>)}
        <style jsx>
          {`
          header {
            position: fixed;
            top: 0;
            left: 0;
            height: 10%;
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
          }

          .naviItem {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100px;
            padding: 2rem 1rem 0 1rem;
          }
          `}
        </style>
      </header>
    );
  }
  