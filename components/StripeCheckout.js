import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCartContext } from '../context/cart_context';
import CheckoutForm from '../components/checkoutForm';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function StripeCheckout() {
  const [clientSecret, setClientSecret] = React.useState('');
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ total_amount, shipping_fee }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
    labels: 'floating',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
export default StripeCheckout;
