import {FC, useEffect} from "react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {CustomTable} from "@/ui/CustomTable.tsx";
import {PencilIcon, TrashIcon} from "lucide-react";
import {PromoCodeFilters} from "@/components/PromoCodeFilters.tsx";
import {usePromoCodesStore} from "@/store/usePromoCodesStore.ts";

export const PromoCodesPage:FC = () => {
    const {promoCodes, fetchPromoCodes} = usePromoCodesStore();

    const columns = [
        { header: "Event Name", accessor: "event" },
        { header: "Promo code", accessor: "code" },
        { header: "Period from", accessor: "period_from" },
        {header: "Period till", accessor: "period_till"},
        { header: "Already used", accessor: "already_used" },
        { header: "Usage limit", accessor: "limit" },
    ];


    useEffect(() => {
        fetchPromoCodes();
    }, []);


    const formattedData = promoCodes.map((promo) => ({
        ...promo,
        event: promo.event?.title || "—",
    }));


    return (
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Admin Information</h1>
                <PromoCodeFilters/>
                <CustomTable
                    columns={columns}
                    data={formattedData}
                    actions={() => (
                        <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                                <PencilIcon className="w-4 cursor-pointer h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                                <TrashIcon className="w-4 cursor-pointer h-4" />
                            </button>
                        </div>
                    )}
                />
            </div>
        </AdminLayout>
    )
}