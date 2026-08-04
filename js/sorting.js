// ================================
// Task Sorting
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const sortTasks = document.getElementById("sortTasks");

    sortTasks.addEventListener("change", function () {

        const value = this.value;

        if (value === "date") {

            tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

        }

        else if (value === "priority") {

            const priorityOrder = {
                High: 3,
                Medium: 2,
                Low: 1
            };

            tasks.sort((a, b) =>
                priorityOrder[b.priority] - priorityOrder[a.priority]
            );

        }

        else if (value === "az") {

            tasks.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

        }

        displayTasks();

    });

});