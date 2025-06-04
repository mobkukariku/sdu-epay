import {FC, useEffect, useState} from "react";
import {AddEventModal} from "@/components/AddEventModal.tsx";
import {useEventsStore} from "@/store/useEventsStore.ts";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {getDepartments} from "@/api/endpoints/departments.ts";
import {Department} from "@/types/departments.ts";
import {CustomSelect} from "@/ui/CustomSelect.tsx";

export const EventFilters:FC = () => {
    const [name, setName] = useState("");
    const [departments, setDepartments] = useState<{ label: string; value: string }[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const {fetchEvents} = useEventsStore();

    const handleSearch = async () => {
        await fetchEvents({
            title: name || undefined,
            department_id: selectedDepartment || undefined,
            page: 0,
            size: 10,
        })
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await getDepartments();
                const formatted = response.data.map((dept: Department) => ({
                    label: dept.name,
                    value: dept.id,
                }));
                setDepartments([{ label: "All", value: "" }, ...formatted]);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            }
        };

        fetchDepartments();
    }, []);


    return (
        <div className="flex justify-between items-end mb-[31px]">
            <div className="flex gap-[22px]">
                <div className="flex flex-col gap-[10px]">
                    <label>Events name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#FFFFFF]  h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Events name"
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>Department</label>
                    <CustomSelect
                        options={departments}
                        value={selectedDepartment}
                        onChange={setSelectedDepartment}
                        triggerClassName="bg-white min-w-[200px]  h-[37px] text-black"
                        dropdownClassName="bg-gray-100"
                        optionClassName="text-sm"
                        activeOptionClassName="bg-blue-200"
                    />
                </div>
                <CustomButton
                    onClick={handleSearch}
                    className="h-[37px] px-4 mt-auto text-white rounded-[4px]  transition"
                >
                    Search
                </CustomButton>
            </div>
            <AddEventModal />
        </div>
    )
}