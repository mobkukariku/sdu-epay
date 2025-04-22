import { FC, useState } from "react";
import { PaymentMethodItem } from "./PaymentMethodItem.tsx";

export const PaymentMethod: FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    return (
        <div>
            <p className="text-[24px] font-medium mt-[26px] mb-[12px]">Payment method</p>
            <div className="flex justify-between gap-[16px]">
                <PaymentMethodItem
                    icon="/icons/HalykBank.svg"
                    name="Halyk Bank"
                    selected={selectedMethod === "Halyk Bank"}
                    onClick={() => setSelectedMethod("Halyk Bank")}
                />
                <PaymentMethodItem
                    icon="/icons/KaspiBank.svg"
                    name="Kaspi Bank"
                    selected={selectedMethod === "Kaspi Bank"}
                    onClick={() => setSelectedMethod("Kaspi Bank")}
                />
            </div>
        </div>
    );
};
