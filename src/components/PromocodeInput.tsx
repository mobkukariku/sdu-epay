import {FC} from "react";
import {CustomInput} from "../ui/CustomInput.tsx";
import {ReceiptPercentIcon,} from "@heroicons/react/24/outline";
import {CustomButton} from "../ui/CustomButton.tsx";

export const PromocodeInput:FC = () => {
    return (
        <div className={"flex gap-[20px] mt-[20px] mb-[20px]"}>
            <CustomInput
                icon={<ReceiptPercentIcon className={"text-[#6B9AB0]"}  />}
                type={"text"}
                placeholder={"Promocode"}
            />
            <CustomButton variant={"default"} className={"text-[16px]"}>Add</CustomButton>

        </div>
    )
}