import {FC, useState} from "react";
import {useDepartmentsStore} from "@/store/useDepartmentsStore.ts";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {PlusIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {toast} from "react-hot-toast";


export const AddDepartmentModal:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");

    const {addDepartment} = useDepartmentsStore();

    const handleSubmit = async () => {
        try{
            await addDepartment({
                name: name
            });
            setIsModalOpen(false);
            toast.success("Department created Successfully")
        }catch (err:any){
            console.log(err)
           toast.error(err.response.data.detail[0].msg)
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