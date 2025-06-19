import {api} from "@/api/api.ts";
import {TransactionsQuery} from "@/types/statistics.ts";

export const getDepartmentOrders = async (query: TransactionsQuery) => {
    const { data } = await api.get('/statistics/chart/departments-orders', {
        params: query,
    });
    return data;
};

export const fetchTotalEvents = async () => {
    const { data } = await api.get('/statistics/events/total');
    return data.total;
}

export const fetchTotalPromos = async () => {
    const { data } = await api.get('/statistics/promo-codes/total');
    return data.total;
}

export const fetchUsedPromos = async () => {
    const { data } = await api.get('/statistics/promo-codes/already-used/total');

    return data.total;
}