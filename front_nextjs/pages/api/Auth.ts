import axios, { type AxiosResponse } from "axios";

export async function login(nickname: string, password: string) {
    const response = await axios.post("/api/auth/login",
        {
          nickname: nickname,
          password: password
        },
      );
    return response.data;  
}