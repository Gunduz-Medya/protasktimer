import React from 'react';

function ActiveTask({ task }) {
    return (
        <div className="active-task">
            <h3>Active Task</h3>
            <p>{task.name}</p>
        </div>
    );
}

export default ActiveTask;