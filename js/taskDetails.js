// ================================
// Task Details Popup
// ================================

document.addEventListener("DOMContentLoaded", function () {

const detailsModal = document.getElementById("detailsModal");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const detailLink = document.getElementById("detailLink");
const closeDetails = document.getElementById("closeDetails");

window.openTaskDetails = function (id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    detailTitle.textContent = task.title;

    detailDescription.textContent =
        task.description || "No description available.";

    if (task.link) {

        detailLink.href = task.link;
        detailLink.textContent = "🔗 Open Reference";

        detailLink.style.display = "inline";

    } else {

        detailLink.style.display = "none";

    }

    detailsModal.style.display = "flex";

}

closeDetails.addEventListener("click", function () {

    detailsModal.style.display = "none";

});

window.addEventListener("click", function (e) {

    if (e.target === detailsModal) {

        detailsModal.style.display = "none";

    }

});

});