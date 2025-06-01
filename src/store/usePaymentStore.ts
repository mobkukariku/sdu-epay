import {IOrder} from "@/types/orders.ts";
import {create} from "zustand/react";

interface PaymentState {
    order: IOrder;
    price: number;
    loading: boolean;
    error: string | null;

    setOrderField: <K extends keyof IOrder>(key: K, value: IOrder[K]) => void;
    setPrice: (price: number) => void;
    applyPromo: (promoCode: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    resetOrder: () => void;
}

const initialOrder: IOrder = {
    event_id: '',
    promo_code: '',
    fullname: '',
    email: '',
    cellphone: '',
    additional: '',
}


export const usePaymentStore = create<PaymentState>((set) => ({
    order: { ...initialOrder },
    price: 0,
    loading: false,
    error: null,

    setOrderField: (key, value) =>
        set((state) => ({
            order: {
                ...state.order,
                [key]: value,
            },
        })),

    setPrice: (price) => set({ price }),

    applyPromo: (promoCode) =>
        set((state) => ({
            order: {
                ...state.order,
                promo_code: promoCode,
            },
        })),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    resetOrder: () =>
        set({
            order: { ...initialOrder },
            price: 0,
            loading: false,
            error: null,
        }),
}));