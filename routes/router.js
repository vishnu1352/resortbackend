const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers")



router.post('/addItem', controllers.itemsupload);
router.get('/getAllItems',controllers.getAllItems);
router.get('/getItemsByType/:itemType',controllers.getItemsByType);
router.get('/getItemTypes',controllers.getTypes)
router.get('/getSingleItem/:id',controllers.getSingleItem);
router.post('/editItem/:id',controllers.editItem);
router.post('/deleteItem/:id',controllers.deleteItem);
router.post('/placeOrder',controllers.placeOrder);
router.get('/getAllOrders',controllers.getAllOrders);
router.post('/updateOrderStatus',controllers.updateOrderStatus);

router.post('/addBannerImages',controllers.addBannerImages);
router.get('/getBannerImages',controllers.getBannerImages);

module.exports = router;