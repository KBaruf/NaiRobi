const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default handler = async function (req, res) {
  try {
    const data = req.body;
    const { shipping_fee, total_amount } = data;

    const calculateOrderamount = () => {
      return shipping_fee + total_amount;
    };
    const totalAmount = calculateOrderamount();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      enable: true,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};
