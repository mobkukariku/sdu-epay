import {api} from "@/api/api";
import {CreateUserPayload, IUser} from "@/types/users.ts";

export const getUsers = async () => {
    const { data } = await api.get('/users');
    return data;
};

export const addUser = async (user: CreateUserPayload): Promise<IUser> => {
    const { data } = await api.post('/users', user);
    return data;
};
