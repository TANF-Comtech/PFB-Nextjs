const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const stripePaymentRedirect = (req, res) => {    
    const orgId = req.query.orgId;          
    stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
            price_data: {
                currency: 'usd',
                product_data: {
                name: 'Your Product Name',
                },
                unit_amount: 1000, // Amount in cents
            },
            quantity: 1,
            },
        ],
        metadata: {
          order_id: '6735',
        },
        mode: 'payment',
        success_url: 'https://webhook.site/00fc989c-8893-48fc-ab8d-46783e9afe83',
        cancel_url: 'https://e4de-2601-645-8981-1ae0-80c7-8555-3810-2b7d.ngrok-free.app/api/salesforce-update',
    }).then((session) => {
        console.log(JSON.stringify(session, null, 2));
    // Generate the payment link
    // Generate the payment link
    // const STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/test_8wM9Dm85z9NFfVm3cc';
    // const STRIPE_PAYMENT_LINK_URL = 'https://localhost:3000/api/stripe-payment-redirect';
    // const STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/9AQ2b6gK9aZB3JedR0';

    const paymentLink = `https://buy.stripe.com/test_8wM9Dm85z9NFfVm3cc?client_reference_id=${orgId}#${session.id}`;    
    // const paymentLink = `https://buy.stripe.com/test_9AQ2b6gK9aZB3Je0000000000#${session.id}`;
        
    res.status(302).redirect(paymentLink);
    });
    
    
};

export default stripePaymentRedirect;
