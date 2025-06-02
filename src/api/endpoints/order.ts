import {api} from "@/api/api.ts";
import {IOrder, PaymentResponseKaspi} from "@/types/orders.ts";

export const orderKaspi = async (order:IOrder): Promise<PaymentResponseKaspi> => {
    const {data} = await api.post("/orders/public/kaspi", order);

    return data;
}

export const orderHalyk = async (order:IOrder): Promise<PaymentResponseKaspi> => {
    const {data} = await api.post("/orders/public/epay", order);

    return data;
}