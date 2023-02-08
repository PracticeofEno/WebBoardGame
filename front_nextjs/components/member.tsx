import { useState } from "react";
import HomeAvatar from "./avatar";
import { addUser } from "../pages/api/User";

export default function MemberRender() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("/images/avatar/1.svg");

  function handleAvatarRefresh() {
    let tmp = Math.floor(Math.random() * 45) + 1;
    let newAvatar;
    newAvatar = avatar.substring(0, 15);
    newAvatar = newAvatar + tmp + ".svg";
    setAvatar(newAvatar);
  }

  async function postUser() {
    let tmp = await addUser(nickname, password);
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
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <h5
                style={{
                  display: "flex",
                  fontFamily: "Black",
                  fontSize: "100%",
                  color: "rgb(119, 109, 109)",
                  textAlign: "center",
                  lineHeight: "19px",
                  margin: "0px 15px 20px",
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {" "}
                닉네임
              </h5>
              <input
                onChange={(e) => setNickname(e.target.value)}
                className={`inputText`}
                type="text"
                placeholder="nickname"
                maxLength={20}
                value={nickname}
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <h5
                style={{
                  display: "flex",
                  fontFamily: "Black",
                  fontSize: "100%",
                  color: "rgb(119, 109, 109)",
                  textAlign: "center",
                  lineHeight: "19px",
                  margin: "0px 15px 20px",
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {" "}
                password
              </h5>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={`inputText`}
                type="password"
                placeholder="password"
                maxLength={20}
                value={password}
              ></input>
            </div>
          </span>
        </div>
      </div>
      <div style={{height: '25%', borderStyle:'solid none none', borderTop:'solid', borderColor:'white', borderWidth: '1px' }}>
        <button onClick={ postUser } className={`loginButton border-2 border-white-100`}>
          <i></i>
          <strong>시작하기</strong>
        </button>
      </div>
      <style jsx>
        {`
          .data {
            background-color: rgba(80, 24, 81, 0.25);
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
            position: relative;
            width: 100%;
            top: 20%;
            height: 40%;
            display: block;
            background-color: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.7);
            border-radius: 7px;
            font-family: Bold;
            font-size: 28px;
            color: rgba(43, 67, 201, 0.8);
            padding: 0px 10px;
          }

          .nicknameSpan {
            width: 70%;
            display: flex;
            flex-direction: column;
            left: 20%;
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
