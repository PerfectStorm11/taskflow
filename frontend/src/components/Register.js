import React, { useState } from "react";
import API from "../services/api";

import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await API.post("/register", { email, password });
            alert("Registered! Now login.");
            navigate("/login");
        } catch {
            alert("Ошибка регистрации");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;