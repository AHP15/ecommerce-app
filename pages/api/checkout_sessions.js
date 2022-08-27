const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cors = require('cors')


const cors = Cors({
  methods: [ 'POST'],
  origin: 'https://checkout.stripe.com'
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const items = req.body.basket.map(item => ({
        price_data:{
          currency: 'usd',
          unit_amount: item.price * 100,
          product_data: {
            name: item.name.slice(0,50),
            description: item.description.slice(0, 100),
            images:[`${req.headers.origin}${item.images[0].url}`],
          },
        },
        quantity: item.quantity,
      }));
      items.forEach(element => {
        console.log(element.price_data.product_data.images)
      });

      const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        metadata: {
          address:req.body.address,
          images: JSON.stringify(items.map(item => item.image)),
      }
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