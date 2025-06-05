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

const mockData = [
    { title: "AI Conf", department: "CS", manager_email: "a@sdu.kz" },
    { title: "Web Bootcamp", department: "CS", manager_email: "b@sdu.kz" },
    { title: "Math Fest", department: "Math", manager_email: "c@sdu.kz" },
    { title: "AI Lab", department: "CS", manager_email: "d@sdu.kz" },
    { title: "Physics Demo", department: "Physics", manager_email: "e@sdu.kz" },
];

const departmentCounts: Record<string, number> = {};
mockData.forEach((event) => {
    departmentCounts[event.department] = (departmentCounts[event.department] || 0) + 1;
});

const data = {
    labels: Object.keys(departmentCounts),
    datasets: [
        {
            label: "Number of Events",
            data: Object.values(departmentCounts),
            backgroundColor: "#6366f1",
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
                label: (context: any) => `${context.parsed.y} events`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Events",
            },
        },
        x: {
            title: {
                display: true,
                text: "Departments",
            },
        },
    },
};

export const DepartmentDistributionChart:FC =() => {
    return (
        <div className="w-full max-w-full px-4">
            <h2 className="text-xl font-semibold mb-4">Distribution by Departments</h2>
            <div className="bg-white p-6 rounded-2xl w-full">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

