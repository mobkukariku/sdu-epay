import {FC, useEffect, useState} from "react";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {
    CurrencyDollarIcon,
    EnvelopeIcon,
    PlusIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {Calendar} from "primereact/calendar";
import {CustomSelect} from "@/ui/CustomSelect.tsx";
import {getDepartments} from "@/api/endpoints/departments.ts";
import {Department} from "@/types/departments.ts";
import {useEventsStore} from "@/store/useEventsStore.ts";

export const AddEventModal:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dates, setDates] = useState<Date[] | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [price, setPrice] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);



    const {addEvent} = useEventsStore();

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
        const periodFrom = Array.isArray(dates) && dates[0]
            ? dates[0].toISOString().split("T")[0]
            : null;

        const periodTo = Array.isArray(dates) && dates[1]
            ? dates[1].toISOString().split("T")[0]
            : null;


        if (!name || !email || !selectedDepartment || !price || !periodFrom || !periodTo) {
            alert("Please fill in all fields.");
            return;
        }

        try{
            await addEvent({
                title: name,
                manager_email: email,
                department_id: selectedDepartment,
                period_from: periodFrom,
                period_till: periodTo,
                price: price,
            });
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
            <CustomModal title={"Add Event"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={"flex flex-col gap-[21px]"}>
                    <CustomInput
                        onChange={(e) => setName(e.target.value)}
                        icon={<UserCircleIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter department name"}
                    />

                    <CustomInput
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<EnvelopeIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter manager's email"}
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
                        onChange={(e) => setPrice(Number(e.target.value))}
                        icon={<CurrencyDollarIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Enter price"}
                    />

                    <div className="card flex justify-content-center">
                        <Calendar
                            className="w-full border border-[#6B9AB0] rounded-md shadow-sm"
                            placeholder="Choose a date"
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