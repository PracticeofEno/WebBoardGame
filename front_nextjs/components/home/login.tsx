import Image from "next/image";
import { useState } from "react";
import Avatar from "../avatar";
import { addUser, getSelf } from "../../pages/api/User";
import { login } from "../../pages/api/Auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function LoginUI() {
	const [nickname, setNickname] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	async function apiAddUser() {
		try {
			let res = await addUser(nickname, password);
			console.log("회원가입 성공");
		}
		catch (e) {
			console.log("회원가입 실패");
		}
	}

	async function apiLogin() {
		try {
			let res = await login(nickname, password);
			console.log(res);
			Cookies.set('jwt', res);
			let res2 = await getSelf();
			if (res2 == "")
				router.push("/guest");
			else	
				router.push("/test_lobby");
		}
		catch (e) {
			console.log("로그인 실패");
		}
	}

	return (
		<div className="flex justify-evenly flex-col w-[50rem] h-[50rem]">
			<input
				type="text"
				onChange={(e) => setNickname(e.target.value)}
				className="h-24 border text-5xl px-4 placeholder:font-alssu"
				placeholder={"이름"}
			>
			</input>

			<input
				type="text"
				onChange={(e) => setPassword(e.target.value)}
				className="h-24 border text-5xl px-4 placeholder:font-alssu "
				placeholder={"암호"}
			>
			</input>

			<div className="flex justify-between items-center h-24 space-x-0">
				<button onClick={apiLogin} className="button w-2/5 h-full rounded-2xl">
					입장
				</button>

				<button onClick={apiAddUser} className="button w-2/5 h-full rounded-2xl">
					회원 가입
				</button>
			</div>

			<button className="button h-24 rounded-2xl">
				손님으로 입장
			</button>

			<button className="button h-24 rounded-2xl">
				구글 계정으로 입장
			</button>

			<style jsx>{`
        .button {
          border: 1px solid black;
          font-family: "alssu", sans-serif;
          font-size: 3rem;
          letter-spacing: 0.4rem;
          font-weight: 500;
          color: #000;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transition: all 0.3s ease 0s;
          cursor: pointer;
        }
        
        .button:hover {
          transform: translateY(-3px);
        }
      `}</style>
		</div>
	);
}
