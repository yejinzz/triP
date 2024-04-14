const mongoose = require("mongoose");
const { Schema } = mongoose;

const planSchema = new Schema(
  {
    userId: mongoose.Types.ObjectId,
    startDate: String,
    endDate: String,
    planTitle: {
      type: String,
      default: "즐거운 여행!",
    },
    destination: {
      coords: {
        lat: Number,
        lng: Number,
      },
      regionCode: Number,
      regionName: String,
      regionImg: String,
    },
    schedules: Schema.Types.Mixed,
    created_At: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 1000 * 60 * 60 * 9),
    },
  },
  { timestamps: { createdAt: "created_At", updatedAt: false } }
);

module.exports = mongoose.model("Plan", planSchema);
