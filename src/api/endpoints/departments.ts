import {api} from "@/api/api";

export const getDepartments = async () => {
    const response = await api.get('/departments');

    return response.data;
}

export const getPublicDepartments = async () => {
    const {data} = await api.get('/departments/public');

    return data;
}