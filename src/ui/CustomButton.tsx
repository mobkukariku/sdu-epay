import { FC } from "react";

export interface CustomButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    variant?: "default" | "submit";
}

export const CustomButton: FC<CustomButtonProps> = ({
    onClick,
    disabled = false,
    className,
    children,
    variant = "default",
}) => {
    const buttonClass = () => {
        switch (variant) {
            case "submit":
                return `bg-[#006799] cursor-pointer text-white px-4 py-2 active:bg-[#004C71] rounded-md hover:bg-[#01557D] transition duration-200 ease-in-out`;
            default:
                return `bg-[#6B9AB0] cursor-pointer  text-white px-4 py-2 rounded-md hover:bg-[#5A8DA3] transition duration-200 ease-in-out`;
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${buttonClass()} ${className}`}
        >
            {children}
        </button>
    );
};
