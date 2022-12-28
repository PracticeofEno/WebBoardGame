import Image from "next/image";
import { useState } from "react";
import TabData from "./tabdata";
import MemberRender from "./member"

export default function MainPage({ children, home }) {
  const [avatar, setAvatar] = useState("/images/avatar/1.svg");
  const [nickname, setNickname] = useState("");
  const [tabStatus, setTabStatus] = useState("anonymous");

  return (
    <div className={`screen`}>
      <div className={`tabsDiv`}>
        <div className={`tab`}>
          <span
            className={tabStatus === "anonymous" ? "active" : "nonactive"}
            onClick={() => setTabStatus("anonymous")}
          >
            익명
          </span>
          <span
            className={tabStatus === "member" ? "active" : "nonactive"}
            onClick={() => setTabStatus("member")}
          >
            회원
          </span>
        </div>
        {tabStatus === "anonymous" ? <TabData /> : <MemberRender />}
      </div>
      

      <style jsx>
        {`
          .screen {
            border: 4px rgba(14, 14, 10, 0.15) solid;
            box-shadow: inset 0px 2px 0px 0px rgba(255, 255, 255, 0.15),
              0px 3px 0px 0px rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            position: absolute;
            top: 20%;
            left: 20%;
            width: 65%;
            height: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .tabsDiv {
            border: 2px rgba(61, 11, 175, 0.15) solid;
            border-radius: 12px;
            max-width: 100%;
            left: 15%;
            width: 70%;
            height: 60%;
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .tab {
            display: flex;
            flex-direction: row;
            height: 20%;
          }
          .active {
            display: flex;
            justify-content: center;
            align-items: center;
            border-width: 12px;
            font-size: 21px;
            width: 50%;
            background-color: rgba(80, 24, 81, 0.25);
            border-radius: 10px 10px 0px 0px;
            color: rgb(92, 255, 182);
            text-shadow: rgb(23, 5, 87) 3px 0px 0px,
              rgb(23, 5, 87) 2.83487px 0.981584px 0px,
              rgb(23, 5, 87) 2.35766px 1.85511px 0px,
              rgb(23, 5, 87) 1.62091px 2.52441px 0px,
              rgb(23, 5, 87) 0.705713px 2.91581px 0px,
              rgb(23, 5, 87) -0.287171px 2.98622px 0px,
              rgb(23, 5, 87) -1.24844px 2.72789px 0px,
              rgb(23, 5, 87) -2.07227px 2.16926px 0px,
              rgb(23, 5, 87) -2.66798px 1.37182px 0px,
              rgb(23, 5, 87) -2.96998px 0.42336px 0px,
              rgb(23, 5, 87) -2.94502px -0.571704px 0px,
              rgb(23, 5, 87) -2.59586px -1.50383px 0px,
              rgb(23, 5, 87) -1.96093px -2.27041px 0px,
              rgb(23, 5, 87) -1.11013px -2.78704px 0px,
              rgb(23, 5, 87) -0.137119px -2.99686px 0px,
              rgb(23, 5, 87) 0.850987px -2.87677px 0px,
              rgb(23, 5, 87) 1.74541px -2.43999px 0px,
              rgb(23, 5, 87) 2.44769px -1.73459px 0px,
              rgb(23, 5, 87) 2.88051px -0.838247px 0px;
          }

          .nonactive {
            display: flex;
            width: 50%;
            justify-content: center;
            align-items: center;
            font-family: Black;
            font-size: 19px;
            background-color: rgba(159, 133, 160, 0.25);
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            cursor: pointer;
            position: relative;
            padding: 0px 8px;
          }
        `}
      </style>
    </div>
  );
}
