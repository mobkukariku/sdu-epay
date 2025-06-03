export interface Department {
    id?: string;
    name?: string;
}


export interface DepartmentQuery {
    name?: string;
    page?: number;
    size?: number;
}