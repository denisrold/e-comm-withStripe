import { initMongoose } from "@/lib/mongoose";

export default async function handle(req, res) {
  await initMongoose();
}
