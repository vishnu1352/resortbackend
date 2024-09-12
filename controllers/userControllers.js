const items = require("../models/userSchema");
const getItemTypes = require("../models/getTypesSchema");
const orders = require("../models/ordersSchema");
const addbannerImages = require("../models/addBannerImagesSchema");

exports.itemsupload = async (req, res) => {
  try {
    const { imageUrl, price, letter, isTransparent, type } = req.body; // Ensure itemname is received from req.body
    if (!imageUrl || !price || !letter || !type) {
      return res
        .status(200)
        .json({ statusCode: 500, message: "Enter all the fields" });
    }
    const datecreated = new Date();
    const itemData = new items({
      imageUrl,
      price,
      letter,
      isTransparent,
      type,
      datecreated,
    });
    await itemData.save(); // Log the received body for debugging
    res.json({
      statusCode: 200,
      message: "Item successfully uploaded",
      item: itemData,
    });
  } catch (e) {
    console.error("Error uploading item:", e); // Log the error for debugging
    res.status(500).json({
      statusCode: 500,
      message: "An error occurred while uploading the item",
    });
  }
};

exports.getTypes = async (req, res) => {
  try {
    const types = await getItemTypes.find({});
    res.status(200).json({ statusCode: 200, types }); // Send types as JSON response
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" }); // Send a 500 status and error message
  }
};

exports.getAllItems = async (req, res) => {
  try {
    console.log(req.params.itemType);
    const allItems = await items.find({});
    res.status(200).json({ statusCode: 200, allItems });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getItemsByType = async (req, res) => {
  try {
    const { itemType } = req.params;
    const allItems = await items.find({ type: itemType });
    res.status(200).json({ statusCode: 200, allItems });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSingleItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await items.findOne({ _id: id });
    res.status(200).json({ statusCode: 200, item });
  } catch (e) {
    res.status(500).json(e);
  }
};

//edit item
exports.editItem = async (req, res) => {
  try {
    let { id } = req.params;
    let { imageUrl, isTransparent, letter, price, type } = req.body;
    const updateUser = await items.findByIdAndUpdate(
      { _id: id },
      {
        imageUrl,
        isTransparent,
        letter,
        price,
        type,
      },
      { new: true }
    );
    await updateUser.save();
    res.status(200).json({ statusCode: 200, updateUser });
  } catch (e) {
    res.status(500).json({ statusCode: 500 });
  }
};

//delete item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await items.findByIdAndDelete({ _id: id });
    res.status(200).json({
      statusCode: 200,
      message: "Item Deleted Successfully",
      deleteItem,
    });
  } catch (e) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Cant able to delete item" });
  }
};

//placeOrder
exports.placeOrder = async (req, res) => {
  try {
    const {
      address,
      district,
      image,
      itemPrice,
      letter,
      name,
      nameOnItem,
      phone,
      remarks,
      selectedColor,
      sno,
    } = req.body;
    let status = "pending";
    const orderDetails = new orders({
      sno: sno,
      imageUrl: image,
      price: itemPrice,
      customizedName: nameOnItem,
      customRemarks: remarks,
      selectedColor: selectedColor,
      addrName: name,
      addrPhone: phone,
      address: address,
      addrDistrict: district,
      status,
    });
    await orderDetails.save();
    res.status(200).json({
      statusCode: 200,
      message: "Thank You for Choosing Us :) ",
      orderDetails: orderDetails,
    });
  } catch (e) {
    res.status(500).json({
      statusCode: 500,
      message: "Oh No!...Your order was not placed, Kindly please try again",
    });
  }
};

//getAllorders

exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await orders.find({});
    let totalAmountEarned = 0;
    allOrders.forEach((order) => {
      totalAmountEarned += Number(order.price);
    });
    res.status(200).json({
      statusCode: 200,
      totalAmount: totalAmountEarned,
      orders: allOrders,
    });
  } catch (e) {
    res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
  }
};

//update orderStatus
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const updatedOrder = await orders.findByIdAndUpdate(
      id, // Find by ID
      { status: status }, // Update operation
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators run on the update
      }
    );
    res.status(200).json({
      statusCode: 200,
      message: "Order updated successfully",
      updatedOrder: updatedOrder,
    });
  } catch (e) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Can't update order :( " });
  }
};

// ______________________________________________________-

exports.addBannerImages = async (req, res) => {
  try {
    const { imageUrl, type } = req.body;
    if (!imageUrl) {
      return res
        .status(200)
        .json({ statusCode: 500, message: "Enter Image Url" });
    }
    const datecreated = new Date();
    const bannerImage = new addbannerImages({
      imageUrl,
      type,
      datecreated,
    });
    await bannerImage.save(); // Log the received body for debugging
    res.json({
      statusCode: 200,
      message: "Image successfully uploaded at " + type,
      item: bannerImage,
      req: req.body,
    });
  } catch (e) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Can't upload Image :( " });
  }
};

exports.getBannerImages = async (req, res) => {
  try {
    try {
      const allImages = await addBannerImages.find({});

      res.status(200).json({
        statusCode: 200,
        bannerImages: allImages,
      });
    } catch (e) {
      res
        .status(500)
        .json({ statusCode: 500, message: "Cant able to fetch Images" });
    }
  } catch (e) {}
};
