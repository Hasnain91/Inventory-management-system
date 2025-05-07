const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a Product Name."],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      defualt: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a Product Category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a Product Quantity"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please add a Product Price."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a Product Description."],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
    expiryDate: {
      type: Date,
      required: [true, "Please add an expiry date"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
