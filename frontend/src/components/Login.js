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
        <div>
            <h2>Login</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;