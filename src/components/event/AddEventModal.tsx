import { FC, useEffect, useState } from "react";
import { CustomButton } from "@/ui/CustomButton.tsx";
import {
    CurrencyDollarIcon,
    EnvelopeIcon,
    PlusIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";
import { CustomModal } from "@/ui/CustomModal.tsx";
import { CustomInput } from "@/ui/CustomInput.tsx";
import { Calendar } from "primereact/calendar";
import { CustomSelect } from "@/ui/CustomSelect.tsx";
import { getDepartments } from "@/api/endpoints/departments.ts";
import { Department } from "@/types/departments.ts";
import { useEventsStore } from "@/store/useEventsStore.ts";
import { toast } from "react-hot-toast";

export const AddEventModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dates, setDates] = useState<Date[] | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [price, setPrice] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        department: false,
        price: false,
        dates: false,
    });

    const { addEvent, fetchEvents } = useEventsStore();

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

        const periodFrom = Array.isArray(dates) && dates[0]
            ? dates[0].toISOString().split("T")[0]
            : null;

        const periodTo = Array.isArray(dates) && dates[1]
            ? dates[1].toISOString().split("T")[0]
            : null;

        const newErrors = {
            name: !name,
            email: !email || !emailRegex.test(email),
            department: !selectedDepartment,
            price: !price || price <= 0,
            dates: !periodFrom || !periodTo,
        };

        setErrors(newErrors);

        const messages: string[] = [];

        if (newErrors.name) messages.push("Event name is required");
        if (!email) {
            messages.push("Manager email is required")
        }
        else if (!emailRegex.test(email)) {
            messages.push("Invalid email format");
        };
        if (newErrors.department) messages.push("Department is required");
        if (newErrors.price) messages.push("Valid price is required");
        if (newErrors.dates) messages.push("Event date range is required");

        if (messages.length > 0) {
            messages.forEach((msg) => toast.error(msg));
            return;
        }

        try {
            await addEvent({
                title: name,
                manager_email: email,
                department_id: selectedDepartment,
                period_from: periodFrom!,
                period_till: periodTo!,
                price: price,
            });

            await fetchEvents()

            toast.success("Event created successfully!");
            setIsModalOpen(false);
            setName("");
            setEmail("");
            setPrice(0);
            setSelectedDepartment("");
            setDates(null);
            setErrors({
                name: false,
                email: false,
                department: false,
                price: false,
                dates: false,
            });
            toast.success("Event added successfully")
        } catch (err:any) {
            console.error("Failed to add event:", err);
            toast.error("Something went wrong while adding the event.");
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

            <CustomModal title={"Add Event"} isOpen={isModalOpen} className={"max-w-md w-full"} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-[21px]">
                    <CustomInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<UserCircleIcon className={errors.name ? "text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Enter event name"
                        className={errors.name ? "border border-red-500" : ""}
                    />

                    <CustomInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<EnvelopeIcon className={errors.email ? "text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Enter manager's email"
                        className={errors.email ? "border border-red-500" : ""}
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
                        value={String(price)}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        icon={<CurrencyDollarIcon className={errors.price ? "text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Enter price"
                        type="number"
                        className={errors.price ? "border border-red-500" : ""}
                    />

                    <div className={`card flex justify-content-center ${errors.dates ? "border border-red-500 rounded-md" : ""}`}>
                        <Calendar
                            className="w-full rounded-md shadow-sm"
                            placeholder="Choose date range"
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
