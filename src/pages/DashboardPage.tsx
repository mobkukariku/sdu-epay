import {FC} from "react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";

export const DashboardPage:FC = () => {
    return (
        <AdminLayout>
            <p className={"text-[28px] font-medium"}>Dashboard</p>
        </AdminLayout>
    )
}