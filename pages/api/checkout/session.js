import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-03-02'
})

export default async(req, res) => {
    const {quantity, amount} = req.body
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:[{
            amount, 
            quantity,
            currency: 'usd',
            name: 'Membership Dues' 
        }],
        mode:'payment',
        success_url:`${req.headers.origin}/members`,
        cancel_url: `${req.headers.origin}/payments`,
    })
    res.status(200).json({sessionId: session.id})
}