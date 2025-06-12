import { FC, useEffect, useState } from "react";
import { CustomSelect } from "@/ui/CustomSelect.tsx";
import { AddAdminModal } from "@/components/admin/AddAdminModal.tsx";
import { useUsersStore } from "@/store/useUsersStore.ts";
import { CustomButton } from "@/ui/CustomButton.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { getUsers } from "@/api/endpoints/users.ts";
import { Paginator } from "primereact/paginator";

const roleOptions = [
    { label: "All", value: "" },
    { label: "Super Admin", value: "SUPER_ADMIN" },
    { label: "Admin", value: "ADMIN" },
    { label: "Manager", value: "MANAGER" },
];

export const AdminFilters: FC = () => {
    const [email, setEmail] = useState("");
    const [mailSuggestions, setMailSuggestions] = useState<{ username: string; id: string }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedRole, setSelectedRole] = useState<"SUPER_ADMIN" | "ADMIN" | "MANAGER" | "">("");

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const { fetchUsers, total } = useUsersStore();

    const handleSearch = async () => {
        setFirst(0);
        await fetchUsers({
            username: email || undefined,
            role: selectedRole !== "" ? selectedRole : undefined,
            page: 0,
            size: rows,
        });
    };

    const onPageChange = async (event: any) => {
        setFirst(event.first);
        setRows(event.rows);

        await fetchUsers({
            username: email || undefined,
            role: selectedRole !== "" ? selectedRole : undefined,
            page: event.first / event.rows,
            size: event.rows,
        });
    };

    const handleSelectEvent = (mail: { username: string; id: string }) => {
        setEmail(mail.username);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (email.trim() === "") {
                setMailSuggestions([]);
                return;
            }

            try {
                const response: any = await getUsers({ username: email });
                const filtered = response.data.filter((user: { active: boolean }) => user.active);
                setMailSuggestions(filtered);
                setShowSuggestions(true);
            } catch (err) {
                console.error(err);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [email]);

    useEffect(() => {
        const load = async () => {
            await fetchUsers({
                page: first / rows,
                size: rows,
            });
        };

        load();
    }, [first, rows]);

    return (
        <div className="flex justify-between items-end mb-[31px]">
            <div className="flex gap-[22px]">
                <div className="flex relative flex-col gap-[10px]">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#FFFFFF] h-[37px] p-2 border border-[#6B9AB0] rounded-[4px]"
                        placeholder="Enter Customer Email"
                    />
                    {showSuggestions && mailSuggestions.length > 0 && (
                        <AnimatePresence>
                            <motion.ul
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-10 top-[70px] left-0 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-[200px] overflow-y-auto"
                            >
                                {mailSuggestions.map((mail) => (
                                    <li
                                        key={mail.id}
                                        className="p-2 hover:bg-blue-100 cursor-pointer text-sm"
                                        onClick={() => handleSelectEvent(mail)}
                                    >
                                        {mail.username}
                                    </li>
                                ))}
                            </motion.ul>
                        </AnimatePresence>
                    )}
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>Roles</label>
                    <CustomSelect
                        options={roleOptions}
                        value={selectedRole}
                        onChange={(value: string) => setSelectedRole(value as any)}
                        placeholder="Choose role"
                        triggerClassName="bg-white w-[150px] h-[37px] text-black text-sm"
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />
                </div>

                <CustomButton
                    onClick={handleSearch}
                    className="h-[37px] px-4 mt-auto text-white rounded-[4px] transition"
                >
                    Search
                </CustomButton>
            </div>
            <div className="flex items-center gap-5">
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={total}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                    className="custom-paginator"
                />
                <AddAdminModal />
            </div>
        </div>
    );
};
