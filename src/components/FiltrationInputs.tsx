import { FC, useState } from "react";
import { CustomButton } from "@/ui/CustomButton.tsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/ui/CustomSelect.tsx";

const roleOptions = [
    { label: "All", value: "" },
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Manager", value: "manager" },
];

export const FiltrationInputs: FC = () => {
    const [selectedRole, setSelectedRole] = useState("");

    return (
        <div className="flex justify-between items-end mb-[31px]">
            <div className="flex gap-[22px]">
                <div className="flex flex-col gap-[10px]">
                    <label>Email</label>
                    <input
                        type="text"
                        className="bg-[#FFFFFF]  h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Customer Email"
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>ID</label>
                    <input
                        type="text"
                        className="bg-[#FFFFFF] h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Invoice ID"
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>Roles</label>
                    <CustomSelect
                        options={roleOptions}
                        value={selectedRole}
                        onChange={setSelectedRole}
                        placeholder="Choose role"
                        triggerClassName="bg-white w-[150px]  h-[37px] text-black"
                        dropdownClassName="bg-gray-100 "
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />

                </div>
            </div>
            <CustomButton variant="submit" className="h-[38px] font-bold gap-[5px] px-[20px] flex rounded-[4px]">
                <PlusIcon width={20} />
                Add
            </CustomButton>
        </div>
    );
};
