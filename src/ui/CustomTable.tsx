import { FC, ReactNode, useState } from "react";

interface Column {
    header: string;
    accessor: string;
}

interface CustomTableProps {
    columns: Column[];
    data: Record<string, any>[];
    actions?: (row: Record<string, any>) => ReactNode;
}

export const CustomTable: FC<CustomTableProps> = ({ columns, data, actions }) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const isAllSelected = selectedRows.length === data.length;

    const toggleRow = (index: number) => {
        setSelectedRows(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const toggleAll = () => {
        if (isAllSelected) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map((_, i) => i));
        }
    };

    return (
        <div className="overflow-x-auto rounded-[4px] shadow-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-[16px] text-left">
                <thead className="bg-blue-50 text-gray-700 uppercase text-[16px] font-semibold">
                <tr>
                    <th className="px-4 py-3">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleAll}
                            className="accent-blue-600"
                        />
                    </th>
                    {columns.map(col => (
                        <th key={col.accessor} className="px-6 py-3">
                            {col.header}
                        </th>
                    ))}
                    {actions && <th className="px-6 py-3">Actions</th>}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[16px]">
                {data.map((row, idx) => (
                    <tr
                        key={idx}
                        className={`transition-all hover:bg-blue-50 ${selectedRows.includes(idx) ? "bg-blue-100" : ""}`}
                    >
                        <td className="px-4 py-4">
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(idx)}
                                onChange={() => toggleRow(idx)}
                                className="accent-blue-600"
                            />
                        </td>
                        {columns.map(col => (
                            <td key={col.accessor} className="px-6 py-4 text-gray-800">
                                {row[col.accessor]}
                            </td>
                        ))}
                        {actions && (
                            <td className="px-6 py-4">
                                {actions(row)}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
