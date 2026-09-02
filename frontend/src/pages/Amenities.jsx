import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Amenities() {
  const navigate = useNavigate()

  const [selectedAmenity, setSelectedAmenity] = useState(null)
  const [date, setDate] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [loading, setLoading] = useState(false)

  const amenities = [
    {
      id: 1,
      name: "Community Hall",
      description: "Perfect for events, meetings and celebrations.",
      status: "Available",
    },
    {
      id: 2,
      name: "Swimming Pool",
      description: "Book a slot and enjoy the swimming facilities.",
      status: "Available",
    },
    {
      id: 3,
      name: "Conference Room",
      description: "A professional space for meetings and discussions.",
      status: "Unavailable",
    },
    {
      id: 4,
      name: "Gym",
      description: "Modern fitness equipment for residents.",
      status: "Available",
    },
  ]

  function openBooking(amenity) {
    setSelectedAmenity(amenity)
    setDate("")
    setCheckIn("")
    setCheckOut("")
  }

  async function handleBooking(e) {
    e.preventDefault()

    if (!date || !checkIn || !checkOut) {
      alert("Please fill all booking details")
      return
    }

    if (checkOut <= checkIn) {
      alert("Check-out time must be after check-in time")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amenity: selectedAmenity.name,
            date,
            checkIn,
            checkOut,
            status: "Confirmed",
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Booking failed")
        return
      }

      alert(`${selectedAmenity.name} booked successfully!`)

      navigate("/bookings")
    } catch (error) {
      alert("Unable to connect to the server")
    } finally {
      setLoading(false)
    }
  }

  function closeBooking() {
    setSelectedAmenity(null)
    setDate("")
    setCheckIn("")
    setCheckOut("")
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="min-h-screen w-64 bg-slate-900 p-6 text-white">
          <h1 className="text-2xl font-bold">PropManage</h1>

          <p className="mt-1 text-sm text-slate-400">
            Property Management
          </p>

          <nav className="mt-10 space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/maintenance")}
              className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
            >
              Maintenance
            </button>

            <button className="w-full rounded-lg bg-slate-800 px-4 py-3 text-left">
              Amenities
            </button>

            <button
              onClick={() => navigate("/bookings")}
              className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
            >
              Bookings
            </button>
          </nav>

          <div className="mt-20 border-t border-slate-700 pt-6">
            <button
              onClick={() => navigate("/login")}
              className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Amenities
            </h2>

            <p className="mt-1 text-slate-500">
              Explore and book available property amenities.
            </p>
          </div>

          {selectedAmenity && (
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Book {selectedAmenity.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Select your preferred date and time.
                  </p>
                </div>

                <button
                  onClick={closeBooking}
                  className="text-lg font-medium text-slate-500 hover:text-slate-900"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleBooking} className="mt-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Booking Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Check-in Time
                    </label>

                    <input
                      type="time"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Check-out Time
                    </label>

                    <input
                      type="time"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Booking..." : "Confirm Booking"}
                  </button>

                  <button
                    type="button"
                    onClick={closeBooking}
                    disabled={loading}
                    className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    {amenity.name}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      amenity.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {amenity.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {amenity.description}
                </p>

                <button
                  disabled={amenity.status === "Unavailable"}
                  onClick={() => openBooking(amenity)}
                  className={`mt-6 w-full rounded-lg py-3 font-medium ${
                    amenity.status === "Available"
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "cursor-not-allowed bg-slate-200 text-slate-400"
                  }`}
                >
                  {amenity.status === "Available"
                    ? "Book Now"
                    : "Currently Unavailable"}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Amenities