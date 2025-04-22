import {FC, useState} from "react";
import {CustomInput} from "../ui/CustomInput.tsx";
import {EnvelopeIcon, PhoneIcon, UserIcon} from "@heroicons/react/24/outline";
import {CustomSelect} from "../ui/CustomSelect.tsx";
import {PaymentMethod} from "./PaymentMethod.tsx";
import {PromocodeInput} from "./PromocodeInput.tsx";
import {CustomButton} from "../ui/CustomButton.tsx";
import {CheckOut} from "./CheckOut.tsx";

export const PaymentForm: FC = () => {
    const [selected, setSelected] = useState("");

    const options = [
        { label: "Registration free", value: "registration_free" },
        { label: "SDU Extension", value: "sdu_extension" },
        { label: "Payment for Olympiad", value: "payment_for_olympiad" },
        { label: "Dormitory Fee", value: "dormitory_fee" },
    ];

    return (
        <form className={"bg-[#FFFFFF] font-medium text-[20px] w-[610px] px-[94px] py-[32px] rounded-[6px] border-2 border-[#006799]"}>
            <p className={"mb-[31px] text-[24px]"}>Personal information</p>
            <div className={"flex flex-col gap-[20px]"}>
                <CustomInput
                    icon={<UserIcon className={"text-[#6B9AB0]"}  />}
                    type={"text"}
                    placeholder={"Enter your full name"}
                />
                <CustomInput
                    icon={<EnvelopeIcon className={"text-[#6B9AB0]"}  />}
                    type={"email"}
                    placeholder={"Enter your email"}
                />
                <CustomInput
                    icon={<PhoneIcon className={"text-[#6B9AB0]"}  />}
                    type={"text"}
                    placeholder={"Enter your phone number"}
                />
                <CustomSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    placeholder="Select payment destination"
                />
                {
                    selected && (
                        <>
                            <CustomInput
                                icon={<UserIcon className={"text-[#6B9AB0]"}  />}
                                type={"text"}
                                placeholder={"Additional fields"}
                            />
                            <CustomInput
                                icon={<UserIcon className={"text-[#6B9AB0]"}  />}
                                type={"text"}
                                placeholder={"Additional fields"}
                            />
                            <CustomInput
                                icon={<UserIcon className={"text-[#6B9AB0]"}  />}
                                type={"text"}
                                placeholder={"Additional fields"}
                            />
                            <PaymentMethod/>
                            <PromocodeInput />
                            <CheckOut />
                            <CustomButton variant={"submit"}>PAY</CustomButton>
                        </>
                    )
                }
            </div>
        </form>
    )
}
