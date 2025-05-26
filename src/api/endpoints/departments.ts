import axiosInstance from "@/api/api.ts";

export const getDepartments = async () => {
    const response = await axiosInstance.get('/departments');

    return response.data;
}