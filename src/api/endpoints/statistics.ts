import {api} from "@/api/api.ts";

export const getDepartmentOrders = async () => {
    const {data} = await api.post('/statistics/chart/departments-orders');

    return data;
}