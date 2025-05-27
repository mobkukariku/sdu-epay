import { create } from "zustand/react";
import { getUsers, addUser } from "@/api/endpoints/users";
import {IUser, CreateUserPayload, UserQuery} from "@/types/users.ts";

interface UsersState {
    users: IUser[];
    total: number;
    page: number;
    size: number;
    loading: boolean;
    error: string | null;
    fetchUsers: (query?: UserQuery) => Promise<void>;
    addUser: (user: CreateUserPayload) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
    users: [],
    total: 0,
    page: 1,
    size: 10,
    loading: false,
    error: null,

    fetchUsers: async (query?: UserQuery) => {
        set({ loading: true, error: null });
        try {
            const users = await getUsers(query);
            set({
                users: users.data,
                total: users.total ?? users.data.length,
                page: query?.page ?? 0,
                size: query?.size ?? 10,
                loading: false,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
        }
    },

    addUser: async (user) => {
        set({ loading: true, error: null });
        try {
            const newUser = await addUser(user);
            set((state) => ({
                users: [...state.users, newUser],
                loading: false
            }));
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
        }
    },
}));
