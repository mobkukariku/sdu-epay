import {useMemo} from "react";
import {getAccessToken} from "@/api/utils/tokenUtils.ts";
import {jwtDecode} from "jwt-decode";

export type JwtPayload = {
    user: {
        id: string;
        username: string;
        name: string;
        role: string;
        active: boolean;
        department_id: string | null;
    }
};

export const useUserData = () => {
    return useMemo(() => {
        const token = getAccessToken();
        if (!token) return null;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.user;
        } catch (err) {
            console.error("Ошибка при декодировании токена:", err);
            return null;
        }
    }, []);
};