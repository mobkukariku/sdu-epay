import {IEvent} from "@/types/events.ts";

export interface IPromocode {
    code: string;
    limit: 0;
    discount: 0;
    period_from: string;
    period_till: string;
    id: string;
    already_used: number;
    event: IEvent;
}

export interface CreatePromocodePayload {
    code: string;
    limit: number;
    discount: number;
    period_from: string;
    period_till: string;
    event_id: string;
}

export interface PromocodeQuery {
    code?: string;
    event_id?: string;
    page?: number;
    size?: number;
}

export interface VerifyPromocodePayload {
    code: string;
    event_id: string;
}

export interface VerifyPromocodeResponse {
    code: string;
    id: string;
    discount: number;
}