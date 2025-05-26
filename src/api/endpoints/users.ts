import axiosInstance from "@/api/api.ts";

export const getUsers = async () => {
    const response = await axiosInstance.get('/users');

    return response.data;
}

export const addUser = async (user: { username: string; password: string; name: string; role: string; department_id?: string }) => {
    const response = await axiosInstance.post('/users', user);
    return response.data;
}