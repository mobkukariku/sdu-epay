import {FC, useMemo} from "react";
import { Line} from "react-chartjs-2";
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
import {StatisticsDepartmentData} from "@/types/statistics.ts";

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
    return date.toLocaleString("en-US", { month: "short", year: "numeric" }); // e.g. "Jul 2024"
}

interface TransactionLineChartProps {
    data?: StatisticsDepartmentData[]
}


export const TransactionLineChart: FC<TransactionLineChartProps> = ({data}) => {

    const chartData = useMemo(() => {
        if (!data?.length) return null;

        const labels = data[0].monthly_orders.map(order => formatMonth(order.month));

        const datasets = data.map((dep, idx) => ({
            label: dep.department_name,
            data: dep.monthly_orders.map(order => order.amount_sum),
            borderColor: colors[idx % colors.length].borderColor,
            backgroundColor: colors[idx % colors.length].backgroundColor,
            tension: 0.4,
        }));

        return {
            labels,
            datasets,
        };
    }, [data]);

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
            <div className="bg-white p-6 rounded-2xl w-full">
                {chartData ? <Line data={chartData} options={options} /> : <p>No data</p>}
            </div>
        </div>
    )
}