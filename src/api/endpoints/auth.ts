import axiosInstance from "@/api/api.ts";

export const login  = async (username:string, password:string) => {
    const response = await axiosInstance.post("/auth/login", {username, password});

    return response.data;
}