import { FC, useState } from "react";
import { PaymentMethodItem } from "./PaymentMethodItem.tsx";

export interface PaymentMethodProps {
    error?: string;
    onChange: (value: string) => void;
}

export const PaymentMethod: FC<PaymentMethodProps> = ({ error, onChange }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const handleSelectMethod = (method: string) => {
        setSelectedMethod(method);
        onChange(method);
    };

    return (
        <div>
            <p className="text-[24px] font-medium mt-[26px] mb-[12px]">Payment method</p>
            <div className="flex justify-between gap-[16px]">
                <PaymentMethodItem
                    icon="/icons/HalykBank.svg"
                    name="Halyk Bank"
                    selected={selectedMethod === "Halyk Bank"}
                    onClick={() => handleSelectMethod("Halyk Bank")}
                    error={error}
                />
                <PaymentMethodItem
                    icon="/icons/KaspiBank.svg"
                    name="Kaspi Bank"
                    selected={selectedMethod === "Kaspi Bank"}
                    onClick={() => handleSelectMethod("Kaspi Bank")}
                    error={error}
                />
            </div>

        </div>
    );
};
