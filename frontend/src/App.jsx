import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

 import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
 import Investments from "./pages/Investments";
import Referral from "./pages/Referal";
import Profile from "./pages/Profile";

function App() {
    return (
       <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes with Layout */}
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                 <Route path="/investments" element={<Investments />} />
                
                 <Route path="/profile" element={<Profile />} /> 
                 
                 <Route path="/referrals" element={<Referral />} />
            </Route>
        </Routes>
    );
}

export default App;