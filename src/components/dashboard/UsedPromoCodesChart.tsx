import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import {FC} from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Моки промокодов
const promoData = [
    { eventName: "AI Conf", code: "AICONF100", already_used: 10, limit: 100 },
    { eventName: "AI Conf", code: "AIBONUS", already_used: 20, limit: 50 },
    { eventName: "Math Fest", code: "MATH10", already_used: 5, limit: 30 },
    { eventName: "Web Bootcamp", code: "WEB20", already_used: 8, limit: 40 },
    { eventName: "Math Fest", code: "ALGEBRA", already_used: 3, limit: 20 },
];

// Счётчик использований по ивентам
const usedByEvent: Record<string, number> = {};
promoData.forEach((p) => {
    usedByEvent[p.eventName] = (usedByEvent[p.eventName] || 0) + p.already_used;
});

const data = {
    labels: Object.keys(usedByEvent),
    datasets: [
        {
            label: "Used Promo Codes",
            data: Object.values(usedByEvent),
            backgroundColor: "#f59e0b", // amber-500
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context: any) => `${context.parsed.y} times used`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Times Used",
            },
        },
        x: {
            title: {
                display: true,
                text: "Events",
            },
        },
    },
};

export const UsedPromoCodesChart:FC = () => {
    return (
        <div className="w-full max-w-full px-4">
            <h2 className="text-xl font-semibold mb-4">Used Promo Codes by Event</h2>
            <div className="bg-white p-6 rounded-2xl w-full ">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
