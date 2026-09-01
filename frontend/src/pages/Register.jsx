import { Link } from "react-router-dom"

function Register() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Start managing your property smarter.
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Create your account and manage maintenance requests, amenity bookings
            and property activities from one platform.
          </p>

          <p className="mt-10 text-sm text-slate-400">
            PROPERTY MANAGEMENT SYSTEM
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-slate-900">
            Create account
          </h2>

          <p className="mt-2 text-slate-500">
            Enter your details to get started.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

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
                placeholder="Create a password"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 py-3 font-medium text-white hover:bg-slate-800"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-slate-900">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
