const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const Booking = require("./models/Booking")
const Maintenance = require("./models/Maintenance")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully")
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message)
  })

app.get("/", (req, res) => {
  res.send("Property Management Backend is Running")
})

app.post("/api/bookings", async (req, res) => {
  try {
    const { amenity, date, checkIn, checkOut } = req.body

    if (!amenity || !date || !checkIn || !checkOut) {
      return res.status(400).json({
        message: "Please fill all booking fields",
      })
    }

    const booking = new Booking({
      amenity,
      date,
      checkIn,
      checkOut,
    })

    await booking.save()

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    })
  }
})

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    })

    res.json(bookings)
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch bookings",
      error: error.message,
    })
  }
})

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      })
    }

    booking.status = "Cancelled"

    await booking.save()

    res.json({
      message: "Booking cancelled successfully",
      booking,
    })
  } catch (error) {
    res.status(500).json({
      message: "Unable to cancel booking",
      error: error.message,
    })
  }
})

app.post("/api/maintenance", async (req, res) => {
  try {
    const { issue, apartment, description } = req.body

    if (!issue || !apartment || !description) {
      return res.status(400).json({
        message: "Please fill all maintenance fields",
      })
    }

    const maintenance = new Maintenance({
      issue,
      apartment,
      description,
    })

    await maintenance.save()

    res.status(201).json({
      message: "Maintenance request created successfully",
      maintenance,
    })
  } catch (error) {
    res.status(500).json({
      message: "Unable to create maintenance request",
      error: error.message,
    })
  }
})

app.get("/api/maintenance", async (req, res) => {
  try {
    const requests = await Maintenance.find().sort({
      createdAt: -1,
    })

    res.json(requests)
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch maintenance requests",
      error: error.message,
    })
  }
})

app.put("/api/maintenance/:id", async (req, res) => {
  try {
    const { status } = req.body

    const validStatus = [
      "Pending",
      "In Progress",
      "Completed",
    ]

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      })
    }

    const maintenance = await Maintenance.findById(req.params.id)

    if (!maintenance) {
      return res.status(404).json({
        message: "Maintenance request not found",
      })
    }

    maintenance.status = status

    await maintenance.save()

    res.json({
      message: "Status updated successfully",
      maintenance,
    })
  } catch (error) {
    res.status(500).json({
      message: "Unable to update maintenance status",
      error: error.message,
    })
  }
})

const PORT = process.env.PORT || 5001

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})