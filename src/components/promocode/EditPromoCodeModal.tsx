import { FC, useEffect, useState } from "react";
import { CustomModal } from "@/ui/CustomModal.tsx";
import { CustomInput } from "@/ui/CustomInput.tsx";
import { CustomButton } from "@/ui/CustomButton.tsx";
import { Calendar } from "primereact/calendar";
import { CustomSelect } from "@/ui/CustomSelect.tsx";
import { getEvents } from "@/api/endpoints/events.ts";
import { IEvent } from "@/types/events.ts";
import { usePromoCodesStore } from "@/store/usePromoCodesStore.ts";
import {
    InformationCircleIcon,
    ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { HashIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface EditPromoCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    promoData: {
        id: string;
        code: string;
        limit: number;
        discount: number;
        period_from: string;
        period_till: string;
        already_used: number;
        event: {
            id: string;
            title: string;
            manager_email: string;
            price: string;
            period_from: string;
            period_till: string;
        };
    };
}

export const EditPromoCodeModal: FC<EditPromoCodeModalProps> = ({
                                                                    isOpen,
                                                                    onClose,
                                                                    promoData,
                                                                }) => {
    const [code, setCode] = useState(promoData.code);
    const [limit, setLimit] = useState(promoData.limit);
    const [discount, setDiscount] = useState(promoData.discount);
    const [selectedEvent, setSelectedEvent] = useState(promoData.event.id);
    const [dates, setDates] = useState<Date[] | null>([
        new Date(promoData.period_from),
        new Date(promoData.period_till),
    ]);
    const [events, setEvents] = useState<{ label: string; value: string }[]>([]);

    const [errors, setErrors] = useState({
        code: false,
        limit: false,
        discount: false,
        event: false,
        dates: false,
    });

    const { updatePromoCode, fetchPromoCodes } = usePromoCodesStore();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                const formatted = response.data.map((event: IEvent) => ({
                    label: event.title,
                    value: event.id,
                }));
                setEvents(formatted);

                if (isOpen) {
                    setCode(promoData.code);
                    setLimit(promoData.limit);
                    setDiscount(promoData.discount);
                    setDates([
                        new Date(promoData.period_from),
                        new Date(promoData.period_till),
                    ]);
                    setSelectedEvent(promoData.event.id);

                    setErrors({
                        code: false,
                        limit: false,
                        discount: false,
                        event: false,
                        dates: false,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, [isOpen]);

    const handleUpdate = async () => {
        const periodFromFormat =
            Array.isArray(dates) && dates[0]
                ? dates[0].toISOString().split("T")[0]
                : null;
        const periodTillFormat =
            Array.isArray(dates) && dates[1]
                ? dates[1].toISOString().split("T")[0]
                : null;

        const newErrors = {
            code: !code.trim() || code.length<3,
            limit: !limit || limit < 1,
            discount: !discount || discount < 1 || discount > 100,
            event: !selectedEvent,
            dates: !periodFromFormat || !periodTillFormat,
        };

        setErrors(newErrors);

        const messages: string[] = [];

        if (newErrors.code) messages.push("Promo code is required.");
        if (newErrors.limit) messages.push("Limit must be at least 1.");
        if (newErrors.discount)
            messages.push("Discount must be between 1 and 100.");
        if (newErrors.event) messages.push("Please select an event.");
        if (newErrors.dates) messages.push("Please select a valid date range.");

        if (messages.length > 0) {
            messages.forEach((msg) => toast.error(msg));
            return;
        }

        try {
            await updatePromoCode(promoData.id, {
                code,
                limit,
                discount,
                event_id: selectedEvent,
                period_from: periodFromFormat!,
                period_till: periodTillFormat!,
            });

            await fetchPromoCodes();
            toast.success("Promo code updated successfully.");
            onClose();
        } catch (err: any) {
            const message =
                err?.response?.data?.message || err?.message || "Update failed.";
            toast.error(message);
        }
    };

    return (
        <CustomModal title="Edit Promo Code" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-[21px]">
                <CustomInput
                    icon={
                        <HashIcon className={errors.code ? "text-red-500" : "text-[#6B9AB0]"} />
                    }
                    placeholder="Enter promo code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <CustomSelect
                    placeholder="Select event"
                    options={events}
                    value={selectedEvent}
                    onChange={setSelectedEvent}
                    triggerClassName={`bg-white h-[50px] text-black ${
                        errors.event ? "border border-red-500" : ""
                    }`}
                    dropdownClassName="bg-gray-100"
                    optionClassName="text-sm"
                    activeOptionClassName="bg-blue-200"
                />
                <CustomInput
                    icon={
                        <InformationCircleIcon
                            className={errors.limit ? "text-red-500" : "text-[#6B9AB0]"}
                        />
                    }
                    placeholder="Enter usage limit"
                    type="number"
                    value={String(limit)}
                    onChange={(e) => setLimit(Number(e.target.value))}
                />
                <CustomInput
                    placeholder="Enter discount %"
                    type="number"
                    icon={
                        <ReceiptPercentIcon
                            className={errors.discount ? "text-red-500" : "text-[#6B9AB0]"}
                        />
                    }
                    value={String(discount)}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                />

                <Calendar
                    className={`w-full border ${
                        errors.dates ? "border-red-500" : "border-[#6B9AB0]"
                    } rounded-md shadow-sm`}
                    placeholder="Choose a date range"
                    value={dates}
                    onChange={(e) => setDates(e.value as Date[])}
                    selectionMode="range"
                    readOnlyInput
                    hideOnRangeSelection
                />
                <CustomButton onClick={handleUpdate} className="w-full">
                    Save Changes
                </CustomButton>
            </div>
        </CustomModal>
    );
};
