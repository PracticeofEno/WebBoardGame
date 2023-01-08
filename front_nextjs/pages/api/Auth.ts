import axios, { type AxiosResponse } from "axios";

export async function getUserByEmail() {
    // const response = await axios.get("/api/users", {
    //     headers: {
    //         Authorization: `Bearer ` + cookies.get("jwt"),
    //     },
    // });
    const response = await axios.get("/api/users", {
    });
    return response.data;  
}