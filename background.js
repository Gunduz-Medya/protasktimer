let timer = null;
let elapsedTime = 0;
let taskName = '';
let isRunning = false;
let tasks = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startTimer') {
        taskName = message.taskName;
        isRunning = true;
        timer = setInterval(() => {
            elapsedTime++;
            chrome.storage.local.set({ isRunning, elapsedTime, taskName });
        }, 1000);
    }

    if (message.action === 'stopTimer') {
        clearInterval(timer);
        isRunning = false;
        tasks.push({ name: taskName, time: elapsedTime });
        chrome.storage.local.set({ isRunning, elapsedTime, taskName, tasks });
    }

    if (message.action === 'getTimerState') {
        chrome.storage.local.get(['isRunning', 'elapsedTime', 'taskName', 'tasks'], (data) => {
            sendResponse(data);
        });
        return true;
    }
});