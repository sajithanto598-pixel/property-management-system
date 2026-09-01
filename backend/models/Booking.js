const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    amenity: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    checkIn: {
      type: String,
      required: true,
    },

    checkOut: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
)

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking