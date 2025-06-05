import {FC, useEffect, useState} from "react";
import {AdminLayout} from "@/layouts/AdminLayout.tsx";
import {PencilIcon, TrashIcon} from "lucide-react";
import {CustomTable} from "@/ui/CustomTable.tsx";
import {EventFilters} from "@/components/event/EventsFilters.tsx";
import {useEventsStore} from "@/store/useEventsStore.ts";
import {EditEventsModal} from "@/components/event/EditEventsModal.tsx";

export const EventsPage:FC = () => {
    const {events, fetchEvents} = useEventsStore();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    const columns = [
        { header: "Event Name", accessor: "title" },
        { header: "Department", accessor: "department" },
        { header: "Admin`s Email", accessor: "manager_email" },
        { header: "Period From", accessor: "period_from" },
        { header: "Period Till", accessor: "period_till"},
        { header: "Price", accessor: "price" },
    ];

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEditClick = (admin: any) => {
        setSelectedEvent(admin);
        setIsEditModalOpen(true);
    };


    return (
        <AdminLayout>
            <div className="flex-1 p-8">
                <h1 className="text-[32px] font-bold mb-6">Events Information</h1>
                <EventFilters />
                <CustomTable
                    columns={columns}
                    data={events}
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

            {selectedEvent && (
                <EditEventsModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    eventData={selectedEvent} />
            )}
        </AdminLayout>
    )
}