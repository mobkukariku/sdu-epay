import {Department} from "@/types/departments.ts";

export interface IUser {
    id: string;
    username: string;
    name: string;
    role: string;
    active: boolean;
    department: Department | null;
}

export interface CreateUserPayload {
    username: string;
    password: string;
    name: string;
    role: string;
    department_id?: string;
}


export type UserQuery = {
    username?: string | null;
    role?: "SUPER_ADMIN" | "ADMIN" | "MANAGER" | undefined;
    department_id?: string | null;
    page?: number;
    size?: number;
};