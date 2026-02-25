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
        <div>
            <h2>Projects</h2>
            <input placeholder="New project" value={newProjectName} onChange={e=>setNewProjectName(e.target.value)} />
            <button onClick={createProject}>Create</button>

            <ul>
                {projects.map(p => (
                    <li key={p.ID} onClick={()=>setSelectedProject(p)}>
                        {p.Name}
                    </li>
                ))}
            </ul>

            {selectedProject && <Tasks projectId={selectedProject.ID} />}
        </div>
    );
}

export default Dashboard;