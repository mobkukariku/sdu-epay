import {FC, useEffect, useState} from "react";
import {getDepartments} from "@/api/endpoints/departments.ts";
import {Department} from "@/types/departments.ts";
import {useEventsStore} from "@/store/useEventsStore.ts";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {
    CurrencyDollarIcon,
    EnvelopeIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {Calendar} from "primereact/calendar";
import {CustomSelect} from "@/ui/CustomSelect.tsx";

interface EditEventsModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventData: {
        id: string;
        title: string;
        manager_email: string;
        price: number;
        period_from: string;
        period_till: string;
        department: {
            id: string;
            name: string;
        }
    };
}

export const EditEventsModal: FC<EditEventsModalProps> = ({isOpen, onClose, eventData}) => {
    const [title, setTitle] = useState(eventData.title);
    const [email, setEmail] = useState(eventData.manager_email);
    const [price, setPrice] = useState(eventData.price);
    const [periodFrom, setPeriodFrom] = useState(eventData.period_from);
    const [periodTill, setPeriodTill] = useState(eventData.period_till);
    const [selectedDepartment, setSelectedDepartment] = useState(eventData.department.id);
    const [dates, setDates] = useState<Date[] | null>([
        new Date(eventData.period_from),
        new Date(eventData.period_till)
    ]);
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);

    const {updateEvent} = useEventsStore();

    useEffect(() => {
        if(isOpen){
            setTitle(eventData.title);
            setEmail(eventData.manager_email);
            setPrice(eventData.price);
            setPeriodFrom(eventData.period_from);
            setPeriodTill(eventData.period_till);
            setSelectedDepartment(eventData.department.id);
        }
    }, [isOpen, eventData]);


    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                const formatted = response.data.map((dept: Department) => ({
                    label: dept.name,
                    value: dept.id,
                }));
                setDepartments(formatted);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleUpdate = async () => {
        const periodFromFormat = Array.isArray(dates) && dates[0]
            ? dates[0].toISOString().split("T")[0]
            : null;

        const periodTillFormat = Array.isArray(dates) && dates[1]
            ? dates[1].toISOString().split("T")[0]
            : null;

        if(!title || !email || !periodFrom || !periodTill || !price || !selectedDepartment ){
            alert("Please fill in all required fields.");
            return;
        }

        try{
            await updateEvent(eventData.id, {
                title,
                manager_email: email,
                price: price || 0,
                period_from: periodFromFormat,
                period_till: periodTillFormat,
                department_id: selectedDepartment,
            })
            onClose()
        }catch (err){
            console.error("Failed to update department", err);
        };
    }

    return (
        <CustomModal title="Edit Event" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-[21px]">
                <CustomInput
                    icon={<InformationCircleIcon className="text-[#6B9AB0]" />}
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <CustomInput
                    icon={<EnvelopeIcon className="text-[#6B9AB0]" />}
                    placeholder="Enter email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <CustomSelect
                    placeholder="Select department"
                    options={departments}
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                    triggerClassName="bg-white h-[50px] text-black"
                    dropdownClassName="bg-gray-100"
                    optionClassName="text-sm"
                    activeOptionClassName="bg-blue-200"
                />
                <CustomInput
                    icon={<CurrencyDollarIcon className="text-[#6B9AB0]" />}
                    placeholder="Enter price"
                    type="number"
                    value={String(price)}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <Calendar
                    className="w-full border border-[#6B9AB0] rounded-md shadow-sm"
                    placeholder="Choose a date"
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
    )


}

