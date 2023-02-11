import { useEffect, useState } from "react";
import { addUser, getSelf } from "../../pages/api/User";
import { login, inviteLogin } from "../../pages/api/Auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import AlterModal from "../modal/AlterModal";

export default function LoginUI() {
	const [nickname, setNickname] = useState("");
	const [password, setPassword] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] =useState("");
	const router = useRouter();

	async function apiAddUser()  {
		try {
			let res = await addUser(nickname, password);
			setModalContent("회원가입 성공");
			setModalOpen(true);
			setNickname("");
			setPassword("");
			console.log("회원가입 성공");
		}
		catch (e) {
			setModalContent("회원등록 실패(중복 or 빈칸상태)");
			setModalOpen(true);
			setNickname("");
			setPassword("");
			
			console.log("회원가입 실패");
		}
	}

	async function apiLogin() {	
		console.log(router.query.c)	
		if (router.query.c) {
			try {
				let res = await inviteLogin(nickname, password, String(router.query.c));
				// console.log(res);
				Cookies.set('jwt', res);
				let res2 = await getSelf();
				if (res2.nickname == "")
					router.push("/guest");
				else	
					router.push("/grid2");
			}
			catch (e) {
				setModalContent("로그인 실패");
				setModalOpen(true);
				setNickname("");
				setPassword("");
			}
		}
		else {
			try {
				let res = await login(nickname, password);
				Cookies.set('jwt', res);
				let res2 = await getSelf();
				if (res2.nickname == "")
					router.push("/guest");
				else	
					router.push("/grid2");
			}
			catch (e) {
				setModalContent("로그인 실패");
				setModalOpen(true);
				setNickname("");
				setPassword("");
			}
		}
		
	}

	return (
		<div className="flex justify-evenly flex-col w-[35rem] h-[25rem]">
			<AlterModal isOpen={modalOpen} closeFunction={() => setModalOpen(false)}>
				{	modalContent	}
			</AlterModal>
			<input
				type="text"
				onChange={(e) => setNickname(e.target.value)}
				className="h-16 border text-4xl px-4 my-4 placeholder:font-alssu"
				value={nickname}
				placeholder={"아이디"}
			>
			</input>

			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				className="h-16 border text-5xl px-4 my-4 placeholder:font-alssu "
				value={password}
				placeholder={"password"}
			>
			</input>

			<div className="flex justify-between items-center h-24 space-x-0">
				<button onClick={apiLogin} className="button w-2/5 h-full rounded-2xl">
					입장
				</button>

				<button onClick={apiAddUser} className="button w-2/5 h-full rounded-2xl">
					회원 등록
				</button>
			</div>

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
