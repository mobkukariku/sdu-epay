import { FC, useEffect, useState } from "react";
import { CustomButton } from "@/ui/CustomButton.tsx";
import {
    InformationCircleIcon,
    PlusIcon,
    ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { CustomModal } from "@/ui/CustomModal.tsx";
import { CustomInput } from "@/ui/CustomInput.tsx";
import { Calendar } from "primereact/calendar";
import { CustomSelect } from "@/ui/CustomSelect.tsx";

import { HashIcon } from "lucide-react";
import { getEvents } from "@/api/endpoints/events.ts";
import { IEvent } from "@/types/events.ts";
import { usePromoCodesStore } from "@/store/usePromoCodesStore.ts";
import { toast } from "react-hot-toast";

export const AddPromoCodeModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState("");
    const [limit, setLimit] = useState("");
    const [discount, setDiscount] = useState("");
    const [dates, setDates] = useState<Date[] | null>(null);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [events, setEvents] = useState<{ label: string; value: string }[]>([]);

    const [errors, setErrors] = useState({
        code: false,
        limit: false,
        discount: false,
        discountTooHigh: false,
        dates: false,
        event: false,
    });

    const { addPromoCode, fetchPromoCodes } = usePromoCodesStore();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                const formatted = response.data.map((event: IEvent) => ({
                    label: event.title,
                    value: event.id,
                }));
                setEvents(formatted);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleSubmit = async () => {
        const periodFrom =
            Array.isArray(dates) && dates[0] ? dates[0].toISOString().split("T")[0] : null;

        const periodTo =
            Array.isArray(dates) && dates[1] ? dates[1].toISOString().split("T")[0] : null;

        const discountNum = Number(discount);
        const limitNum = Number(limit);

        const newErrors = {
            code: !code,
            limit: !limit || limitNum <= 0,
            discount: !discount || discountNum <= 0,
            discountTooHigh: discountNum >= 100,
            dates: !periodFrom || !periodTo,
            event: !selectedEvent,
        };

        setErrors(newErrors);

        const messages: string[] = [];
        if (newErrors.code) messages.push("Promo code is required");
        if (newErrors.limit) messages.push("Usage limit must be a positive number");
        if (newErrors.discount) messages.push("Discount must be a positive number");
        if (newErrors.discountTooHigh) messages.push("Discount must be less than 100%");
        if (newErrors.dates) messages.push("Promo code period is required");
        if (newErrors.event) messages.push("Event selection is required");

        if (messages.length > 0) {
            messages.forEach((msg) => toast.error(msg));
            return;
        }

        try {
            await addPromoCode({
                code: code,
                limit: limitNum,
                discount: discountNum,
                period_from: periodFrom!,
                period_till: periodTo!,
                event_id: selectedEvent,
            });

            await fetchPromoCodes();

            toast.success("Promo code added successfully!");
            setIsModalOpen(false);
            // Очистка формы
            setCode("");
            setLimit("");
            setDiscount("");
            setDates(null);
            setSelectedEvent("");
            setErrors({
                code: false,
                limit: false,
                discount: false,
                discountTooHigh: false,
                dates: false,
                event: false,
            });
        } catch (err) {
            console.error("Failed to add promo code:", err);
            toast.error("Error while adding promo code.");
        }
    };

    return (
        <>
            <CustomButton
                variant="submit"
                className="h-[38px] font-bold gap-[5px] px-[20px] flex rounded-[4px]"
                onClick={() => setIsModalOpen(true)}
            >
                <PlusIcon />
                ADD
            </CustomButton>
            <CustomModal title={"Add Promo-Code"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={"flex flex-col gap-[21px]"}>
                    <CustomInput
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        icon={<HashIcon className={`text-[#6B9AB0] ${errors.code ? "text-red-500" : ""}`} />}
                        placeholder={"Enter Promo-code"}
                        className={errors.code ? "border border-red-500" : ""}
                    />

                    <CustomSelect
                        placeholder="Select event"
                        options={events}
                        value={selectedEvent}
                        onChange={setSelectedEvent}
                        triggerClassName={`bg-white h-[50px] text-black ${errors.event ? "border border-red-500" : ""}`}
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />

                    <CustomInput
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        icon={<InformationCircleIcon className={`text-[#6B9AB0] ${errors.limit ? "text-red-500" : ""}`} />}
                        placeholder={"Enter usage limit"}
                        className={errors.limit ? "border border-red-500" : ""}
                        type="number"

                    />

                    <CustomInput
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        icon={<ReceiptPercentIcon className={`text-[#6B9AB0] ${errors.discount || errors.discountTooHigh ? "text-red-500" : ""}`} />}
                        placeholder={"Enter discount percentage"}
                        className={errors.discount || errors.discountTooHigh ? "border border-red-500" : ""}
                        type="number"
                    />

                    <div className={`card flex justify-content-center ${errors.dates ? "border border-red-500 rounded-md" : ""}`}>
                        <Calendar
                            className="w-full rounded-md shadow-sm"
                            placeholder="Promo code period"
                            value={dates}
                            onChange={(e) => setDates(e.value as Date[])}
                            selectionMode="range"
                            readOnlyInput
                            hideOnRangeSelection
                        />
                    </div>

                    <CustomButton onClick={handleSubmit} className="w-full">
                        ADD
                    </CustomButton>
                </div>
            </CustomModal>
        </>
    );
};
