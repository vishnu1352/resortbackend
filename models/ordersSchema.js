const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  sno: String,
  imageUrl: String,
  price: Number,
  customizedName: String,
  customRemarks: String,
  selectedColor: String,
  addrName: String,
  addrPhone: String,
  address: String,
  addrDistrict: String,
  status:String,
});

const orders = mongoose.model("orders", ordersSchema);
module.exports = orders;
