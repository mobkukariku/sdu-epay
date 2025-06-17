import {api} from "@/api/api.ts";

export const getDepartmentOrders = async () => {
    const {data} = await api.get('/statistics/chart/departments-orders');

    return data;
}