import Order from "@/models/Order";
import Product from "../../models/Product";
import { initMongoose } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handle(req, res) {
  await initMongoose();

  if (req.method !== "POST") {
    res.json("Should be a post, but its NO!");
  }

  const { email, name, address, city, delivery } = req.body;

  //search products of body  in mdb
  const productsIds = req.body.products.split(",");
  const uniqIds = [...new Set(productsIds)];
  const products = await Product.find({ _id: { $in: uniqIds } }).exec();

  //  line_items to buy configuration
  let line_items = [];
  for (let productId of uniqIds) {
    const quantity = productsIds.filter((id) => id === productId).length;
    const product = products.find((p) => p._id.toString() === productId);

    line_items.push({
      quantity,
      price_data: {
        currency: "USD",
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
    });
  }
  //DeliveryData Line-items
  line_items.push({
    quantity: 1,
    price_data: {
      currency: "USD",
      product_data: { name: "deliveryPrice" },
      unit_amount: Number(delivery) * 100,
    },
  });

  // unit_amount: product.price * 100, es porque lo toma en cetavos de dolar. si fuesen euros serian centavos de euros.

  const order = await Order.create({
    product: line_items,
    name,
    email,
    city,
    address,
    paid: 0,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
    metadata: { orderId: order._id.toString() },
  });

  res.redirect(303, session.url);
}
