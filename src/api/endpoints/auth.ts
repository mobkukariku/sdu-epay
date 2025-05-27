import {api} from "@/api/api.ts";
import {setTokens} from "@/api/utils/tokenUtils.ts";


export const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { username: email, password });
    console.log("Login response:", response.data);

    const { access, refresh } = response.data;
    console.log("Tokens:", access, refresh);

    setTokens(access, refresh);
    return response.data;
};
