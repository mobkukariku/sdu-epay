import {FC, useState} from "react";
import {useDepartmentsStore} from "@/store/useDepartmentsStore.ts";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {AddDepartmentModal} from "@/components/department/AddDepartmentModal.tsx";

export const DepartmentsFilters:FC = () => {
    const [name, setName] = useState("");

    const {fetchDepartments} = useDepartmentsStore();
    const handleSearch = async () => {
        await fetchDepartments({
            name: name || undefined,
        });
    }


    return (
        <div className="flex justify-between items-end mb-[31px]">
            <div className="flex gap-[22px]">
                <div className="flex flex-col gap-[10px]">
                    <label>Department name</label>
                    <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#FFFFFF]  h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                    placeholder="Enter Events name"
                        />
                </div>
                <CustomButton
                    onClick={handleSearch}
                    className="h-[37px] px-4 mt-auto text-white rounded-[4px]  transition"
                >
                    Search
                </CustomButton>
            </div>
            <AddDepartmentModal />
        </div>
    )
}