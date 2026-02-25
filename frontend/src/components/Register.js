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
        <div className="auth-wrap">
            <div className="card auth-card">
                <h2>Create account</h2>
                <div className="muted">Join Taskflow — organize your work</div>

                <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input className="input" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <button className="btn" onClick={handleRegister}>Register</button>
                    <button className="btn secondary" onClick={() => navigate('/login')}>Back to login</button>
                </div>
            </div>
        </div>
    );
}

export default Register;