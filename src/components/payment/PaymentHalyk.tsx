import { FC } from "react";
import EpayPaymentWidget from "epay-payment-widget";

interface PaymentHalykProps {
    showWidget: boolean;
    amount: number;
    terminalId: string;
    orderId: string;
    successUrl: string;
    failUrl: string;
    email: string;
    oauthData: {
        access_token: string;
        token_type: string;
        expires_in?: number;
        scope?: string;
    };
    description?: string;
    onClose?: () => void;
}

export const PaymentHalyk: FC<PaymentHalykProps> = ({
                                                        showWidget,
                                                        amount,
                                                        terminalId,
                                                        orderId,
                                                        successUrl,
                                                        failUrl,
                                                        email,
                                                        oauthData,
                                                        description = "Оплата заказа",
                                                        onClose,
                                                    }) => {
    return (
        <EpayPaymentWidget
            visible={showWidget}
            terminalId={terminalId}
            amount={amount}
            invoiceId={orderId}
            oauthData={oauthData}
            paymentData={{
                backLink: successUrl,
                failureBackLink: failUrl,
                postLink: `${successUrl}/post`,
                failurePostLink: `${failUrl}/post`,
                description: description,
                accountId: email,
                language: "RUS",
            }}
            onWidgetClose={onClose}
        />
    );
};
