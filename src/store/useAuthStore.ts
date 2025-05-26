import {create} from "zustand/react";
import {login} from "@/api/endpoints/auth.ts";

interface AuthState {
    refresh: string | null,
    access: string | null,
    isAuthenticated: boolean,
    login: (username: string, password: string) => Promise<void>,
    logout: () => void,
}


export const useAuthStore = create<AuthState>((set) => ({
    refresh: null,
    access: null,
    isAuthenticated: false,
    login: async (username:string, password:string) => {
        try {
            const response: AuthState = await login(username, password);
            set({
                refresh: response.refresh,
                access: response.access,
                isAuthenticated: true,
            });
            if (response.refresh != null) {
                localStorage.setItem('refresh', response.refresh);
            }
            if (response.access != null) {
                localStorage.setItem('access', response.access);
            }
        } catch (error) {
            console.error('Login error:', error);
            set({
                refresh: null,
                access: null,
                isAuthenticated: false,
            })
        }
    },
    logout: () => set({
        refresh: null,
        access: null,
        isAuthenticated: false,
    })
}));