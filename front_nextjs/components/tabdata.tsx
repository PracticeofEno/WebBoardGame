import { useState } from "react";
import HomeAvatar from "./avatar";
import { Login } from "../pages/user";

export default function TabData() {
  const [nickname, setNickname] = useState("");
  
  async function login() {
    let tmp = await Login(nickname, "");
    console.log(tmp);
  }

  return (
    <div className={`data`}>
      <div style={{ height: "70%" }}>
        <div className={`infoSection`}>
          <div
            style={{
              display: "block",
              width: "35%",
              height: "100%",
              position: "relative",
            }}
          >
            <HomeAvatar />
          </div>
          <span className={`nicknameSpan`}>
            <h5 className={`nicknameText`}> 캐릭터와 닉네임을 선택</h5>
            <input
              onChange={(e) => setNickname(e.target.value)}
              className={`inputText`}
              type="text"
              placeholder="123"
              maxLength={20}
              value={nickname}
            ></input>
          </span>
        </div>
      </div>
      <div
        style={{
          height: "25%",
          borderStyle: "solid none none",
          borderTop: "solid",
          borderColor: "white",
          borderWidth: "1px",
        }}
      >
        <button
          onClick={login}
          className={`loginButton border-2 border-white-400`}
        >
          <i></i>
          <strong>시작하기</strong>
        </button>
      </div>
      <style jsx>
        {`
          .data {
            background-color: rgba(80, 24, 81, 0.8);
            flex: 110%
            display: flex;
            height: 100%;
            flex-direction: column;
          }
          .infoSection {
            margin: 15px 25px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 90%;
          }

          .avatar {
            top: 13%;
            left: 5%;
            width: 40%;
            height: 50%;
            border: 5px solid rgb(255, 255, 255);
            border-radius: 50%;
            margin: 0px;
            position: relative;
            justify-content: center;
            padding-bottom: 30.26%;
          }

          .avatarRefresh {
            cursor: pointer;
            position: absolute;
            bottom: 0px;
            right: -10px;
            padding: 0px;
            width: 40%;
            height: 40%;
            background-color: rgb(255, 255, 255);
            border: 2px solid rgb(255, 255, 255);
            border-radius: 50%;
            content: "";
          }

          .inputText {
            height: 46px;
            display: block;
            background-color: rgba(255, 255, 255, 0.8);
            border: 2px solid rgba(255, 255, 255, 0.8);
            border-radius: 7px;
            font-family: Bold;
            font-size: 28px;
            color: rgba(43, 67, 201, 0.8);
            padding: 0px 10px;
          }

          .nicknameSpan {
            width: 40%;
            display: flex;
            flex-direction: column;
            margin-left: 20%;
            justify-content: center;
          }

          .nicknameText {
            
            font-family: Black;
            font-size: 100%;
            color: rgb(119, 109, 109);
            text-align: center;
            line-height: 19px;
            margin: 0px 15px 20px;
          }

          .loginButton {
            left: 35%;
            top: 7%;
            position: relative;
            font-size: 19px;
            width: 30%;
            height: 70%;
          }

          .playSmall {
            width: 23px;
            height: 29px;
            background-image: url("/images/ic_play.svg");
          }

          .avatarImg {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}
