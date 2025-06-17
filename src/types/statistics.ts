export interface TimeBucket {
    bucket: string; // например, "2025-06"
    amount_sum: number;
}

export interface StatisticsDepartmentData {
    department_id: string;
    department_name: string;
    time_buckets: TimeBucket[];
}
