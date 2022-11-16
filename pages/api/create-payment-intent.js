const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  try {
    // if (req.method === 'GET') {
    //   res.status(200).json({ client_secret: process.env.STRIPE_SECRET_KEY });
    //   return;
    // }
    const { shipping_fee, total_amount } = req.body;

    const calculateOrderamount = () => {
      return shipping_fee + total_amount;
    };
    const totalAmount = calculateOrderamount();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
}
