const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const items = req.body.basket.map(item => ({
        price_data:{
          currency: 'usd',
          unit_amount: item.price * 100,
          product_data: {
            name: item.name.slice(0,50)+'...',
            description: item.description.slice(0, 100)+'...',
            images:[`${req.headers.origin}${item.images[0].url}`],
          },
        },
        quantity: item.quantity,
      }));
      items.map(item => console.log(item.price_data.product_data.images[0]))

      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          address:req.body.address,
          images: JSON.stringify(items.map(item => item.price_data.product_data.images[0])),
      }
      });
      
      res.status(200).json({id:session.id});
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}