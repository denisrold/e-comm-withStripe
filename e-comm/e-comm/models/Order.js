import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    products: Object,
    name: String,
    address: String,
    city: String,
    email: String,
    paid: { type: Number, defaultValue: 0 },
  },
  { timestamps: true }
);

const Order = models?.Order || model("Order", OrderSchema);

export default Order;
