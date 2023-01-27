import axios, { type AxiosResponse } from "axios";

export async function login(id: string, password: string) {
	let response;
    	response = await axios.post("/api/auth/login",
	        {
          		id: id,
          		password: password
        	},
      	);
    return response.data;  
}

export async function inviteLogin(id: string, password: string, room: string) {
	let response;
    	response = await axios.post("/api/auth/invite-login",
	        {
          		id: id,
          		password: password,
				room: room
        	},
      	);
    return response.data;  
}