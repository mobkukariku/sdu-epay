import { FC, ReactNode } from "react";

export type InputProps = {
    className?: string;
    icon?: ReactNode;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomInput: FC<InputProps> = ({
    className,
    icon,
    placeholder = "Enter text",
    type = "text",
    value,
    onChange,
}) => {
    return (
        <div className="relative">
            {icon && (
                <div>
                    <div className="w-[20px] h-[20px] flex absolute top-[50%] left-[20px] transform -translate-y-1/2">
                        {icon}
                        <div className={"relative"}>
                            <div className="absolute flex top-[-4px] left-[5px] w-[1px] h-[30px] bg-[#6B9AB0] mx-2"></div>
                        </div>
                    </div>
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`bg-[#F3F3F3] border border-[#6B9AB0] rounded-[5px] ring-[#6B9AB0] p-[13px] pl-[65px] w-full ${className}`}
            />
        </div>
    );
};
