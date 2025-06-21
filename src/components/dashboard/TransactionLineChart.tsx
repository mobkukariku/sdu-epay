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
import { Calendar } from "primereact/calendar";
import { getDepartmentOrders } from "@/api/endpoints/statistics";
import { StatisticsDepartmentData } from "@/types/statistics";
import { format } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const colors = [
    { borderColor: "rgba(75,192,192,1)", backgroundColor: "rgba(75,192,192,0.2)" },
    { borderColor: "rgba(255,99,132,1)", backgroundColor: "rgba(255,99,132,0.2)" },
    { borderColor: "rgba(54, 162, 235, 1)", backgroundColor: "rgba(54, 162, 235, 0.2)" },
    { borderColor: "rgba(255, 206, 86, 1)", backgroundColor: "rgba(255, 206, 86, 0.2)" },
];


export const TransactionLineChart: FC = () => {
    const [data, setData] = useState<StatisticsDepartmentData[]>([]);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
        new Date("2024-06-01"),
        new Date("2025-06-01"),
    ]);

    const fetchData = async () => {
        let [start, end] = dateRange;
        if (!start) return;

        // Если выбрана только одна дата — делаем end на 1 день позже
        if (!end) {
            start = new Date(start);
            end = new Date(start);
            end.setDate(end.getDate() + 1);
        }

        const formattedStart = format(start, "yyyy-MM-dd"); // Только дата
        const formattedEnd = format(end, "yyyy-MM-dd");     // Только дата

        const response = await getDepartmentOrders({
            start_date: formattedStart,
            end_date: formattedEnd,
        });

        setData(response);
    };




    useEffect(() => {
        fetchData();
    }, [dateRange]);

    function formatBucket(bucket: string, diffHours: number): string {
        const date = new Date(bucket);

        if (diffHours <= 48) {
            return date.toLocaleString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short",
            });
        } else if (diffHours <= 24 * 30) {
            return date.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        } else {
            return date.toLocaleDateString("ru-RU", {
                month: "short",
                year: "numeric",
            });
        }
    }


    const chartData = useMemo(() => {
        if (!data.length || !dateRange[0] || !dateRange[1]) return null;

        const [start, end] = dateRange;
        const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        const labels = data[0].time_buckets
            .filter(bucket => {
                const bucketTime = new Date(bucket.bucket).getTime();
                return bucketTime >= start.getTime() && bucketTime <= end.getTime();
            })
            .map(b => formatBucket(b.bucket, diffHours));

        const datasets = data.map((dep, idx) => {
            const filtered = dep.time_buckets.filter(tb => {
                const time = new Date(tb.bucket).getTime();
                return time >= start.getTime() && time <= end.getTime();
            });

            return {
                label: dep.department_name,
                data: filtered.map(b => b.amount_sum),
                borderColor: colors[idx % colors.length].borderColor,
                backgroundColor: colors[idx % colors.length].backgroundColor,
                tension: 0.4,
            };
        });

        return { labels, datasets };
    }, [data, dateRange]);






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

            <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                <label className="flex flex-col">
                    Выберите диапазон дат:
                    <Calendar
                        selectionMode="range"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.value as [Date, Date])}
                        view="date"
                        dateFormat="dd/mm/yy"
                        className="bg-white"
                        showIcon
                        showButtonBar
                    />
                </label>
            </div>

            <div className="bg-white p-6 rounded-2xl w-full">
                {chartData ? <Line data={chartData} options={options} /> : <p>No data</p>}
            </div>
        </div>
    );
};
