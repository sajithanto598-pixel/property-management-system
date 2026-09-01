import { Link, useNavigate } from "react-router-dom"
function Login() {
    const navigate = useNavigate()
  
    return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Manage your property smarter.
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Manage maintenance requests, amenity bookings and property activities
            from one simple platform.
          </p>

          <div className="mt-10">
            <p className="text-sm text-slate-400">PROPERTY MANAGEMENT SYSTEM</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>

          <p className="mt-2 text-slate-500">
            Sign in to continue to your dashboard.
          </p>

          <form
  className="mt-8 space-y-5"
  onSubmit={(e) => {
    e.preventDefault()
    navigate("/dashboard")
  }}
>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 py-3 font-medium text-white hover:bg-slate-800"
            >
              Sign In
            </button>
          </form>

          
          <p className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                <Link to="/register" className="font-medium text-slate-900">
                Create Account
             </Link>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login