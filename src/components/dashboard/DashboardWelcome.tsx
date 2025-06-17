// components/dashboard/DashboardWelcome.tsx

import { FC } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export const DashboardWelcome: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-xl  text-center">
            <div className="flex items-center justify-center w-20 h-20 mb-6 bg-blue-100 text-blue-600 rounded-full">
                <ShieldCheckIcon className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Panel</h1>
            <p className="text-gray-600 max-w-xl">
                Use the cards above to explore insights and monitor department transactions, event statistics,
                and promo code activity. Select a section to get started.
            </p>
        </div>
    );
};
