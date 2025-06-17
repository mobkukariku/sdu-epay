import {api} from "@/api/api.ts";
import {TransactionsQuery} from "@/types/statistics.ts";

export const getDepartmentOrders = async (query: TransactionsQuery) => {
    const { data } = await api.get('/statistics/chart/departments-orders', {
        params: query,
    });
    return data;
};