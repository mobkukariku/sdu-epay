import { FC, useEffect, useState } from "react";
import { CustomTable } from "@/ui/CustomTable.tsx";
import { PencilIcon, TrashIcon } from "lucide-react";
import { AdminLayout } from "@/layouts/AdminLayout.tsx";
import { AdminFilters } from "@/components/admin/AdminFilters.tsx";
import { useUsersStore } from "@/store/useUsersStore.ts";
import { EditAdminModal } from "@/components/admin/EditAdminModal.tsx";
import {DeleteModal} from "@/ui/DeleteModal.tsx"; // подключи модал

export const AdminPage: FC = () => {
    const { fetchUsers, users, deleteUser} = useUsersStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<any | null>(null);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleEditClick = (admin: any) => {
        setSelectedAdmin(admin);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (admin: any) => {
        setSelectedAdmin(admin);
        setIsDeleteModalOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (selectedAdmin) {
            await deleteUser(selectedAdmin.id);
            setIsDeleteModalOpen(false);
            setSelectedAdmin(null);
        }
    };

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
                    data={users.filter((user) => user.active)}
                    actions={(row) => (
                        <div className="flex gap-2">
                            <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleEditClick(row)}
                            >
                                <PencilIcon className="w-4 h-4 cursor-pointer" />
                            </button>
                            <button onClick={() => handleDeleteClick(row)} className="text-red-600 hover:text-red-800">
                                <TrashIcon className="w-4 h-4 cursor-pointer" />
                            </button>
                        </div>
                    )}
                />
            </div>

            {selectedAdmin && (
                <>
                    <EditAdminModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        adminData={selectedAdmin}
                    />
                    <DeleteModal isOpen={isDeleteModalOpen} onDeleteClick={handleConfirmDelete} onClose={() => setIsDeleteModalOpen(false)} />
                </>
            )}

        </AdminLayout>
    );
};
