const mongoose = require('mongoose');

const addBannerImagesSchema = new mongoose.Schema({
    type:String,
    imageUrl:String,
    datecreated:Date,
    dateUpdated:Date,
    
})

const addbannerImages = new mongoose.model('bannerimages',addBannerImagesSchema);

module.exports = addbannerImages;