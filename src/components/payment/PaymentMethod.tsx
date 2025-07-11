import { FC, useState } from "react";
import { PaymentMethodItem } from "./PaymentMethodItem.tsx";
import {useTranslation} from "react-i18next";

export interface PaymentMethodProps {
    error?: string;
    onChange: (value: string) => void;
}

export const PaymentMethod: FC<PaymentMethodProps> = ({ error, onChange }) => {
    const {t} = useTranslation();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const handleSelectMethod = (method: string) => {
        setSelectedMethod(method);
        onChange(method);
    };

    return (
        <div>
            <p className="text-[24px] font-medium mt-[26px] mb-[12px]">{t('paymentPage.paymentMethod')}</p>
            <div className="flex justify-between gap-[16px]">
                <PaymentMethodItem
                    icon="/icons/HalykBank.svg"
                    name="HalykBank"
                    selected={selectedMethod === "HalykBank"}
                    onClick={() => handleSelectMethod("HalykBank")}
                    error={error}
                />
                <PaymentMethodItem
                    icon="/icons/KaspiBank.svg"
                    name="KaspiBank"
                    selected={selectedMethod === "KaspiBank"}
                    onClick={() => handleSelectMethod("KaspiBank")}
                    error={error}
                />
            </div>

        </div>
    );
};
