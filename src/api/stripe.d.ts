export interface CheckoutSession {
    checkout_url: string;
    session_id: string;
}
export interface PaymentStatus {
    session_status: string;
    payment_status: string;
}
export declare const createCheckoutSession: (email: string, userId: string) => Promise<CheckoutSession>;
export declare const getPaymentStatus: (sessionId: string) => Promise<PaymentStatus>;
