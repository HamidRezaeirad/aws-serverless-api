import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      qty: { type: Number },
    },
  ],
});

const Warehouse = mongoose.model("Warehouse", schema);

export default Warehouse;
