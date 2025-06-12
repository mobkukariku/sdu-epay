import {FC, useState} from "react";
import {CustomButton} from "@/ui/CustomButton.tsx";
import {SduReader} from "@/components/reader/SduReader.tsx";
import {DormReader} from "@/components/reader/DormReader.tsx";

export const FileViewerPage:FC = () => {
    const [select, setSelect] = useState(0);
    return (
        <div className={"p-12"}>
            <div>
                <p className={"font-bold text-[32px] mb-[20px]"}>Excel file viewer</p>
                <span className={"text-[20px] font-light"}>Upload your excel file here below to view transactions details. (If you have problems with viewing files, please reload the page! thanks)</span>
            </div>
            <div className={"flex gap-5 mt-[50px]"}>
                <CustomButton onClick={() => setSelect(1)}>SDU University</CustomButton>
                <CustomButton onClick={() => setSelect(2)}>Dormitory</CustomButton>
            </div>
            <div>
                {select === 1 && (
                    <SduReader />
                ) || select === 2 && (
                    <DormReader />
                )}
            </div>
        </div>
    )
}