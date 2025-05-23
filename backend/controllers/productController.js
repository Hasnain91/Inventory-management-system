const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Craete Product Function
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description, expiryDate } =
    req.body;

  // Validation
  if (
    !name ||
    !category ||
    !quantity ||
    !price ||
    !description ||
    !expiryDate
  ) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  }

  // Handle Image Upload
  let fileData = {};

  if (req.file) {
    // Save Image to Cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "InventoryMS",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded.");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
    expiryDate,
  });
  res.status(201).json(product);
});

// Get All Products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// Get Single Product

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // if product does not exist
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found!");
  }

  // Match product to the user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized!");
  }
  res.status(200).json(product);
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product Deleted Successfully." });
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description, expiryDate } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      expiryDate,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  // Check if the product quantity is below 5
  if (updatedProduct.quantity < 5) {
    return res.status(200).json({ updatedProduct, lowQuantity: true });
  }

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
