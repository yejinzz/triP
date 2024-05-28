// const mongoose = require("mongoose");
import mongoose from "mongoose";

const { Schema } = mongoose;

//생성될 필드명을 정한다.
const placeSchema = new Schema({
  regionCode: String,
  placeType: String,
  placeInfo: {
    name: String,
    phoneNumber: String,
    usageTime: String,
    address: String,
    imgUrl: String,
    siteUrl: String,
    bestMenu: String,
    coords: { lat: Number, lng: Number },
  },
});

export default mongoose.model("Place", placeSchema);
