import { FC, useEffect, useState } from "react";
import { CustomModal } from "@/ui/CustomModal.tsx";
import { CustomButton } from "@/ui/CustomButton.tsx";
import { CustomInput } from "@/ui/CustomInput.tsx";
import { EnvelopeIcon, LockClosedIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { CustomSelect } from "@/ui/CustomSelect.tsx";
import { getDepartments } from "@/api/endpoints/departments.ts";
import {useUsersStore} from "@/store/useUsersStore.ts";
import {Department} from "@/types/departments.ts";
import {toast} from "react-hot-toast";

export const AddAdminModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);
    const [errors, setErrors] = useState({
        username: false,
        name: false,
        password: false,
        department: false,
        role: false,
    });



    const {addUser, fetchUsers} = useUsersStore();


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

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors = {
            username: !username || !emailRegex.test(username),
            name: !name,
            password: !password || password.length < 6,
            department: !selectedDepartment,
            role: !selectedRole,
        };

        setErrors(newErrors);

        const messages: string[] = [];

        if (!username) {
            messages.push("Email is required");
        } else if (!emailRegex.test(username)) {
            messages.push("Invalid email format");
        }
        if (newErrors.name) messages.push("Name is required");
        if (!password) {
            messages.push("Password is required");
        } else if (password.length < 6) {
            messages.push("Password must be at least 6 characters");
        }
        if (newErrors.department) messages.push("Department is required");
        if (newErrors.role) messages.push("Role is required");

        if (messages.length > 0) {
            messages.forEach((msg) => toast.error(msg));
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

            await fetchUsers();

            toast.success("Admin created successfully!");

            setIsModalOpen(false);
            setUsername("");
            setName("");
            setPassword("");
            setSelectedRole("");
            setSelectedDepartment("");
            setErrors({
                username: false,
                name: false,
                password: false,
                department: false,
                role: false,
            });
        } catch (error: any) {
            console.error("Failed to add admin:", error.response.data.detail);
            toast.error(error.response.data.detail);
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

            <CustomModal className={"max-w-md w-full"} title="Add Admin" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-[21px]">
                    <CustomInput
                        icon={<EnvelopeIcon className={errors.username ? " text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Enter your email"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={errors.username ? "border border-red-500" : ""}
                    />

                    <CustomInput
                        icon={<UserIcon className={errors.name ? " text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "border border-red-500" : ""}
                    />
                    <CustomInput
                        icon={<LockClosedIcon className={errors.password ? " text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? "border border-red-500" : ""}
                    />
                    <CustomSelect
                        placeholder="Select department"
                        options={departments}
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                        triggerClassName={`bg-white h-[50px] text-black ${errors.department ? "border border-red-500" : ""}`}
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />

                    <CustomSelect
                        options={roleOptions}
                        value={selectedRole}
                        onChange={setSelectedRole}
                        placeholder="Select role"
                        triggerClassName={`bg-white h-[50px] text-black ${errors.role ? "border border-red-500" : ""}`}
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
