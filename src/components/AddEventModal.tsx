import {FC, useState} from "react";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {
    CurrencyDollarIcon,
    EnvelopeIcon,
    InformationCircleIcon,
    PlusIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {CustomDatePicker} from "@/ui/CustomDatePicker.tsx";

export const AddEventModal:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <>
            <CustomButton variant="submit" className="h-[38px] font-bold gap-[5px] px-[20px] flex rounded-[4px]" onClick={() => setIsModalOpen(true)}>
                <PlusIcon />
                ADD
            </CustomButton>
            <CustomModal title={"Add Event"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={"flex flex-col gap-[21px]"}>
                    <CustomInput
                        icon={<UserCircleIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter event name"}
                    />

                    <CustomInput
                        icon={<EnvelopeIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter manager's email"}
                    />

                    <CustomInput
                        icon={<InformationCircleIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter department"}
                    />

                    <CustomInput
                        icon={<CurrencyDollarIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter price"}
                    />

                    <CustomDatePicker />

                    <CustomButton
                        onClick={() => setIsModalOpen(false)}
                        className="w-full"

                    >
                        ADD
                    </CustomButton>
                </div>
            </CustomModal>
        </>
    )
}