const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const items = req.body.map(item => ({
        price_data:{
          currency: 'usd',
          product_data: {
            name: item.name.slice(0,50),
            images:[item.images[0].url],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${req.headers.origin}/basket/?success=true`,
        cancel_url: `${req.headers.origin}/basket/?canceled=true`,
      });
      
      res.redirect(303, session.url);
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}