import {FC} from "react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {FiltrationInputs} from "@/components/FiltrationInputs.tsx";
import {CustomTable} from "@/ui/CustomTable.tsx";
import {PencilIcon, TrashIcon} from "lucide-react";

export const PromoCodesPage:FC = () => {
    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Event Name", accessor: "event-name" },
        { header: "Promo code", accessor: "promo-code" },
        { header: "Period", accessor: "period" },
        { header: "Alredy used", accessor: "alredy-used" },
        { header: "Usage limit", accessor: "limit" },
        { header: "Discount percentage", accessor: "percentage" },
    ];

    const data = [
        {
            id: 1,
            "event-name": "Tech Fest 2025",
            "promo-code": "TECH25",
            period: "Jan - Mar 2025",
            "alredy-used": 12,
            limit: 50,
            percentage: "25%",
        },
        {
            id: 2,
            "event-name": "Design Week",
            "promo-code": "DESIGN10",
            period: "Feb - Apr 2025",
            "alredy-used": 8,
            limit: 20,
            percentage: "10%",
        },
        {
            id: 3,
            "event-name": "Marketing Mania",
            "promo-code": "MARKET30",
            period: "Mar - May 2025",
            "alredy-used": 18,
            limit: 30,
            percentage: "30%",
        },
        {
            id: 4,
            "event-name": "Startup Hackathon",
            "promo-code": "START15",
            period: "Apr - Jun 2025",
            "alredy-used": 22,
            limit: 40,
            percentage: "15%",
        },
        {
            id: 5,
            "event-name": "AI Conference",
            "promo-code": "AI50",
            period: "May - Jul 2025",
            "alredy-used": 5,
            limit: 10,
            percentage: "50%",
        },
        {
            id: 6,
            "event-name": "Cybersecurity Bootcamp",
            "promo-code": "SECURE20",
            period: "Jun - Aug 2025",
            "alredy-used": 10,
            limit: 25,
            percentage: "20%",
        },
    ];


    return (
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Admin Information</h1>
                <FiltrationInputs />
                <CustomTable
                    columns={columns}
                    data={data}
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