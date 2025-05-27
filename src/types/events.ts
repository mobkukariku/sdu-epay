export interface IEvent {
    title: string;
    manager_email: string;
    price: number;
    period_from: Date,
    period_till: Date,
    department_id: string;
}

export type EventQuery = {
    title?: string | null;
    page?: number;
    size?: number;
    department_id?: string | null;
};


export interface CreateEventPayload extends IEvent {}