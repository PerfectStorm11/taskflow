import React, { useEffect, useState } from "react";
import API from "../services/api";

function Tasks({ projectId }) {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const statuses = ["todo", "in_progress", "done"];

    useEffect(() => {
        API.get("/tasks").then(res => {
            setTasks(res.data.filter(t => t.ProjectID === projectId));
        });
    }, [projectId]);

    const createTask = async () => {
        if (!newTaskTitle) return;
        await API.post("/tasks", {
            title: newTaskTitle,
            description: "",
            projectID: projectId,
            assigneeID: 1
        });
        const res = await API.get("/tasks");
        setTasks(res.data.filter(t => t.ProjectID === projectId));
        setNewTaskTitle("");
    };

    return (
        <div>
            <h3>Tasks</h3>
            <input placeholder="New task" value={newTaskTitle} onChange={e=>setNewTaskTitle(e.target.value)} />
            <button onClick={createTask}>Add</button>

            <div style={{ display: "flex", gap: "20px" }}>
                {statuses.map(status => (
                    <div key={status} style={{ border: "1px solid black", padding: "10px" }}>
                        <h4>{status.toUpperCase()}</h4>
                        {tasks.filter(t => t.Status === status).map(t => (
                            <div key={t.ID}>{t.Title}</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tasks;