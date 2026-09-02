import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Maintenance() {
  const navigate = useNavigate()

  const [showForm, setShowForm] = useState(false)
  const [issue, setIssue] = useState("")
  const [apartment, setApartment] = useState("")
  const [description, setDescription] = useState("")

  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [updatingId, setUpdatingId] = useState("")

  useEffect(() => {
    getRequests()
  }, [])

  async function getRequests() {
    try {
      setLoading(true)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/maintenance`
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Unable to fetch requests")
        return
      }

      setRequests(data)
    } catch (error) {
      alert("Unable to connect to the server")
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!issue || !apartment || !description) {
      alert("Please fill all fields")
      return
    }

    try {
      setSubmitting(true)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/maintenance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            issue,
            apartment,
            description,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Unable to create request")
        return
      }

      setRequests((oldRequests) => [
        data.maintenance,
        ...oldRequests,
      ])

      setIssue("")
      setApartment("")
      setDescription("")
      setShowForm(false)

      alert("Maintenance request created successfully")
    } catch (error) {
      alert("Unable to connect to the server")
    } finally {
      setSubmitting(false)
    }
  }

  async function updateStatus(id, status) {
    try {
      setUpdatingId(id)

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/maintenance/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Unable to update status")
        return
      }

      setRequests((oldRequests) =>
        oldRequests.map((request) => {
          if (request._id === id) {
            return data.maintenance
          }

          return request
        })
      )
    } catch (error) {
      alert("Unable to connect to the server")
    } finally {
      setUpdatingId("")
    }
  }

  function getStatusStyle(status) {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700"
    }

    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700"
    }

    return "bg-green-100 text-green-700"
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
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

            <button className="w-full rounded-lg bg-slate-800 px-4 py-3 text-left">
              Maintenance
            </button>

            <button
              onClick={() => navigate("/amenities")}
              className="w-full rounded-lg px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
            >
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
                Maintenance Requests
              </h2>

              <p className="mt-1 text-slate-500">
                Manage and track all property maintenance requests.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
            >
              + Create Request
            </button>
          </div>

          {showForm && (
            <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Create Maintenance Request
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Issue Title
                  </label>

                  <input
                    type="text"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Example: AC not working"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Apartment Number
                  </label>

                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="Example: A-204"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue"
                    rows="4"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Request"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={submitting}
                    className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                All Requests
              </h3>

              <span className="text-sm text-slate-500">
                {requests.length} Requests
              </span>
            </div>

            {loading ? (
              <div className="p-10 text-center text-slate-500">
                Loading maintenance requests...
              </div>
            ) : requests.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="text-lg font-semibold text-slate-800">
                  No maintenance requests
                </h3>

                <p className="mt-2 text-slate-500">
                  Create your first maintenance request.
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  className="mt-5 rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800"
                >
                  Create Request
                </button>
              </div>
            ) : (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-sm text-slate-500">
                      <th className="pb-4 font-medium">Issue</th>
                      <th className="pb-4 font-medium">Apartment</th>
                      <th className="pb-4 font-medium">Description</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>

                  <tbody className="text-sm">
                    {requests.map((request) => (
                      <tr key={request._id} className="border-b">
                        <td className="py-5 font-medium text-slate-800">
                          {request.issue}
                        </td>

                        <td className="py-5 text-slate-600">
                          {request.apartment}
                        </td>

                        <td className="max-w-xs py-5 text-slate-600">
                          {request.description}
                        </td>

                        <td className="py-5 text-slate-600">
                          {formatDate(request.createdAt)}
                        </td>

                        <td className="py-5">
                          <select
                            value={request.status}
                            onChange={(e) =>
                              updateStatus(
                                request._id,
                                e.target.value
                              )
                            }
                            disabled={updatingId === request._id}
                            className={`rounded-full px-3 py-2 text-xs font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50 ${getStatusStyle(
                              request.status
                            )}`}
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Completed">
                              Completed
                            </option>
                          </select>
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

export default Maintenance