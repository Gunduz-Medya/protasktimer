import React, { useState, useEffect } from 'react';

function Timer({ addTask, setTaskAsActive }) {
    const [taskName, setTaskName] = useState('');
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        chrome.runtime.sendMessage({ action: 'getTimerState' }, (response) => {
            if (response.isRunning) {
                setTaskName(response.taskName);
                setTime(response.elapsedTime);
                setIsRunning(response.isRunning);
                setTaskAsActive({ name: response.taskName });
            }
        });
    }, [setTaskAsActive]);

    const startTimer = () => {
        if (!taskName) {
            alert('Please enter a task name.');
            return;
        }
        setIsRunning(true);
        setTaskAsActive({ name: taskName });
        chrome.runtime.sendMessage({ action: 'startTimer', taskName });
    };

    const stopTimer = () => {
        setIsRunning(false);
        addTask({ name: taskName, time });
        setTaskName('');
        setTime(0);
        setTaskAsActive(null);
        chrome.runtime.sendMessage({ action: 'stopTimer' });
    };

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className="timer-container">
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="task-input"
            />
            <button onClick={startTimer} disabled={isRunning} className="start-button">
                Start
            </button>
            <button onClick={stopTimer} disabled={!isRunning} className="stop-button">
                Stop
            </button>
            <div className="timer-display">Elapsed Time: {new Date(time * 1000).toISOString().substr(11, 8)}</div>
        </div>
    );
}

export default Timer;