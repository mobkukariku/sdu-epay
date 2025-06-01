import { FC } from "react";
import { usePaymentStore } from "@/store/usePaymentStore.ts";

export const CheckOut: FC = () => {
    const { price, promo, finalPrice } = usePaymentStore();
    console.log(price)

    return (
        <div>
            <hr className="border-1 border-[#006799]" />
            <div className="mx-[12px] flex text-[16px] flex-col gap-[20px] my-[16px]">
                <div className="flex justify-between">
                    <p>Items</p>
                    <p>${price}</p>
                </div>
                {promo > 0 && (
                    <div className="flex justify-between text-green-600">
                        <p>Promo code</p>
                        <p>- ${promo}</p>
                    </div>
                )}
            </div>
            <hr className="border-1 border-[#006799]" />
            <div className="mx-[12px] my-[19px]">
                <div className="flex justify-between text-[20px] font-bold">
                    <p>Total</p>
                    <p>${finalPrice}</p>
                </div>
            </div>
        </div>
    );
};
