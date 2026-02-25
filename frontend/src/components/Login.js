import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages

    const handleLogin = async () => {
        // client-side validation
        setError("");
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setError("Введите корректный email");
            return;
        }
        if (!password || password.length < 6) {
            setError("Пароль должен быть не менее 6 символов");
            return;
        }

        try {
            const res = await API.post("/login", { email, password });
            localStorage.setItem("token", res.data.token);
            onLogin();          // обновляет состояние в App
            navigate("/dashboard"); // переходим на дашборд
        } catch (err) {
            setError("Неверные данные");
        }
    };

    return (
        <div className="auth-wrap">
            <div className="card auth-card">
                <h2>Welcome back</h2>
                <div className="muted">Sign in to continue to Taskflow</div>

                <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

                {error && <div style={{ color: '#b91c1c', marginTop: 6 }}>{error}</div>}

                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <button className="btn" onClick={handleLogin}>Login</button>
                    <button className="btn secondary" onClick={() => navigate('/register')}>Create account</button>
                </div>
            </div>
        </div>
    );
}

export default Login;