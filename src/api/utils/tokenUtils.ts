export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
};

export const getAccessToken = () => localStorage.getItem("access");
export const getRefreshToken = () => localStorage.getItem("refresh");

export const clearTokens = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};
