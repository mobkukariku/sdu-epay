import { FC, useEffect, useState } from "react";
import { CustomModal } from "@/ui/CustomModal.tsx";
import { CustomInput } from "@/ui/CustomInput.tsx";
import { CustomButton } from "@/ui/CustomButton.tsx";
import { Calendar } from "primereact/calendar";
import { CustomSelect } from "@/ui/CustomSelect.tsx";
import { getEvents } from "@/api/endpoints/events.ts";
import { IEvent } from "@/types/events.ts";
import {usePromoCodesStore} from "@/store/usePromoCodesStore.ts";
import {InformationCircleIcon, ReceiptPercentIcon} from "@heroicons/react/24/outline";
import {HashIcon} from "lucide-react";

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

    const {updatePromoCode} = usePromoCodesStore();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                const formatted = response.data.map((event: IEvent) => ({
                    label: event.title,
                    value: event.id,
                }));
                setEvents(formatted);
                console.log("promoData.event:", promoData.event);
                console.log("promoData.event.id:", promoData.event?.id);


                if (isOpen) {
                    setCode(promoData.code);
                    setLimit(promoData.limit);
                    setDiscount(promoData.discount);
                    setDates([
                        new Date(promoData.period_from),
                        new Date(promoData.period_till),
                    ]);
                    setSelectedEvent(promoData.event.id);
                }

            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, [isOpen]); // завися от открытия модалки




    const handleUpdate = async () => {
        const periodFromFormat =
            Array.isArray(dates) && dates[0]
                ? dates[0].toISOString().split("T")[0]
                : null;

        const periodTillFormat =
            Array.isArray(dates) && dates[1]
                ? dates[1].toISOString().split("T")[0]
                : null;

        if (!code || !limit || !discount || !selectedEvent || !periodFromFormat || !periodTillFormat) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            await updatePromoCode(promoData.id, {
                code,
                limit,
                discount,
                event_id: selectedEvent,
                period_from: periodFromFormat,
                period_till: periodTillFormat,
            });

            onClose();
        } catch (err) {
            console.error("Failed to update promo code", err);
        }
    };

    return (
        <CustomModal title="Edit Promo Code" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-[21px]">
                <CustomInput
                    icon={<HashIcon className={`text-[#6B9AB0]`} />}
                    placeholder="Enter promo code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <CustomSelect
                    placeholder="Select event"
                    options={events}
                    value={selectedEvent}
                    onChange={setSelectedEvent}
                    triggerClassName="bg-white h-[50px] text-black"
                    dropdownClassName="bg-gray-100"
                    optionClassName="text-sm"
                    activeOptionClassName="bg-blue-200"
                />
                <CustomInput
                    icon={<InformationCircleIcon className={`text-[#6B9AB0]`} />}
                    placeholder="Enter usage limit"
                    type="number"
                    value={String(limit)}
                    onChange={(e) => setLimit(Number(e.target.value))}
                />
                <CustomInput
                    placeholder="Enter discount %"
                    type="number"
                    icon={<ReceiptPercentIcon className="text-[#6B9AB0]" />}
                    value={String(discount)}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                />

                <Calendar
                    className="w-full border border-[#6B9AB0] rounded-md shadow-sm"
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
