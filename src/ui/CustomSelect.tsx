import { FC, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Option = {
    label: string;
    value: string;
};

export type SelectProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const CustomSelect: FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((o) => o.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={ref}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#006799] border border-[#6B9AB0] text-center rounded-[5px] p-[16px] text-white text-[16px] cursor-pointer select-none"
            >
                {selectedOption?.label || placeholder}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-2 w-full text-[16px] text-center bg-white border border-[#6B9AB0] rounded-[5px] shadow-md max-h-[200px] overflow-auto"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-2 text-[#006799]  hover:bg-[#ECECEC] m-[7px] rounded-[4px] cursor-pointer transition-colors duration-150 ${
                                    value === option.value ? "font-semibold bg-[#ECECEC]" : ""
                                }`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};
