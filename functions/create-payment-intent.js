// domain/.netliyf/functions/create-payment-intent
require('detenv').config();

const stripe = require('stripe')(process.env.REACT_APP_AUTH_STRIPE_SECRET);

exports.handler = async function (event, context) {
  if (event.body) {
    const { shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderamount = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderamount(),
        currency: 'usd',
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: error.message,
        }),
      };
    }
  }
  return {
    statusCode: 200,
    body: 'Create Payment Intent',
  };
};
