import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />} />
                <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;