import {FC, useEffect, useState} from "react";
import {useDepartmentsStore} from "@/store/useDepartmentsStore.ts";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {CustomTable} from "@/ui/CustomTable.tsx";
import {PencilIcon, TrashIcon} from "lucide-react";
import {DepartmentsFilters} from "@/components/department/DepartmentsFilters.tsx";
import {EditDepartmentModal} from "@/components/department/EditDepartmentModal.tsx";

export const DepartmentsPage:FC = () => {
    const {departments, fetchDepartments} = useDepartmentsStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<any | null>(null);

    const columns = [
        {header: "Department", accessor: "name"}
    ]

    useEffect(() => {
        fetchDepartments()
    }, []);

    const handleEditClick = (dep: any) => {
        setSelectedDepartment(dep);
        setIsEditModalOpen(true);
    };

    return(
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Departments Information</h1>
                <DepartmentsFilters />
                <CustomTable
                    columns={columns}
                    data={departments}
                    actions={(row) => (
                        <div className="flex gap-2">
                            <button onClick={() => handleEditClick(row)} className="text-blue-600 hover:text-blue-800">
                                <PencilIcon className="w-4 cursor-pointer h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                                <TrashIcon className="w-4 cursor-pointer h-4" />
                            </button>
                        </div>
                    )}
                />
            </div>
            {selectedDepartment && (
                <EditDepartmentModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    departmentData={selectedDepartment}
                />
            )}
        </AdminLayout>
    )
}