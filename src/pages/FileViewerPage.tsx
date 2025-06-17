import {FC, useState} from "react";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {SduReader} from "@/components/reader/SduReader.tsx";
import {DormReader} from "@/components/reader/DormReader.tsx";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";

export const FileViewerPage:FC = () => {
    const [select, setSelect] = useState(0);
    return (
       <AdminLayout>
           <div className={"p-12"}>
               <div>
                   <p className="font-bold text-[32px] mb-[20px]">Просмотр Excel файлов</p>
                   <span className="text-[20px] font-light">
                      Загрузите Excel-файл ниже, чтобы просмотреть детали транзакций. (Если возникли проблемы с отображением, попробуйте перезагрузить страницу)
                   </span>
               </div>
               <div className={"flex gap-5 mt-[50px]"}>
                   <CustomButton onClick={() => setSelect(1)}>SDU University</CustomButton>
                   <CustomButton onClick={() => setSelect(2)}>Dormitory</CustomButton>
               </div>
               <div className="mt-8">
                   {select === 1 && <SduReader />}
                   {select === 2 && <DormReader />}
               </div>
           </div>
       </AdminLayout>
    )
}