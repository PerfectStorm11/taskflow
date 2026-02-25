import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { email, password });
            localStorage.setItem("token", res.data.token);
            onLogin();          // обновляет состояние в App
            navigate("/dashboard"); // переходим на дашборд
        } catch (err) {
            alert("Неверные данные");
        }
    };

    return (
        <div className="auth-wrap">
            <div className="card auth-card">
                <h2>Welcome back</h2>
                <div className="muted">Sign in to continue to Taskflow</div>

                <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input className="input" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <button className="btn" onClick={handleLogin}>Login</button>
                    <button className="btn secondary" onClick={() => navigate('/register')}>Create account</button>
                </div>
            </div>
        </div>
    );
}

export default Login;