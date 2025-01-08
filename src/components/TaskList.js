import React from 'react';

function TaskList({ tasks }) {
    return (
        <div className="tasklist-container">
            <h2>Task List</h2>
            <ul className="tasklist">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <span className="task-icon">✔️</span>
                        <span>{task.name}: {new Date(task.time * 1000).toISOString().substr(11, 8)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;