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
    { eventName: "AI Conf", code: "AICONF100", period_from: "2025-06-01", period_till: "2025-06-10", already_used: 10, limit: 100 },
    { eventName: "AI Conf", code: "AIBONUS", period_from: "2025-06-05", period_till: "2025-06-20", already_used: 20, limit: 50 },
    { eventName: "Math Fest", code: "MATH10", period_from: "2025-07-01", period_till: "2025-07-15", already_used: 5, limit: 30 },
    { eventName: "Web Bootcamp", code: "WEB20", period_from: "2025-07-05", period_till: "2025-07-25", already_used: 8, limit: 40 },
    { eventName: "Math Fest", code: "ALGEBRA", period_from: "2025-07-08", period_till: "2025-07-18", already_used: 3, limit: 20 },
];

// Считаем сколько промокодов на каждый ивент
const promoCountByEvent: Record<string, number> = {};
promoData.forEach((promo) => {
    promoCountByEvent[promo.eventName] = (promoCountByEvent[promo.eventName] || 0) + 1;
});

const data = {
    labels: Object.keys(promoCountByEvent),
    datasets: [
        {
            label: "Promo codes count",
            data: Object.values(promoCountByEvent),
            backgroundColor: "#10b981", // emerald-500
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
                label: (context: any) => `${context.parsed.y} promo codes`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Promo Codes",
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

export const PromoDistributionChart:FC =() => {
    return (
        <div className="w-full max-w-full px-4">
            <h2 className="text-xl font-semibold mb-4">Распространение промо-кода по событиям</h2>
            <div className="bg-white p-6 rounded-2xl w-full ">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
