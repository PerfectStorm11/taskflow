import React, { useEffect, useState } from "react";
import API from "../services/api";
import Tasks from "./Tasks";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [newProjectName, setNewProjectName] = useState("");

    useEffect(() => {
        API.get("/projects").then(res => setProjects(res.data));
    }, []);

    const createProject = async () => {
        if (!newProjectName) return;
        await API.post("/projects", { name: newProjectName, description: "" });
        const res = await API.get("/projects");
        setProjects(res.data);
        setNewProjectName("");
    };

    return (
        <div className="app-container">
            <div className="topbar">
                <div className="logo">Taskflow</div>
                <div className="muted">Projects · {projects.length}</div>
            </div>

            <div className="layout">
                <div className="sidebar card">
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                        <input className="input" placeholder="New project" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
                        <button className="btn" onClick={createProject}>Create</button>
                    </div>

                    <ul className="project-list">
                        {projects.map(p => (
                            <li key={p.ID} className={`project-item ${selectedProject && selectedProject.ID === p.ID ? 'active' : ''}`} onClick={() => setSelectedProject(p)}>
                                {p.Name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="main card">
                    {selectedProject ? <Tasks projectId={selectedProject.ID} /> : <div className="muted">Select a project to view tasks</div>}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;