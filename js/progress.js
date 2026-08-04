// ================================
// Progress Bar
// ================================

document.addEventListener("DOMContentLoaded", function () {

    window.updateProgressBar = function () {

        const progressFill = document.getElementById("progressFill");
        const progressText = document.getElementById("progressText");

        if (!progressFill || !progressText) return;

        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;

        const percentage =
            total === 0
                ? 0
                : Math.round((completed / total) * 100);

        progressFill.style.width = percentage + "%";

        progressText.textContent =
            `${completed} of ${total} Tasks Completed (${percentage}%)`;

    };

    updateProgressBar();

});