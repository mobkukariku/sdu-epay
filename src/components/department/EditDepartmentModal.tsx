import {FC, useEffect, useState} from "react";
import {useDepartmentsStore} from "@/store/useDepartmentsStore.ts";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {EnvelopeIcon, } from "@heroicons/react/24/outline";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {toast} from "react-hot-toast";

interface EditDepartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    departmentData: {
        id:string;
        name: string;
    },
}


export const EditDepartmentModal: FC<EditDepartmentModalProps> = ({isOpen, onClose, departmentData}) => {
    const [name, setName] = useState(departmentData.name);

    const {updateDepartment} = useDepartmentsStore();

    useEffect(() => {
        if(isOpen){
            setName(departmentData.name);
        }
    }, [isOpen, departmentData]);

    const handleUpdate = async () => {

        try {
            await updateDepartment(departmentData.id, {
                name
            })
            onClose();
            toast.success("Department successfully changed")
        } catch (error:any) {
            console.error("Failed to update department:", error)
            toast.error(error.response.data.detail[0].msg)
        }
    }
        return (
            <CustomModal title="Edit Department" isOpen={isOpen} onClose={onClose}>
                <div className="flex flex-col gap-[21px]">
                    <CustomInput
                        icon={<EnvelopeIcon className="text-[#6B9AB0]" />}
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CustomButton onClick={handleUpdate} className="w-full">
                        Save Changes
                    </CustomButton>
                </div>
            </CustomModal>
        )
}