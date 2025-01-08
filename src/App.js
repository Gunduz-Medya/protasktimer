import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import ActiveTask from './components/ActiveTask';
import { exportTasksToCSV } from './utils/export';

function App() {
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
        chrome.storage.local.get(['tasks'], (result) => {
            if (result.tasks) {
                setTasks(result.tasks);
            }
        });
    }, []);

    const addTask = (task) => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        setActiveTask(null);
        chrome.storage.local.set({ tasks: updatedTasks });
    };

    const clearTasks = () => {
        if (window.confirm('Are you sure you want to clear all tasks?')) {
            setTasks([]);
            setActiveTask(null);
            chrome.storage.local.remove('tasks');
        }
    };

    return (
        <div className="app-container">
            <h1>🕒 ProTaskTimer</h1>
            <Timer addTask={addTask} setTaskAsActive={setActiveTask} />
            {activeTask && <ActiveTask task={activeTask} />}
            {tasks.length > 0 && (
                <>
                    <TaskList tasks={tasks} />
                    <div className="button-group">
                        <button onClick={() => exportTasksToCSV(tasks, `ProTaskTimer-${new Date().toISOString().split('T')[0]}`)} className="export-button">Export Daily Report</button>
                        <button onClick={clearTasks} className="clear-button">Clear Tasks</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;