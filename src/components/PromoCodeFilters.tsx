import {FC, useState} from "react";
import {usePromoCodesStore} from "@/store/usePromoCodesStore.ts";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {AddPromoCodeModal} from "@/components/AddPromoCodeModal.tsx";

export const PromoCodeFilters:FC = () => {
    const [promo, setPromo] = useState("");

    const {fetchPromoCodes} = usePromoCodesStore();

    const handleSearch = async () => {
        await fetchPromoCodes({
            code: promo || undefined,
            page: 0,
            size: 10,
        })
    }


    return (
        <div className="flex justify-between items-end mb-[31px]">
            <div className="flex gap-[22px]">
                <div className="flex flex-col gap-[10px]">
                    <label>Events name</label>
                    <input
                        type="text"
                        className="bg-[#FFFFFF]  h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Events name"
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>Promo code</label>
                    <input
                        type="text"
                        onChange={(e) => setPromo(e.target.value)}
                        className="bg-[#FFFFFF] h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Promo code"
                    />
                </div>
                <CustomButton
                    onClick={handleSearch}
                    className="h-[37px] px-4 mt-auto text-white rounded-[4px]  transition"
                >
                    Search
                </CustomButton>
            </div>
            <AddPromoCodeModal />
        </div>
    )
}