export const exportTasksToCSV = (tasks, fileName) => {
    if (!tasks.length) {
        alert('No tasks available to export.');
        return;
    }

    const csvContent = [
        ['Task Name', 'Elapsed Time'],
        ...tasks.map((task) => [task.name, new Date(task.time * 1000).toISOString().substr(11, 8)])
    ]
        .map((row) => row.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};