import { FC, useState } from "react";
import { CustomSelect } from "@/ui/CustomSelect.tsx";
import { AddAdminModal } from "@/components/AddAdminModal.tsx";
import { useUsersStore } from "@/store/useUsersStore";
import {CustomButton} from "@/ui/CustomButton.tsx"; // путь к твоему Zustand store

const roleOptions = [
    { label: "All", value: "" },
    { label: "Super Admin", value: "SUPER_ADMIN" },
    { label: "Admin", value: "ADMIN" },
    { label: "Manager", value: "MANAGER" },
];

export const AdminFilters: FC = () => {
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [selectedRole, setSelectedRole] = useState<"SUPER_ADMIN" | "ADMIN" | "MANAGER" | "">("");


    const fetchUsers = useUsersStore((state) => state.fetchUsers);

    const handleSearch = () => {
        fetchUsers({
            username: email || undefined,
            department_id: id || undefined,
            role: selectedRole as "SUPER_ADMIN" | "ADMIN" | "MANAGER" | undefined, // кастуем
            page: 0,
            size: 10,
        });
    };

    return (
        <div className="flex justify-between items-end mb-[31px]">
            <div className="flex gap-[22px]">
                <div className="flex flex-col gap-[10px]">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#FFFFFF]  h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Customer Email"
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>ID</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
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
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />
                </div>

                <CustomButton
                    onClick={handleSearch}
                    className="h-[37px] px-4 mt-auto text-white rounded-[4px]  transition"
                >
                    Search
                </CustomButton>
            </div>

            <AddAdminModal />
        </div>
    );
};
