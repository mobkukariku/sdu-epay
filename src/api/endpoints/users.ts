import axiosInstance from "@/api/api.ts";

export const getUsers = async () => {
    const response = await axiosInstance.get('/users');

    return response.data;
}