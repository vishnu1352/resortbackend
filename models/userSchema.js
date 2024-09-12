const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    imageUrl: String,
    price:String,
    letter:String,
    isTransparent:Boolean,
    type:String,
    datecreated:Date,
    dateUpdated:Date,
})

const items = new mongoose.model("items", itemsSchema);

module.exports = items;