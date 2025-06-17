export interface MonthlyOrder {
    month: string;
    amount_sum: number;
}

export interface StatisticsDepartmentData {
    department_id: string;
    department_name: string;
    monthly_orders: MonthlyOrder[];
}