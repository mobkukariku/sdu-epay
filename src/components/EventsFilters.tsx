import {FC} from "react";
import {AddEventModal} from "@/components/AddEventModal.tsx";

export const EventFilters:FC = () => {
    return (
        <div className="flex justify-between items-end mb-[31px]">
            <div className="flex gap-[22px]">
                <div className="flex flex-col gap-[10px]">
                    <label>Events name</label>
                    <input
                        type="text"
                        className="bg-[#FFFFFF]  h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Events name"
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>ID</label>
                    <input
                        type="text"
                        className="bg-[#FFFFFF] h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Invoice ID"
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label>Department</label>
                    <input
                        type="text"
                        className="bg-[#FFFFFF] h-[37px] p-2 border-1 rounded-[4px] border-[#6B9AB0]"
                        placeholder="Enter Department Name"
                    />
                </div>
            </div>
            <AddEventModal />
        </div>
    )
}