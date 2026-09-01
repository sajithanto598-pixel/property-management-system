const mongoose = require("mongoose")

const maintenanceSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      required: true,
    },

    apartment: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
)

const Maintenance = mongoose.model("Maintenance", maintenanceSchema)

module.exports = Maintenance