import {FC} from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Sdu University",
            data: [1200, 1500, 1100, 1800, 1700, 1600],
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.4,
        },
        {
            label: "Sdu Dorm",
            data: [900, 950, 1000, 1050, 970, 1010],
            borderColor: "rgba(255,99,132,1)",
            backgroundColor: "rgba(255,99,132,0.2)",
            tension: 0.4,
        },
    ],
};

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
export const TransactionLineChart: FC = () => {


    return (
        <div className="w-full max-w-full px-4">
            <h2 className="text-xl font-semibold mb-4">Transactions chart</h2>
            <div className="bg-white p-6 rounded-2xl w-full">
                <Line data={data} options={options} />
            </div>
        </div>
    )
}