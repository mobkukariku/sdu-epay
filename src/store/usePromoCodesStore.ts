import {CreatePromocodePayload, IPromocode, PromocodeQuery, UpdatePromocodePayload} from "@/types/promocodes.ts";
import {create} from "zustand/react";
import {
    addPromocode,
    deletePromoCode,
    getPromocodes,
    updatePromocode
} from "@/api/endpoints/promocodes.ts";

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
    deletePromoCode: (id: string) => Promise<void>;
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
            throw err;
        }
    },
    addPromoCode: async (promo) => {
        set({loading: true, error: null});
        try{
            await addPromocode(promo);
        }catch (err){
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
            throw err;
        }
    },
    updatePromoCode: async (id, promo) => {
        set({loading: true, error: null});
        try{
            await updatePromocode(id, promo);
        }catch (err){
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
            throw err;
        }
    },
    deletePromoCode: async (id: string) => {
        set({loading: true, error: null});
        try{
            await deletePromoCode(id);
            set({loading: false});
        }catch (err){
            const message = err instanceof Error ? err.message : String(err);
            set({ error: message, loading: false });
            throw err;
        }
    }
}));