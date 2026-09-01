import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="min-h-screen w-64 bg-slate-900 p-6 text-white">
          <h1 className="text-2xl font-bold">PropManage</h1>

          <p className="mt-1 text-sm text-slate-400">
            Property Management
          </p>

          <nav className="mt-10 space-y-3">
            <button className="w-full rounded-lg bg-slate-800 px-4 py-3 text-left">
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Dashboard
              </h2>

              <p className="mt-1 text-slate-500">
                Welcome back! Here's what's happening today.
              </p>
            </div>

            <div className="rounded-full bg-white px-5 py-3 shadow-sm">
              <p className="text-sm font-medium text-slate-700">
                Welcome, Sajith
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Pending Requests</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">12</h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">In Progress</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">8</h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Completed</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">24</h3>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Today's Bookings</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">6</h3>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Recent Maintenance Requests
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium text-slate-800">AC not working</p>
                    <p className="text-sm text-slate-500">Apartment A-204</p>
                  </div>

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                    Pending
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium text-slate-800">Water leakage</p>
                    <p className="text-sm text-slate-500">Apartment B-102</p>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    In Progress
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Light repair</p>
                    <p className="text-sm text-slate-500">Apartment C-301</p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Upcoming Bookings
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium text-slate-800">Community Hall</p>
                    <p className="text-sm text-slate-500">Today · 6:00 PM</p>
                  </div>

                  <span className="text-sm font-medium text-slate-600">
                    Confirmed
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium text-slate-800">Swimming Pool</p>
                    <p className="text-sm text-slate-500">Tomorrow · 7:00 AM</p>
                  </div>

                  <span className="text-sm font-medium text-slate-600">
                    Confirmed
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Conference Room</p>
                    <p className="text-sm text-slate-500">Aug 24 · 10:00 AM</p>
                  </div>

                  <span className="text-sm font-medium text-slate-600">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard