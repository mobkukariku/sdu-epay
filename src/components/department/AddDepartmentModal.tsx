import {FC, useState} from "react";
import {useDepartmentsStore} from "@/store/useDepartmentsStore.ts";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {PlusIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {CustomModal} from "@/ui/CustomModal.tsx";
import {CustomInput} from "@/ui/CustomInput.tsx";
import {toast} from "react-hot-toast";
import {AddAdditionalFields} from "@/components/department/AddAdditionalFields.tsx";


export const AddDepartmentModal:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [additionalFields, setAdditionalFields] = useState<{name:string; type:string}[]>([]);
    const [name, setName] = useState("");

    const {addDepartment} = useDepartmentsStore();

    const handleSubmit = async () => {
        const additional_fields: Record<string, any> = {};
        additionalFields.forEach((field) => {
            additional_fields[field.name] = { type: field.type };
        });

        try{
            await addDepartment({
                name: name,
                additional_fields
            });
            setIsModalOpen(false);
            toast.success("Департамент успешно добавлен")
        }catch (err:any){
            console.log(err)
           toast.error(err.response.data.detail[0].msg)
        }
    }

    return (
        <>
            <CustomButton variant="submit" className="h-[38px] font-bold gap-[5px] px-[20px] flex rounded-[4px]" onClick={() => setIsModalOpen(true)}>
                <PlusIcon />
                Добавить
            </CustomButton>
            <CustomModal className={"w-[600px]"} title={"Добавить департамент"}  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={"flex flex-col gap-[21px]"}>
                    <CustomInput
                        onChange={(e) => setName(e.target.value)}
                        icon={<UserCircleIcon className={`text-[#6B9AB0]`} />}
                        placeholder={"Введите название"}
                    />
                    <AddAdditionalFields value={additionalFields} onChange={setAdditionalFields} />
                    <CustomButton
                        onClick={handleSubmit}
                        className="w-full"

                    >
                        Добавить
                    </CustomButton>
                </div>
            </CustomModal>
        </>
    )
}