import {create} from "zustand/react";
import {getUsers} from "@/api/endpoints/users.ts";

interface department {
    id: string;
    name: string;
}

interface IUser {
    id: string;
    username: string;
    name: string;
    role: string;
    active: boolean;
    department: department | null;

}

interface UsersState {
    users: IUser[];
    total: number;
    page: number;
    size: number;
    loading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
    users: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    size: 10,
    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getUsers();
            set({ users: response.data, loading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : String(error), loading: false });
        }
    },
}))