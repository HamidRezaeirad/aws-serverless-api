import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Product = mongoose.model("Product", schema);

export default Product;
