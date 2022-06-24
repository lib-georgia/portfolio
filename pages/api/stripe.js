import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_API_KEY)

export default async function handler(req, res){
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "JPY",
      description: "Tbilisi Burger",
      payment_method: id,
      confirm: true
    });


    return res.status(200).json({
      confirm: "completed"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
};
