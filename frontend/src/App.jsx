import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Maintenance from "./pages/Maintenance"
import Amenities from "./pages/Amenities"
import Bookings from "./pages/Bookings"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/amenities" element={<Amenities />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  )
}

export default App