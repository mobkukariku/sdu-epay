import {addDepartment, deleteDepartment, getDepartments, updateDepartment} from "@/api/endpoints/departments";
import {create} from "zustand/react";
import {Department, DepartmentQuery} from "@/types/departments.ts";

interface DepartmentsState {
    departments: Department[];
    total: number;
    page: number;
    size: number;
    loading: boolean;
    error: string | null;
    fetchDepartments: (query?:DepartmentQuery) => Promise<void>;
    addDepartment: (department: {name:string, additional_fields: any}) => Promise<void>;
    updateDepartment: (id: string, update: Department) => Promise<void>;
    deleteDepartment: (id: string) => Promise<void>;
}

export const useDepartmentsStore = create<DepartmentsState>((set) => ({
    departments: [],
    total: 0,
    page: 1,
    size: 10,
    loading: false,
    error: null,
    fetchDepartments: async (query?:DepartmentQuery) => {
        set({ loading: true, error: null });
        try {
            const response = await getDepartments(query);
            set({
                departments: response.data,
                total: response.total,
                page: query?.page ?? 0,
                size: query?.size ?? 10,
                loading: false
            });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : String(error), loading: false });
            throw error;
        }
    },
    addDepartment: async (department) => {
        set({ loading: true, error: null });
        try {
            const response: Department = await addDepartment(department);
            set((state) => ({
                departments: [...state.departments, response],
                loading: false
            }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : String(error), loading: false });
            throw error;
        }
    },
    updateDepartment: async (id, department) => {
        set({ loading: true, error: null });
        try {
            const response = await updateDepartment(id, department);
            set((state) => ({
                departments: state.departments.map((d) =>
                    d.id === id ? { ...d, ...response } : d
                ),
                loading: false
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : String(error),
                loading: false
            });
            throw error;
        }
    },
    deleteDepartment: async (id: string) => {
        set({ loading: true, error: null });
        try{
            await deleteDepartment(id);
            set({loading: false});
        }catch (error) {
            console.error(error);
            throw error;
        }
    }
}));