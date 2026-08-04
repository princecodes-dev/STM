// ================================
// Category & Tags
// ================================

// Future:
// - Category Filter
// - Category Analytics
// - AI Category Insights
// ================================
// Category Filter
// ================================


const categoryButtons =
    document.querySelectorAll(".category-btn");

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active"));

        this.classList.add("active");

        currentCategory =
            this.dataset.category;

        displayTasks();

    });

});