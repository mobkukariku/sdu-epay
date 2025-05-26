import {FC, useEffect} from "react";
import { CustomTable } from "@/ui/CustomTable.tsx";
import { PencilIcon, TrashIcon } from "lucide-react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {AdminFilters} from "@/components/AdminFilters.tsx";
import {useUsersStore} from "@/store/useUsersStore.ts";

export const AdminPage: FC = () => {
    const {fetchUsers, users} = useUsersStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const columns = [
        { header: "Email", accessor: "username" },
        { header: "Department", accessor: "department" },
        { header: "Role", accessor: "role" },
    ];

    return (
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Admin Information</h1>
                <AdminFilters />
                <CustomTable
                    columns={columns}
                    data={users}
                    actions={() => (
                        <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                                <PencilIcon className="w-4 cursor-pointer h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                                <TrashIcon className="w-4 cursor-pointer h-4" />
                            </button>
                        </div>
                    )}
                />
            </div>
        </AdminLayout>
    );
};
