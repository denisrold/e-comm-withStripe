import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/Order";
import { buffer } from "micro";
//localhost:3000/api/webhook
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  const singningSecret =
    "whsec_7cc3a551490c578cace1798858ac79fa91bfec4c3e82bf55427a20011edd821f";
  // "webhookSecret_7cc3a551490c578cace1798858ac79fa91bfec4c3e82bf55427a20011edd821f";

  const payload = await buffer(req);
  const signature = req.headers["stripe-signature"];

  const event = await stripe.webhooks.constructEvent(
    payload,
    signature,
    singningSecret
  );
  // EN METADA ESTARAN LOS DATOS TMB POR EJEMPLO EMAIL, POR SI QUIERO HACER ALGO CON EL EMAIL
  if (event?.type == "checkout.session.completed") {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata.orderId && paymentStatus == "paid") {
      const order = await Order.findByIdAndUpdate(metadata.orderId, {
        paid: 1,
      });
    }
  }
  res.json("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
