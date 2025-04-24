import { FC, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export type Option = {
    label: string;
    value: string;
};

export type SelectProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    error?: string | boolean;

    wrapperClassName?: string;
    triggerClassName?: string;
    dropdownClassName?: string;
    optionClassName?: string;
    activeOptionClassName?: string;
};

export const CustomSelect: FC<SelectProps> = ({
                                                  options,
                                                  value,
                                                  onChange,
                                                  placeholder = "Select an option",
                                                  error,
                                                  wrapperClassName = "",
                                                  triggerClassName = "",
                                                  dropdownClassName = "",
                                                  optionClassName = "",
                                                  activeOptionClassName = "",
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
        <div className={`relative w-full ${wrapperClassName}`} ref={ref}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between gap-2 rounded-[5px] p-[16px] text-[16px] cursor-pointer select-none border transition-colors ${
                    error ? "bg-red-500 border-red-500" : "bg-[#006799] border-[#6B9AB0]"
                } ${triggerClassName}`}
            >
                <span className="w-full text-center">{selectedOption?.label || placeholder}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute z-10 mt-2 w-full text-[16px] text-center bg-white border border-[#6B9AB0] rounded-[5px] shadow-md max-h-[200px] overflow-auto ${dropdownClassName}`}
                    >
                        {options.map((option) => {
                            const isSelected = value === option.value;
                            return (
                                <li
                                    key={option.value}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        px-4 py-2 m-[7px] rounded-[4px] cursor-pointer transition-colors duration-150
                                        text-[#006799] hover:bg-[#ECECEC]
                                        ${optionClassName}
                                        ${isSelected ? `font-semibold bg-[#ECECEC] ${activeOptionClassName}` : ""}
                                    `}
                                >
                                    {option.label}
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};
