import {FC, useState} from "react";
import {CustomInput} from "../ui/CustomInput.tsx";
import {ReceiptPercentIcon} from "@heroicons/react/24/outline";
import {CustomButton} from "../ui/CustomButton.tsx";
import {toast, Toaster} from "react-hot-toast";
import {usePaymentStore} from "@/store/usePaymentStore.ts";

export const PromocodeInput: FC = () => {
    const [promoCode, setPromoCode] = useState("");

    const {verifyPromo, order} = usePaymentStore();

    const onClick = async () => {
        if (!promoCode) return toast.error("Please enter a promo code");

        try {
            await verifyPromo({
                code: promoCode,
                event_id: order.event_id,
            });

            toast.success("Promo code successfully applied!");
        } catch {
            toast.error("Invalid promo code");
        }
    };

    return (
        <div className={"flex gap-[20px] mt-[20px] mb-[20px]"}>
            <CustomInput
                icon={<ReceiptPercentIcon className={"text-[#6B9AB0]"} />}
                type={"text"}
                placeholder={"Promo code"}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
            />
            <CustomButton onClick={onClick} variant={"default"} className={"text-[16px]"}>
                Add
            </CustomButton>

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#EBFED4',
                        color: '#000000',
                        border: '1px solid #60A809',
                        borderRadius: '5px',
                    },
                }}
            />
        </div>
    );
};
