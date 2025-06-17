import { FC, useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { getDepartmentOrders } from "@/api/endpoints/statistics";
import { StatisticsDepartmentData } from "@/types/statistics";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const colors = [
    { borderColor: "rgba(75,192,192,1)", backgroundColor: "rgba(75,192,192,0.2)" },
    { borderColor: "rgba(255,99,132,1)", backgroundColor: "rgba(255,99,132,0.2)" },
    { borderColor: "rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.2)" },
    { borderColor: "rgba(255, 206, 86, 1)", backgroundColor: "rgba(255, 206, 86, 0.2)" },
];

function formatMonth(isoMonth: string) {
    const [year, month] = isoMonth.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

export const TransactionLineChart: FC = () => {
    const [data, setData] = useState<StatisticsDepartmentData[]>([]);
    const [startDate, setStartDate] = useState("2024-06");
    const [endDate, setEndDate] = useState("2025-06");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDepartmentOrders(); // загрузка всех данных
            setData(response);
        };
        fetchData();
    }, []);

    const chartData = useMemo(() => {
        if (!data.length) return null;

        const labels = data[0].time_buckets
            .map(b => b.bucket)
            .filter(bucket => bucket >= startDate && bucket <= endDate)
            .map(formatMonth);

        const datasets = data.map((dep, idx) => {
            const filtered = dep.time_buckets.filter(tb => tb.bucket >= startDate && tb.bucket <= endDate);
            return {
                label: dep.department_name,
                data: filtered.map(b => b.amount_sum),
                borderColor: colors[idx % colors.length].borderColor,
                backgroundColor: colors[idx % colors.length].backgroundColor,
                tension: 0.4,
            };
        });

        return { labels, datasets };
    }, [data, startDate, endDate]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full max-w-full px-4">
            <h2 className="text-xl font-semibold mb-4">График транзакций</h2>

            <div className="flex gap-4 mb-4">
                <label className="flex flex-col">
                    Дата начала
                    <input
                        type="month"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border bg-white p-2 rounded"
                    />
                </label>
                <label className="flex flex-col">
                    Дата окончания
                    <input
                        type="month"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 bg-white rounded"
                    />
                </label>
            </div>

            <div className="bg-white p-6 rounded-2xl w-full">
                {chartData ? <Line data={chartData} options={options} /> : <p>No data</p>}
            </div>
        </div>
    );
};
