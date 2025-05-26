import { getDepartments } from "@/api/endpoints/departments";
import {create} from "zustand/react";
import {addUser} from "@/api/endpoints/users.ts";

interface DepartmentsState {
    departments: { id: string; name: string }[];
    total: number;
    page: number;
    size: number;
    loading: boolean;
    error: string | null;
    fetchDepartments: () => Promise<void>;
    addDepartment: () => Promise<void>;
}

export const useDepartmentsStore = create<DepartmentsState>((set) => ({
    departments: [],
    total: 0,
    page: 1,
    size: 10,
    loading: false,
    error: null,
    fetchDepartments: async () => {
        set({ loading: true, error: null });
        try {
            const response: DepartmentsState = await getDepartments();
            set({ departments: response.departments, total: response.total, loading: false });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : String(error), loading: false });
        }
    },
    addDepartment: async () => {
        set({ loading: true, error: null });
        try{
            const response = await addUser()
        }
    }
}));