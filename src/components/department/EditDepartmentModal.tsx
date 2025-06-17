import {FC, useEffect, useState} from "react";
import {useDepartmentsStore} from "@/store/useDepartmentsStore.ts";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {EnvelopeIcon, } from "@heroicons/react/24/outline";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {toast} from "react-hot-toast";
import { AddAdditionalFields } from "@/components/department/AddAdditionalFields";


interface EditDepartmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    departmentData: {
        id:string;
        name: string;
        additional_fields?: Record<string, { type: string }>;
    },
}


export const EditDepartmentModal: FC<EditDepartmentModalProps> = ({isOpen, onClose, departmentData}) => {
    const [additionalFields, setAdditionalFields] = useState<{ name: string; type: string }[]>([]);
    const [name, setName] = useState(departmentData.name);

    const {updateDepartment} = useDepartmentsStore();

    useEffect(() => {
        if (isOpen) {
            setName(departmentData.name);
            const fields = departmentData.additional_fields
                ? Object.entries(departmentData.additional_fields).map(([key, value]) => ({
                    name: key,
                    type: value.type,
                }))
                : [];
            setAdditionalFields(fields);
        }
    }, [isOpen, departmentData]);

    const handleUpdate = async () => {
        const additional_fields: Record<string, { type: string }> = {};
        additionalFields.forEach((field) => {
            additional_fields[field.name] = { type: field.type };
        });

        try {
            await updateDepartment(departmentData.id, {
                name,
                additional_fields,
            });
            onClose();
            toast.success("Департамент успешно изменен");
        } catch (error: any) {
            console.error("Failed to update department:", error);
            toast.error(error.response.data.detail?.[0]?.msg || "Ошибка с редактированием");
        }
    };

    return (
        <CustomModal
            title="Редактирование департамента"
            className="max-w-md w-full"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col gap-[21px]">
                <CustomInput
                    icon={<EnvelopeIcon className="text-[#6B9AB0]" />}
                    placeholder="Введите название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <AddAdditionalFields value={additionalFields} onChange={setAdditionalFields} />

                <CustomButton onClick={handleUpdate} className="w-full">
                    Save Changes
                </CustomButton>
            </div>
        </CustomModal>
    );

}