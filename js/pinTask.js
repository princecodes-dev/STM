// ================================
// Pin / Unpin Task
// ================================

function togglePin(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.pinned = !task.pinned;

        }

        return task;

    });

    saveTasks();

    showToast("Task pin updated ⭐");

}