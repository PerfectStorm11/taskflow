import React, { useState } from "react";
import API from "../services/api";

function Profile() {
    const [name, setName] = useState("Vlad Ivanov");
    const [email, setEmail] = useState("vlad@example.com");
    const [about, setAbout] = useState("Frontend-разработчик. Люблю чистый код и хороший кофе.");
    const [saving, setSaving] = useState(false);

    const save = async () => {
        setSaving(true);
        try {
            // placeholder: call to API to save profile
            // await API.put('/user/profile', { name, email, about });
            setTimeout(() => setSaving(false), 700);
        } catch (e) {
            setSaving(false);
            alert('Ошибка сохранения');
        }
    }

    return (
        <div className="app-container">
            <div className="layout">
                <div className="sidebar card">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: 12, borderRadius: 8, background: '#fbfdff', marginBottom: 8 }}> <strong>Профиль</strong></li>
                        <li style={{ padding: 12, borderRadius: 8, color: '#6b7280', marginBottom: 8 }}>Безопасность</li>
                        <li style={{ padding: 12, borderRadius: 8, color: '#6b7280' }}>Уведомления</li>
                    </ul>
                </div>

                <div className="main">
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 56, height: 56, borderRadius: 28, background: '#e6f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#2563eb' }}>V</div>
                            <div>
                                <div style={{ fontWeight: 700 }}>Vlad Ivanov</div>
                                <div className="muted">vlad@example.com</div>
                            </div>
                        </div>

                        <hr style={{ margin: '16px 0' }} />

                        <div style={{ display: 'grid', gap: 10 }}>
                            <label>Имя</label>
                            <input className="input" value={name} onChange={e => setName(e.target.value)} />

                            <label>Email</label>
                            <input className="input" value={email} onChange={e => setEmail(e.target.value)} />

                            <label>О себе</label>
                            <textarea className="input" rows={4} value={about} onChange={e => setAbout(e.target.value)} />

                            <div>
                                <button className="btn" onClick={save} disabled={saving}>{saving ? 'Сохранение...' : 'Сохранить'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
