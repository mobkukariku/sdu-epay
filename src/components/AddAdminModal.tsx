import { FC, useEffect, useState } from "react";
import { CustomModal } from "@/ui/CustomModal";
import { CustomButton } from "@/ui/CustomButton";
import { CustomInput } from "@/ui/CustomInput";
import { EnvelopeIcon, LockClosedIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/ui/CustomSelect";
import { getDepartments } from "@/api/endpoints/departments";
import { addUser } from "@/api/endpoints/users.ts"; // 👈 Добавь эту функцию

export const AddAdminModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);

    const roleOptions = [
        { label: "Super Admin", value: "SUPER_ADMIN" },
        { label: "Admin", value: "ADMIN" },
        { label: "Manager", value: "MANAGER" },
    ];

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                const formatted = response.data.map((dept: any) => ({
                    label: dept.name,
                    value: dept.id,
                }));
                setDepartments(formatted);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleSubmit = async () => {
        if (!username || !name || !password || !selectedRole || !selectedDepartment) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await addUser({
                username,
                name,
                password,
                role: selectedRole,
                department_id: selectedDepartment,
            });

            alert("Admin created successfully!");
            setIsModalOpen(false);
            setUsername("");
            setName("");
            setPassword("");
            setSelectedRole("");
            setSelectedDepartment("");
        } catch (error) {
            console.error("Failed to add admin:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <>
            <CustomButton
                variant="submit"
                className="h-[38px] font-bold gap-[5px] px-[20px] flex rounded-[4px]"
                onClick={() => setIsModalOpen(true)}
            >
                <PlusIcon className="w-5 h-5" />
                ADD
            </CustomButton>

            <CustomModal title="Add Admin" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-[21px]">
                    <CustomInput
                        icon={<EnvelopeIcon className="text-[#6B9AB0]" />}
                        placeholder="Enter your email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <CustomInput
                        icon={<UserIcon className="text-[#6B9AB0]" />}
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CustomInput
                        icon={<LockClosedIcon className="text-[#6B9AB0]" />}
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <CustomSelect
                        placeholder="Select department"
                        options={departments}
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                        triggerClassName="bg-white h-[50px] text-black"
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />
                    <CustomSelect
                        options={roleOptions}
                        value={selectedRole}
                        onChange={setSelectedRole}
                        placeholder="Select role"
                        triggerClassName="bg-white h-[50px] text-black"
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />
                    <CustomButton onClick={handleSubmit} className="w-full">
                        ADD
                    </CustomButton>
                </div>
            </CustomModal>
        </>
    );
};
