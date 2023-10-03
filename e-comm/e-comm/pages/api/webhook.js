import { initMongoose } from "@/lib/mongoose";
import { buffer } from "micro";
//localhost:3000/api/webhook
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  const singningSecret =
    "whsec_7cc3a551490c578cace1798858ac79fa91bfec4c3e82bf55427a20011edd821f";

  const payload = await buffer(req);
  const signature = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    singningSecret
  );

  res.json("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
