import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Bookings() {
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState("")

  useEffect(() => {
    getBookings()
  }, [])

  async function getBookings() {
    try {
      setLoading(true)

      const response = await fetch("http://localhost:5001/api/bookings")

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Unable to fetch bookings")
        return
      }

      setBookings(data)
    } catch (error) {
      alert("Unable to connect to the server")
    } finally {
      setLoading(false)
    }
  }

  async function cancelBooking(id) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    )

    if (!confirmCancel) {
      return
    }

    try {
      setDeletingId(id)

      const response = await fetch(
        `http://localhost:5001/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Unable to cancel booking")
        return
      }

      setBookings((oldBookings) =>
        oldBookings.filter((booking) => booking._id !== id)
      )

      alert("Booking cancelled successfully")
    } catch (error) {
      alert("Unable to connect to the server")
    } finally {
      setDeletingId("")
    }
  }

  function logout() {
    navigate("/login")
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

            <button
              onClick={() => navigate("/amenities")}
              className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
            >
              Amenities
            </button>

            <button className="w-full rounded-lg bg-slate-800 px-4 py-3 text-left">
              Bookings
            </button>
          </nav>

          <div className="mt-20 border-t border-slate-700 pt-6">
            <button
              onClick={logout}
              className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                My Bookings
              </h2>

              <p className="mt-1 text-slate-500">
                View and manage your amenity bookings.
              </p>
            </div>

            <button
              onClick={() => navigate("/amenities")}
              className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
            >
              + New Booking
            </button>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
            {loading ? (
              <div className="p-8 text-center text-slate-500">
                Loading bookings...
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="text-lg font-semibold text-slate-800">
                  No bookings found
                </h3>

                <p className="mt-2 text-slate-500">
                  You have not booked any amenities yet.
                </p>

                <button
                  onClick={() => navigate("/amenities")}
                  className="mt-5 rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
                >
                  Explore Amenities
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b bg-slate-50 text-sm text-slate-500">
                      <th className="px-6 py-4 font-medium">Amenity</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Check In</th>
                      <th className="px-6 py-4 font-medium">Check Out</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="border-b last:border-0"
                      >
                        <td className="px-6 py-5 font-medium text-slate-800">
                          {booking.amenity}
                        </td>

                        <td className="px-6 py-5 text-slate-600">
                          {booking.date}
                        </td>

                        <td className="px-6 py-5 text-slate-600">
                          {booking.checkIn}
                        </td>

                        <td className="px-6 py-5 text-slate-600">
                          {booking.checkOut}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              booking.status === "Cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            onClick={() => cancelBooking(booking._id)}
                            disabled={
                              deletingId === booking._id ||
                              booking.status === "Cancelled"
                            }
                            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === booking._id
                              ? "Cancelling..."
                              : booking.status === "Cancelled"
                              ? "Cancelled"
                              : "Cancel"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Bookings