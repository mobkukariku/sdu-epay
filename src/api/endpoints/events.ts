import {api} from "@/api/api.ts";
import {EventQuery, IEvent} from "@/types/events.ts";

export const getEvents = async (query?: EventQuery) => {
    const queryString = query
    ? '?' + new URLSearchParams(
        Object.entries(query).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value);
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString()
        : '';

    const {data} = await api.get(`/events${queryString}`);
    return data;
}

export const addEvent = async (event: IEvent): Promise<IEvent> => {
    const {data} = await api.post('/events', event);
    return data;
}


export const getEventById = async (id: string): Promise<IEvent[]> => {
    const { data } = await api.get(`/events/public?department_id=${id}`);
    return data;
}