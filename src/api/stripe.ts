import { getApiUrl } from '@/lib/utils';

const API_BASE_URL = getApiUrl();

// Types
export interface CheckoutSession {
  checkout_url: string;
  session_id: string;
}

export interface PaymentStatus {
  session_status: string;
  payment_status: string;
}

export const createCheckoutSession = async (
  email: string,
  userId: string
): Promise<CheckoutSession> => {
  const response = await fetch(
    `${API_BASE_URL}/stripe/create-checkout-session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        userId: userId,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || 'Failed to create Stripe checkout session'
    );
  }

  const result = await response.json();

  // Returns checkout_url and session_id
  return result;
};

export const getPaymentStatus = async (
  sessionId: string
): Promise<PaymentStatus> => {
  const response = await fetch(
    `${API_BASE_URL}/stripe/get-payment-status/${sessionId}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || `Failed to get payment status for ${sessionId}`
    );
  }

  const result = await response.json();

  // Returns session_status & payment_status
  return result;
};
