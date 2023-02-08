import axios, { type AxiosResponse } from "axios";
import Cookies from "js-cookie";

export async function addUser(nickname: string, password: string) {
	const response = await axios.post("/api/user/",
		{
			nickname: nickname,
			password: password
		},
	);
	return response.data;
}

export async function getSelf() {
	const response = await axios.get("/api/user/", {
		headers: {
			Authorization: `Bearer ` + Cookies.get("jwt"),
		},
	});
	return response.data;
}

export async function updateNickname(nickname: string) {

	const response = await axios.post("/api/user/nickname",
		{
			nickname: nickname
		},
		{
			headers: {
				Authorization: `Bearer ` + Cookies.get("jwt"),
			},
		});
	return response.data;
}
