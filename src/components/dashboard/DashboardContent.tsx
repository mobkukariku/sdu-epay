import { FC, useState } from "react";
import { MetricItemCard } from "@/components/dashboard/MetricItemCard.tsx";
import {
    BriefcaseIcon,
    CalendarIcon,
    ReceiptPercentIcon,
    UserIcon
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import {DepartmentDistributionChart} from "@/components/dashboard/DepartmentDistributionChart.tsx";
import {PromoDistributionChart} from "@/components/dashboard/PromoDistributionChart.tsx";
import {UsedPromoCodesChart} from "@/components/dashboard/UsedPromoCodesChart.tsx";

export const DashboardContent: FC = () => {
    const [active, setActive] = useState<"events" | "usedPromo" | "promos" | "transactions" | null>("events");

    const renderContent = () => {
        switch (active) {
            case "transactions":
                return <div className="text-lg">Transactions content (еще не готово)</div>;
            case "events":
                return <DepartmentDistributionChart />
            case "promos":
                return <PromoDistributionChart />
            case "usedPromo":
                return <UsedPromoCodesChart />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            <div className="flex w-full gap-10 mx-auto justify-around mt-5">
                <MetricItemCard
                    icon={<BriefcaseIcon width={50} />}
                    name={"Statistics by transactions"}
                    onClick={() => setActive("transactions")}
                />
                <MetricItemCard
                    icon={<CalendarIcon width={50} />}
                    name={"Total events"}
                    num={100}
                    onClick={() => setActive("events")}
                />
                <MetricItemCard
                    icon={<UserIcon width={50} />}
                    name={"Total promo codes"}
                    num={100}
                    onClick={() => setActive("promos")}
                />
                <MetricItemCard
                    icon={<ReceiptPercentIcon width={50} />}
                    name={"Already used promo codes"}
                    num={100}
                    onClick={() => setActive("usedPromo")}
                />
            </div>

            <div className="mt-10 min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
