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
import { toast } from "react-hot-toast";

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
    const [errors, setErrors] = useState({
        title: false,
        email: false,
        department: false,
        price: false,
        dates: false,
    });
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);

    const {updateEvent, fetchEvents} = useEventsStore();

    useEffect(() => {
        if (isOpen) {
            setTitle(eventData.title);
            setEmail(eventData.manager_email);
            setPrice(eventData.price);
            setPeriodFrom(eventData.period_from);
            setPeriodTill(eventData.period_till);
            setSelectedDepartment(eventData.department.id);
            setDates([
                new Date(eventData.period_from),
                new Date(eventData.period_till)
            ]);
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


    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const from = Array.isArray(dates) && dates[0]
            ? dates[0].toISOString().split("T")[0]
            : null;

        const till = Array.isArray(dates) && dates[1]
            ? dates[1].toISOString().split("T")[0]
            : null;

        const newErrors = {
            title: !title.trim(),
            email: !email.trim() || !emailRegex.test(email),
            department: !selectedDepartment,
            price: !price || price <= 0,
            dates: !periodFrom || !periodTill,
        };

        setErrors(newErrors);

        const messages: string[] = [];

        if (newErrors.title) messages.push("Event title is required");
        if (!email.trim()) {
            messages.push("Manager email is required");
        } else if (!emailRegex.test(email)) {
            messages.push("Invalid email format");
        }
        if (newErrors.department) messages.push("Department is required");
        if (newErrors.price) messages.push("Valid price is required");
        if (newErrors.dates) messages.push("Event date range is required");

        if (messages.length > 0) {
            messages.forEach((msg) => toast.error(msg));
            return;
        }

        try {
            await updateEvent(eventData.id, {
                title,
                manager_email: email,
                department_id: selectedDepartment,
                price,
                period_from: from!,
                period_till: till!,
            });

            await fetchEvents();

            toast.success("Event updated successfully!");
            onClose();
        } catch (err) {
            console.error("Failed to update event:", err);
            toast.error("Something went wrong while updating the event.");
        }
    };

    return (
        <CustomModal title="Edit Event" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-[21px]">
                <CustomInput
                    icon={<InformationCircleIcon className={errors.title ? " text-red-500" : "text-[#6B9AB0]"} />}
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <CustomInput
                    icon={<EnvelopeIcon className={errors.email ? " text-red-500" : "text-[#6B9AB0]"} />}
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
                    triggerClassName={`bg-white h-[50px] text-black ${errors.department ? "border border-red-500" : ""}`}
                    dropdownClassName="bg-gray-100"
                    optionClassName="text-sm"
                    activeOptionClassName="bg-blue-200"
                />
                <CustomInput
                    icon={<CurrencyDollarIcon className={errors.price ? " text-red-500" : "text-[#6B9AB0]"} />}
                    placeholder="Enter price"
                    type="number"
                    value={String(price)}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <Calendar
                    className={`w-full border ${errors.dates ? " border-red-500" : "border-[#6B9AB0]"} rounded-md shadow-sm`}
                    placeholder="Choose a date"
                    value={dates}
                    onChange={(e) => setDates(e.value as Date[])}
                    selectionMode="range"
                    readOnlyInput
                    hideOnRangeSelection
                />

                <CustomButton onClick={handleSubmit} className="w-full">
                    Save Changes
                </CustomButton>
            </div>
        </CustomModal>
    );
};
