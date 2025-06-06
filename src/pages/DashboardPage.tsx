import {FC} from "react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {DashboardContent} from "@/components/dashboard/DashboardContent.tsx";

export const DashboardPage:FC = () => {
    return (
        <AdminLayout>
            <p className={"text-2xl font-semibold"}>Dashboard</p>
            <DashboardContent />
        </AdminLayout>
    )
}