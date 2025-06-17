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

        if (newErrors.name) messages.push("Название мероприятия обязательно");
        if (!email) {
            messages.push("Email администратора обязателен");
        } else if (!emailRegex.test(email)) {
            messages.push("Неверный формат email");
        }
        if (newErrors.department) messages.push("Необходимо выбрать департамент");
        if (newErrors.price) messages.push("Укажите корректную цену");
        if (newErrors.dates) messages.push("Необходимо указать период проведения");

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

            toast.success("Событие успешно создано!");
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
        } catch (err:any) {
            console.error("Failed to add event:", err);
            toast.error("Что-то пошло не так при добавлении события.");
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
                Добавить
            </CustomButton>

            <CustomModal title={"Добавить событие"} isOpen={isModalOpen} className={"max-w-md w-full"} onClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col gap-[21px]">
                    <CustomInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<UserCircleIcon className={errors.name ? "text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Название события"
                        className={errors.name ? "border border-red-500" : ""}
                    />

                    <CustomInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<EnvelopeIcon className={errors.email ? "text-red-500" : "text-[#6B9AB0]"} />}
                        placeholder="Email менеджера"
                        className={errors.email ? "border border-red-500" : ""}
                    />

                    <CustomSelect
                        placeholder="Выберите департамент"
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
                        placeholder="Введите цену"
                        type="number"
                        className={errors.price ? "border border-red-500" : ""}
                    />

                    <div className={`card flex justify-content-center ${errors.dates ? "border border-red-500 rounded-md" : ""}`}>
                        <Calendar
                            className="w-full rounded-md shadow-sm"
                            placeholder="Выберите диапазон дат"
                            value={dates}
                            onChange={(e) => setDates(e.value as Date[])}
                            selectionMode="range"
                            readOnlyInput
                            hideOnRangeSelection
                        />
                    </div>

                    <CustomButton onClick={handleSubmit} className="w-full">
                        Добавить
                    </CustomButton>
                </div>
            </CustomModal>
        </>
    );
};
