import {FC, useEffect, useState} from "react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {CustomTable} from "@/ui/CustomTable.tsx";
import {PencilIcon, TrashIcon} from "lucide-react";
import {PromoCodeFilters} from "@/components/PromoCodeFilters.tsx";
import {usePromoCodesStore} from "@/store/usePromoCodesStore.ts";
import {EditPromoCodeModal} from "@/components/EditPromoCodeModal.tsx";

export const PromoCodesPage:FC = () => {
    const {promoCodes, fetchPromoCodes} = usePromoCodesStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState<any | null>(null);

    const columns = [
        { header: "Event Name", accessor: "eventName" },
        { header: "Promo code", accessor: "code" },
        { header: "Period from", accessor: "period_from" },
        {header: "Period till", accessor: "period_till"},
        { header: "Already used", accessor: "already_used" },
        { header: "Usage limit", accessor: "limit" },
    ];


    useEffect(() => {
        fetchPromoCodes();
    }, []);

    const handleEditClick = (promo: any) => {
        setSelectedPromo(promo);
        setIsEditModalOpen(true);
    };

    const formattedData = promoCodes.map((promo) => ({
        ...promo,
        eventName: promo.event?.title || "—", // используешь только для таблицы
    }));



    return (
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Admin Information</h1>
                <PromoCodeFilters/>
                <CustomTable
                    columns={columns}
                    data={formattedData}
                    actions={(row) => (
                        <div className="flex gap-2">
                            <button onClick={() => handleEditClick(row)} className="text-blue-600 hover:text-blue-800">
                                <PencilIcon className="w-4 cursor-pointer h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                                <TrashIcon className="w-4 cursor-pointer h-4" />
                            </button>
                        </div>
                    )}
                />
            </div>

            {selectedPromo && (
                <EditPromoCodeModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    promoData={selectedPromo}
                />
            )}
        </AdminLayout>
    )
}