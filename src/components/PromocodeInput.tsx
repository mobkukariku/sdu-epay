import {FC} from "react";
import {CustomInput} from "../ui/CustomInput.tsx";
import {ReceiptPercentIcon,} from "@heroicons/react/24/outline";
import {CustomButton} from "../ui/CustomButton.tsx";
import {toast, Toaster} from "react-hot-toast";

export const PromocodeInput:FC = () => {

    const onClick = () => {

        toast.success('Promo code successfully added!')
    }

    return (
        <div className={"flex gap-[20px] mt-[20px] mb-[20px]"}>
            <CustomInput
                icon={<ReceiptPercentIcon className={"text-[#6B9AB0]"}  />}
                type={"text"}
                placeholder={"Promo code"}
            />
            <CustomButton onClick={onClick} variant={"default"} className={"text-[16px]"}>Add</CustomButton>
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
    )
}