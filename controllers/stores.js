const Store = require("../models/Store");

// @description Get all Stores
// @route GET /api/v1/stores
// @access Public
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error" + error);
  }
};

// @description Add a Store
// @route POST /api/v1/stores
// @access Public
exports.addStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    return res.status(200).json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error" + error);
  }
};
