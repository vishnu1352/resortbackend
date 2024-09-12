const mongoose = require("mongoose");

const addBannerImagesSchema = new mongoose.Schema({
  type: String,
  imageUrl: String,
  datecreated: Date,
  dateUpdated: Date,
});

const bannerimages =  mongoose.model("bannerimages", addBannerImagesSchema);

module.exports = bannerimages;
