import axios, { type AxiosResponse } from "axios";

export async function getRoomJwtCode(code: string,) {
    const response = await axios.get("/api/game/" + code);
    return response.data;  
}