import {api} from "@/api/api";

export const getDepartments = async () => {
    const response = await api.get('/departments');

    return response.data;
}