import { create } from "zustand/react";
import { getUsers, addUser } from "@/api/endpoints/users";
import { IUser, CreateUserPayload } from "@/types/users.ts";

interface UsersState {
    users: IUser[];
    total: number;
    page: number;
    size: number;
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (user: CreateUserPayload) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
    users: [],
    total: 0,
    page: 1,
    size: 10,
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const users = await getUsers();
            set({ users: users.data, loading: false });
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
