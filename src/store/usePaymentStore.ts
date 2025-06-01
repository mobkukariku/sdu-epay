import {IOrder} from "@/types/orders.ts";
import {create} from "zustand/react";
import {VerifyPromocodePayload} from "@/types/promocodes.ts";
import {verifyPromocode} from "@/api/endpoints/promocodes.ts";

interface PaymentState {
    order: IOrder;
    price: number;
    discount: number;
    loading: boolean;
    finalPrice: number;
    error: string | null;
    setOrderField: <K extends keyof IOrder>(key: K, value: IOrder[K]) => void;
    setPrice: (price: number) => void;
    verifyPromo: (payload: VerifyPromocodePayload) => Promise<void>;
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
    price: 0,         // исходная цена без скидки
    discount: 0,      // скидка в процентах
    finalPrice: 0,    // цена с учетом скидки
    loading: false,
    error: null,

    setOrderField: (key, value) =>
        set((state) => ({
            order: {
                ...state.order,
                [key]: value,
            },
        })),

    setPrice: (price) => set((state) => {
        // при изменении цены пересчитываем finalPrice с текущей скидкой
        const finalPrice = Math.max(0, price - (price * (state.discount / 100)));
        return {
            price,
            finalPrice,
        };
    }),

    verifyPromo: async (payload) => {
        set({ loading: true, error: null });
        try {
            const promo = await verifyPromocode(payload);
            set((state) => {
                const discount = promo.discount ?? 0;
                const finalPrice = Math.max(0, state.price - (state.price * (discount / 100)));

                return {
                    discount,
                    finalPrice,
                    order: {
                        ...state.order,
                        promo_code: promo.code,
                    },
                    loading: false,
                };
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
        }
    },

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
            discount: 0,
            finalPrice: 0,
            loading: false,
            error: null,
        }),
}));
