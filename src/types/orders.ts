export interface IOrder {
    event_id: string;
    promo_code: string | null; // сделаем опциональным
    fullname: string;
    email: string;
    cellphone: string;
    additional: string;
}



export interface PaymentResponseKaspi {
    id: string;
    amount_tiyn: number;
    code: number;
    redirect_url: string;
    message: string;
    qr_code_image: string;
    device: "PC" | "MOBILE" | string; // если возможны другие типы — оставляем string
    order: {
        id: number;
        fullname: string;
        email: string;
        cellphone: string;
        additional: string;
        type: "KASPI" | "CARD" | string; // добавьте другие варианты, если есть
        status: "PENDING" | "PAID" | "FAILED" | string; // добавьте другие варианты, если есть
        amount: number;
        final_amount: number;
        event: {
            title: string;
            manager_email: string;
            price: number;
            period_from: string; // можно заменить на Date, если преобразуете при получении
            period_till: string;
            id: string;
        };
    };
}
