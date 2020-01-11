const mongoose = require("mongoose");
const geocoder = require("../util/geocoder");
const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "Please add a storeId"],
    unique: true,
    trim: true,
    maxlength: [10, "It must be less than 10 characters"]
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAdress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
//Geocode & create location
//Err:Mucio te je 'this' koji se drugacije tretirao jer je arrow function.
StoreSchema.pre("save", async function(next) {
  console.log(this);
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: ["Point"],
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAddress
  };
  //Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("/store", StoreSchema);
