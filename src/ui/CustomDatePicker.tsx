import { FC, useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const CustomDatePicker: FC = () => {
    const [selected, setSelected] = useState<Date | undefined>();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Закрытие при клике вне компонента
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
        <div className="relative h-full w-full max-w-sm" ref={ref}>
            <input
                readOnly
                onClick={() => setIsOpen(!isOpen)}
                value={selected ? format(selected, "PPP") : ""}
                placeholder="Select a date"
                className="h-[37px] bg-[#F3F3F3] w-full"
            />

            {isOpen && (
                <div className="absolute z-20 mt-2 bg-white shadow-xl rounded-xl border p-3 animate-fade-in">
                    <DayPicker
                        animate
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        footer={
                            selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
                        }
                    />
                </div>
            )}
        </div>
    );
};
