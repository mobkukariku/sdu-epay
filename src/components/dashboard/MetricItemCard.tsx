import { FC, ReactNode } from "react";

interface MetricItemCardProps {
    name: string;
    num?: number;
    icon: ReactNode;
    onClick?: () => void;
}

export const MetricItemCard: FC<MetricItemCardProps> = ({ name, num, icon, onClick }) => {
    return (
        <div onClick={onClick} className="bg-white w-full cursor-pointer rounded-2xl p-5 border border-gray-200 transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500 ">{name}</div>
                <div className="text-blue-600 bg-blue-100 p-2 rounded-full">
                    {icon}
                </div>
            </div>
            {num && (
                <div>
                    <p className="text-3xl font-bold text-gray-900">{num}</p>
                </div>
            )}
        </div>
    );
};
