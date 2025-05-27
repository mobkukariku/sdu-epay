import {api} from "@/api/api";
import {CreateUserPayload, IUser, UserQuery} from "@/types/users.ts";

export const getUsers = async (query?: UserQuery) => {
    const queryString = query
        ? '?' + new URLSearchParams(
        Object.entries(query).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value);
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString()
        : '';

    const { data } = await api.get(`/users${queryString}`);
    return data;
};

export const addUser = async (user: CreateUserPayload): Promise<IUser> => {
    const { data } = await api.post('/users', user);
    return data;
};
