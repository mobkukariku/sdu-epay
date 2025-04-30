import {FC, useState} from "react";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {EnvelopeIcon, InformationCircleIcon} from "@heroicons/react/24/outline";
import {CustomSelect} from "@/ui/CustomSelect.tsx";

export const AddModal:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>("");

    const options = [
        { label: "Super Admin", value: "super_admin" },
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
    ];


    return (
        <>
            <CustomButton variant="submit" className="h-[38px] font-bold gap-[5px] px-[20px] flex rounded-[4px]" onClick={() => setIsModalOpen(true)}>
                ADD
            </CustomButton>
            <CustomModal title={"Add Admin"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={"flex flex-col gap-[21px]"}>
                    <CustomInput
                        icon={<EnvelopeIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter your email"}
                    />

                    <CustomInput
                        icon={<InformationCircleIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter department"}
                    />

                    <CustomSelect
                        options={options}
                        value={selectedRole}
                        onChange={(newValue) => setSelectedRole(newValue)}
                        placeholder="Select Role"
                        triggerClassName="bg-white   h-[50px] text-black"
                        dropdownClassName="bg-gray-100 "
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />

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