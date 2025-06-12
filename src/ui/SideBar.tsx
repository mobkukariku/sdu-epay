import { FC } from "react";
import { NavItem } from "@/ui/NavItem.tsx";
import {
    ArrowLeftStartOnRectangleIcon,
    BriefcaseIcon,
    CalendarIcon,
    ChartBarIcon,
    ReceiptPercentIcon,
    TableCellsIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { clearTokens } from "@/api/utils/tokenUtils.ts";
import { useUserData } from "@/hooks/useUserData.ts";

const navItems = [
    {
        label: "Dashboard",
        to: "/dashboard",
        icon: <ChartBarIcon width={20} />,
        roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"],
    },
    {
        label: "Admin",
        to: "/admin",
        icon: <UserIcon width={20} />,
        roles: ["SUPER_ADMIN"],
    },
    {
        label: "Departments",
        to: "/departments",
        icon: <BriefcaseIcon width={20} />,
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        label: "Events",
        to: "/events",
        icon: <CalendarIcon width={20} />,
        roles: ["ADMIN", "SUPER_ADMIN", "MANAGER"],
    },
    {
        label: "Promo codes",
        to: "/promo-codes",
        icon: <ReceiptPercentIcon width={20} />,
        roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"],
    },
    {
        label: "File Reader",
        to: "/file-reader",
        icon: <TableCellsIcon width={20} />,
        roles: ["ADMIN", "SUPER_ADMIN", "MANAGER"],
    },
];

export const SideBar: FC = () => {
    const user = useUserData();

    const filteredItems = navItems.filter(
        (item) => !user?.role || item.roles.includes(user.role)
    );

    return (
        <aside className="w-fit min-h-screen bg-[#006799] text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-[#00547C]">
                <img src="logo-2.png" alt="logo" />
            </div>
            <nav className="flex flex-col justify-between h-full p-4">
                <div className="space-y-2">
                    {filteredItems.map((item) => (
                        <NavItem
                            key={item.to}
                            icon={item.icon}
                            label={item.label}
                            to={item.to}
                        />
                    ))}
                </div>
                <div className="pt-4 border-t border-[#00547C] mt-4">
                    <div className="flex items-center gap-4 mb-4 px-2">
                        <div className="bg-white p-2 rounded-full shadow-md">
                            <UserIcon width={40} height={40} color="#006799" />
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold">{user?.name ?? "Unknown User"}</p>
                            <p className="text-gray-200 ">{user?.username}</p>
                            <p className="text-gray-300  text-xs capitalize">Role: {user?.role?.toLowerCase()}</p>
                        </div>
                    </div>
                    <NavItem
                        icon={<ArrowLeftStartOnRectangleIcon width={20} />}
                        label="Log Out"
                        to="/login"
                        onClick={() => {
                            clearTokens();
                        }}
                    />
                </div>

            </nav>
        </aside>
    );
};
