import { FC, useEffect, useState } from "react";
import { CustomModal } from "@/ui/CustomModal";
import { CustomButton } from "@/ui/CustomButton";
import { CustomInput } from "@/ui/CustomInput";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/ui/CustomSelect";
import { getDepartments } from "@/api/endpoints/departments";
import { useUsersStore } from "@/store/useUsersStore";
import { Department } from "@/types/departments";

interface EditAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    adminData: {
        id: string;
        username: string;
        name: string;
        role: string;
        department_id: string;
    };
}

export const EditAdminModal: FC<EditAdminModalProps> = ({ isOpen, onClose, adminData }) => {
    const [username, setUsername] = useState(adminData.username);
    const [name, setName] = useState(adminData.name);
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState(adminData.role);
    const [selectedDepartment, setSelectedDepartment] = useState(adminData.department_id);
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);

    const { updateUser } = useUsersStore();

    useEffect(() => {
        if (isOpen) {
            setUsername(adminData.username);
            setName(adminData.name);
            setPassword(""); // Не подставляем старый пароль
            setSelectedRole(adminData.role);
            setSelectedDepartment(adminData.department_id);
        }
    }, [isOpen, adminData]);


    const roleOptions = [
        { label: "Super Admin", value: "SUPER_ADMIN" },
        { label: "Admin", value: "ADMIN" },
        { label: "Manager", value: "MANAGER" },
    ];

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                const formatted = response.data.map((dept: Department) => ({
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

    const handleUpdate = async () => {
        if (!username || !name || !selectedRole || !selectedDepartment) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            await updateUser(adminData.id, {
                username,
                name,
                password: password || undefined,
                role: selectedRole,
                department_id: selectedDepartment,
            });
            onClose();
        } catch (error) {
            console.error("Failed to update admin:", error);
        }
    };

    return (
        <CustomModal title="Edit Admin" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-[21px]">
                <CustomInput
                    icon={<EnvelopeIcon className="text-[#6B9AB0]" />}
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <CustomInput
                    icon={<UserIcon className="text-[#6B9AB0]" />}
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <CustomInput
                    icon={<LockClosedIcon className="text-[#6B9AB0]" />}
                    placeholder="Enter new password (optional)"
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
                <CustomButton onClick={handleUpdate} className="w-full">
                    Save Changes
                </CustomButton>
            </div>
        </CustomModal>
    );
};
