import {FC, useEffect, useState} from "react";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {
    InformationCircleIcon,
    PlusIcon, ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {Calendar} from "primereact/calendar";
import {CustomSelect} from "@/ui/CustomSelect.tsx";

import {HashIcon} from "lucide-react";
import {getEvents} from "@/api/endpoints/events.ts";
import {IEvent} from "@/types/events.ts";
import {usePromoCodesStore} from "@/store/usePromoCodesStore.ts";

export const AddPromoCodeModal:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState("");
    const [limit, setLimit] = useState("");
    const [discount, setDiscount] = useState("");
    const [dates, setDates] = useState<Date[] | null>(null);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [event, setEvent] = useState<{ label: string; value: string }[]>([]);


    const {addPromoCode} = usePromoCodesStore();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                const formatted = response.data.map((event: IEvent) => ({
                    label: event.title,
                    value: event.id,
                }));
                setEvent(formatted);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleSubmit = async () => {
        const periodFrom = Array.isArray(dates) && dates[0]
            ? dates[0].toISOString().split("T")[0]
            : null;

        const periodTo = Array.isArray(dates) && dates[1]
            ? dates[1].toISOString().split("T")[0]
            : null;


        if (!code || !selectedEvent || !periodFrom || !periodTo || !limit || !discount) {
            alert("Please fill in all fields.");
            return;
        }

        try{
            await addPromoCode({
                code: code,
                limit: Number(limit),
                discount: Number(discount),
                period_from: periodFrom,
                period_till: periodTo,
                event_id: selectedEvent,
            })
            setIsModalOpen(false);
        }catch (err){
            console.error("Failed to add department:", err);
            alert("Error while adding department.");
        }

    }

    return (
        <>
            <CustomButton variant="submit" className="h-[38px] font-bold gap-[5px] px-[20px] flex rounded-[4px]" onClick={() => setIsModalOpen(true)}>
                <PlusIcon />
                ADD
            </CustomButton>
            <CustomModal title={"Add Promo-Code"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={"flex flex-col gap-[21px]"}>
                    <CustomInput
                        onChange={(e) => setCode(e.target.value)}
                        icon={<HashIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter Promo-code"}
                    />

                    <CustomSelect
                        placeholder="Select event"
                        options={event}
                        value={selectedEvent}
                        onChange={setSelectedEvent}
                        triggerClassName="bg-white h-[50px] text-black"
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />
                    <CustomInput
                        onChange={(e) => setLimit(e.target.value)}
                        icon={<InformationCircleIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter usage limit"}
                    />
                    <CustomInput
                        onChange={(e) => setDiscount(e.target.value)}
                        icon={<ReceiptPercentIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter discount percentage"}
                    />
                    <div className="card flex justify-content-center">
                        <Calendar
                            className="w-full border border-[#6B9AB0] rounded-md shadow-sm"
                            placeholder="Promo code period"
                            value={dates}
                            onChange={(e) => setDates(e.value as Date[])}
                            selectionMode="range"
                            readOnlyInput
                            hideOnRangeSelection
                        />

                    </div>

                    <CustomButton
                        onClick={handleSubmit}
                        className="w-full"

                    >
                        ADD
                    </CustomButton>
                </div>
            </CustomModal>
        </>
    )
}