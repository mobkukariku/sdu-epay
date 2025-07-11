import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CustomSelect } from "@/ui/CustomSelect.tsx";


const languageOptions = [
    { label: "Русский", value: "ru" },
    { label: "English", value: "en" },
    { label: "Қазақша", value: "kz" },
];

export const LanguageSwitcher: FC = () => {
    const { i18n } = useTranslation();

    const handleChange = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    };


    return (
        <div className="flex gap-2 items-center">
            <CustomSelect
                options={languageOptions}
                value={i18n.language}
                onChange={handleChange}
                wrapperClassName="w-[120px]"
                triggerClassName="bg-white min-w-[100px]  h-[37px] text-black"
                dropdownClassName="bg-gray-100"
                optionClassName="text-sm"
                activeOptionClassName="bg-blue-200"
            />
        </div>
    );
};
