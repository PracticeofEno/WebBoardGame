import axios, { type AxiosResponse } from "axios";

export async function login(nickname: string, password: string) {
	let response;
    	response = await axios.post("/api/auth/login",
	        {
          	nickname: nickname,
          	password: password
        	},
      	);
    return response.data;  
}