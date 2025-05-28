export interface IEvent {
    title: string;
    id?: string
    manager_email: string;
    price: number;
    period_from: string,
    period_till: string,
    department_id: string;
}

export type EventQuery = {
    title?: string | null;
    page?: number;
    size?: number;
    department_id?: string | null;
};


export interface CreateEventPayload extends IEvent {}