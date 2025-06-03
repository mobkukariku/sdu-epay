import {FC} from "react";
import {NavLink} from "react-router-dom";


interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    to: string;
}

export const NavItem: FC<NavItemProps> = ({ icon, label, to, onClick}) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition-colors ${
                    isActive ? "bg-[#005B88]" : "hover:bg-[#005B88]"
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};