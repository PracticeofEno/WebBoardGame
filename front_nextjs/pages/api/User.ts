import axios, { type AxiosResponse } from "axios";

export async function addUser(nickname: string, password: string) {
    const response = await axios.post("/api/user/",
        {
          nickname: nickname,
          password: password
        },
      );
    return response.data;  
}