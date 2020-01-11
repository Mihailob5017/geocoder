const Router = require("express").Router();
const {getStores,addStore}=require('../controllers/stores')
 
Router.route("/").get(getStores);
Router.route("/").post(addStore);
module.exports = Router;
