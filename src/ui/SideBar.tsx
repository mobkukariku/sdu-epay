import { FC } from "react";
import {NavItem} from "@/ui/NavItem.tsx";
import {ArrowLeftStartOnRectangleIcon, CalendarIcon, ReceiptPercentIcon, UserIcon} from "@heroicons/react/24/outline";

export const SideBar: FC = () => {
    return (
        <aside className=" w-fit h-screen bg-[#006799] text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-[#00547C]">
                <img src="logo-2.png" alt="logo"/>
            </div>
            <nav className="flex flex-col justify-between h-full p-4">
                <div className="space-y-2">
                    <NavItem icon={<UserIcon width={20} />} label="Admin" to="/admin" />
                    <NavItem icon={<CalendarIcon width={20} />} label="Events" to="/events" />
                    <NavItem icon={<ReceiptPercentIcon width={20} />} label="Promo codes" to="/promo-codes" />
                </div>
                <div className="pt-4 border-t border-gray-700">
                    <NavItem icon={<ArrowLeftStartOnRectangleIcon width={20} />} label="Log Out" to="/login" />
                </div>
            </nav>

        </aside>
    );
};




