export const loadTasks = (callback) => {
    chrome.storage.local.get(['tasks'], (result) => {
        callback(result.tasks || []);
    });
};

export const saveTasks = (tasks) => {
    chrome.storage.local.set({ tasks });
};