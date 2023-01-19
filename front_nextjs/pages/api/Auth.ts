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