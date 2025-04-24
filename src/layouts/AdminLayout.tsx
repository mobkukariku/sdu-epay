import { FC, ReactNode } from "react";
import { SideBar } from "@/ui/SideBar.tsx";

interface AdminLayoutProps {
    children: ReactNode;
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideBar />
            <div className="flex-1 p-8">{children}</div>
        </div>
    );
};
