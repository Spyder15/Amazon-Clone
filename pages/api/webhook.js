import Stripe from "stripe";
import { buffer } from "micro";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";


const stripe = new Stripe(process.env.stripe_secret);

export const config = {
  api: {
    bodyParser: false,
  },
};
const createOrder = async (data) => {
  const docRef = await addDoc(collection(db, `orders`), {
    uid: data.metadata.userId,
    paymentId: data.id,
    amount: data.amount_total / 100,
    images: data.metadata.images,
    createdAt: serverTimestamp(),
  });
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;
    try {
      const rawBody = await buffer(req);
      const signature = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.stripe_webhook_secret
      );

      console.log("✅ Success: ", event.id);
    } catch (err) {
      console.log("❌ Error message: " + err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const data = event.data.object;
      createOrder(data);
      console.log("💰 Payment Received!: " + data);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
