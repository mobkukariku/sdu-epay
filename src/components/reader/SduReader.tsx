import { FC, useRef, useState } from "react";
import * as XLSX from "xlsx";

const translatesInRu: Record<string, string> = {
    amount: "Сумма",
    "con-paper": "Название статьи",
    "con-title": "Название конференции",
    currency: "Валюта",
    destination: "Назначение",
    email: "Email",
    fullname: "ФИО",
    "ol-title": "Название олимпиады",
    phone: "Телефон",
    "tr-faculty": "Факультет",
    "tr-grade": "Курс",
    "tr-iin": "ИИН",
};

const indexesToRemove = [3, 11, 12];
const newFormatKeys = Object.keys(translatesInRu);

const generateText = (json: Record<string, any>) => {
    const keys = Object.keys(json);
    const isNewFormat = keys.every((key) => newFormatKeys.includes(key));
    let text = isNewFormat
        ? "Данные платежа: <br/>"
        : "Данные платежа (old): <br/>";

    keys.forEach((key) => {
        if (json[key]) {
            const title = translatesInRu[key] || key;
            text += `${title}: ${json[key]}<br/>`;
        }
    });

    return text;
};

export const SduReader: FC = () => {
    const [tableHTML, setTableHTML] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });

            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const excelJson = XLSX.utils.sheet_to_json<any[]>(firstSheet, {
                header: 1,
            });

            renderTable(excelJson);
        };
        reader.readAsArrayBuffer(file);
        fileInputRef.current!.value = "";
    };

    const renderTable = (data: any[][]) => {
        const startIndex = data.findIndex((row) => row.includes("#стр."));
        const dataSlice = data.slice(startIndex);

        const headers = dataSlice.slice(0, 2).map((row) =>
            row.filter((_, index) => !indexesToRemove.includes(index))
        );
        const body = dataSlice.slice(2);

        const headLength = headers[0].length;
        let html = "<table class='table-auto w-full border mt-4 text-sm'>";

        // Thead
        html += "<thead><tr>";
        for (let i = 0; i < headLength; i++) {
            const head = headers[0][i];
            const tooltip = headers[1][i];
            html += `<th class='border px-4 py-2' title="${tooltip}">${head}</th>`;
        }
        html += "</tr></thead>";

        // Tbody
        html += "<tbody>";
        for (let i = 0; i < body.length; i++) {
            const filteredRow = body[i].filter(
                (_, index) => !indexesToRemove.includes(index)
            );
            if (filteredRow.length !== headLength) continue;

            html += "<tr>";
            for (let j = 0; j < filteredRow.length; j++) {
                const cell = filteredRow[j];
                let cellContent = cell;

                try {
                    const parsed = JSON.parse(cell);
                    if (typeof parsed === "object") {
                        cellContent = generateText(parsed);
                    }
                } catch (e) {}

                html += `<td class='border px-4 py-2 align-top'>${
                    typeof cellContent === "string" ? cellContent : String(cellContent)
                }</td>`;
            }
            html += "</tr>";
        }
        html += "</tbody></table>";

        setTableHTML(html);
    };

    return (
        <div className=" mx-auto mt-10 p-6 bg-white rounded-xl ">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#006799] ">
                📄 Upload Excel file - SDU University
            </h2>

            <label className="block text-center">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFile}
                    className="mx-auto block w-full  text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer"
                />
            </label>

            {/* Table HTML injected here */}
            <div
                className="mt-6 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: tableHTML }}
            />
        </div>
    );
};
