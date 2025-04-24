import { FC } from "react";
import { CustomTable } from "@/ui/CustomTable.tsx";
import { PencilIcon, TrashIcon } from "lucide-react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {FiltrationInputs} from "@/components/FiltrationInputs.tsx";

export const AdminPage: FC = () => {
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Email", accessor: "email" },
        { header: "Department", accessor: "department" },
        { header: "Role", accessor: "role" },
    ];

    const data = [
        { id: 1, name: "John Doe", email: "john@example.com", department: "IT", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", department: "Marketing", role: "User" },
        { id: 3, name: "Alice Johnson", email: "alice.j@example.com", department: "Finance", role: "Manager" },
        { id: 4, name: "Bob Brown", email: "bob.brown@example.com", department: "HR", role: "User" },
        { id: 5, name: "Charlie Lee", email: "charlie.lee@example.com", department: "Design", role: "Designer" },
        { id: 6, name: "David Kim", email: "david.k@example.com", department: "Engineering", role: "Admin" },
        { id: 7, name: "Ella Martinez", email: "ella.m@example.com", department: "Support", role: "User" },
        { id: 8, name: "Frank Zhao", email: "frank.z@example.com", department: "Legal", role: "Lawyer" },
        { id: 9, name: "Grace Chen", email: "grace.chen@example.com", department: "Sales", role: "Sales Rep" },
        { id: 10, name: "Henry Nguyen", email: "henry.n@example.com", department: "IT", role: "Developer" },
    ];

    return (
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Admin Information</h1>
                <FiltrationInputs />
                <CustomTable
                    columns={columns}
                    data={data}
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
