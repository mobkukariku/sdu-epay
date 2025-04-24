import {FC} from "react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {FiltrationInputs} from "@/components/FiltrationInputs.tsx";
import {PencilIcon, TrashIcon} from "lucide-react";
import {CustomTable} from "@/ui/CustomTable.tsx";

export const EventsPage:FC = () => {

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Event Name", accessor: "event-name" },
        { header: "Department", accessor: "department" },
        { header: "Admin`s Email", accessor: "admin-email" },
        { header: "Period", accessor: "period" },
        { header: "Price", accessor: "price" },
    ];
    const data = [
        {
            id: 1,
            "event-name": "Tech Innovators 2025",
            department: "Engineering",
            "admin-email": "alice.johnson@sdu.edu.kz",
            period: "Jan - Mar 2025",
            price: "$300",
        },
        {
            id: 2,
            "event-name": "Marketing Strategy Bootcamp",
            department: "Marketing",
            "admin-email": "bob.smith@sdu.edu.kz",
            period: "Feb - Apr 2025",
            price: "$250",
        },
        {
            id: 3,
            "event-name": "UX/UI Design Trends",
            department: "Design",
            "admin-email": "carla.lee@sdu.edu.kz",
            period: "Mar - May 2025",
            price: "$200",
        },
        {
            id: 4,
            "event-name": "Data Science Summit",
            department: "Computer Science",
            "admin-email": "david.kim@sdu.edu.kz",
            period: "Apr - Jun 2025",
            price: "$400",
        },
        {
            id: 5,
            "event-name": "Business Intelligence Forum",
            department: "Business",
            "admin-email": "emily.park@sdu.edu.kz",
            period: "May - Jul 2025",
            price: "$350",
        },
        {
            id: 6,
            "event-name": "Cybersecurity Awareness",
            department: "IT",
            "admin-email": "frank.nguyen@sdu.edu.kz",
            period: "Jun - Aug 2025",
            price: "$150",
        },
    ];


    return (
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Events Information</h1>
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