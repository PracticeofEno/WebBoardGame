import axios, { type AxiosResponse } from "axios";

export async function addUser() {
    // const response = await axios.get("/api/users", {
    //     headers: {
    //         Authorization: `Bearer ` + cookies.get("jwt"),
    //     },
    // });
    const response = await axios.get("/api/users", {
    });
    return response.data;  
}