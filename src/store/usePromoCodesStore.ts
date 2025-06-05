import {CreatePromocodePayload, IPromocode, PromocodeQuery, UpdatePromocodePayload} from "@/types/promocodes.ts";
import {create} from "zustand/react";
import {addPromocode, getPromocodes, updatePromocode} from "@/api/endpoints/promocodes.ts";

interface PromoCodesState {
    promoCodes: IPromocode[];
    total: number;
    page: number;
    size: number;
    loading: boolean;
    error: string | null;
    fetchPromoCodes: (query?:PromocodeQuery) => Promise<void>;
    addPromoCode: (promo:CreatePromocodePayload) => Promise<void>;
    updatePromoCode: (id:string, promo:UpdatePromocodePayload) => Promise<void>;
}


export const usePromoCodesStore = create<PromoCodesState>((set) => ({
    promoCodes: [],
    total: 0,
    page: 1,
    size: 10,
    loading: false,
    error: null,

    fetchPromoCodes: async (query?: PromocodeQuery) => {
        set({ loading: true, error: null });
        try{
            const users = await getPromocodes(query);
            set({
                promoCodes: users.data,
                total: users.total ?? users.data.length,
                page: query?.page ?? 0,
                size: query?.size ?? 10,
                loading: false,
            })
        }catch (err){
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
        }
    },
    addPromoCode: async (promo) => {
        set({loading: true, error: null});
        try{
            const users = await addPromocode(promo);
            set((state) => ({
                promoCodes: [...state.promoCodes, users],
                loading: false
            }))
        }catch (err){
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
        }
    },
    updatePromoCode: async (id, promo) => {
        set({loading: true, error: null});
        try{
            const updatedPromo = await updatePromocode(id, promo);
            set((state) => ({
                promoCodes: state.promoCodes.map((promo) =>
                    promo.id !== id ? {...promo, ...updatedPromo} : promo,
                ),
                loading: false,
            }))
        }catch (err){
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
        }
    }
}));