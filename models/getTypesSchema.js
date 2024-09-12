const mongoose = require('mongoose');

const getTypesSchema = new mongoose.Schema({
    type:String,
    imageUrl:String,
    description:String,
})

const getItemTypes = new mongoose.model('ItemTypes',getTypesSchema);

module.exports = getItemTypes;