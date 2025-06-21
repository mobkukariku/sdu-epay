import { FC, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import {fetchAlreadyUsedPromocodesDistrubution} from "@/api/endpoints/statistics.ts"; // подключи свой axios instance

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context: any) => `${context.parsed.y} было использовано`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Кол-во использованных",
            },
        },
        x: {
            title: {
                display: true,
                text: "События",
            },
        },
    },
};

interface UsedPromoStat {
    event_id: string;
    event_title: string;
    total: number;
}

export const UsedPromoCodesChart: FC = () => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const fetchUsedPromoStats = async () => {
            try {
                const data:UsedPromoStat[] = await fetchAlreadyUsedPromocodesDistrubution();

                const labels = data.map((item) => item.event_title);
                const values = data.map((item) => item.total);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Used Promo Codes",
                            data: values,
                            backgroundColor: "#f59e0b", // amber-500
                        },
                    ],
                });
            } catch (error) {
                console.error("Ошибка при загрузке статистики использованных промокодов", error);
            }
        };

        fetchUsedPromoStats();
    }, []);

    return (
        <div className="w-full max-w-full px-4">
            <h2 className="text-xl font-semibold mb-4">Использованные промо-коды по событиям</h2>
            <div className="bg-white p-6 rounded-2xl w-full">
                {chartData ? (
                    <Bar data={chartData} options={options} />
                ) : (
                    <div>Загрузка...</div>
                )}
            </div>
        </div>
    );
};
