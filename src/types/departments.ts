export interface Department {
    id?: string;
    name?: string;
    additional_fields?: Record<string, { type: string }>;
}


export interface DepartmentQuery {
    name?: string;
    page?: number;
    size?: number;
}