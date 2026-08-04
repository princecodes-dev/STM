// ==========================
// Sidebar
// ==========================

const sidebar = document.getElementById("sidebar");

const menuBtn = document.getElementById("menuBtn");

const closeSidebar = document.getElementById("closeSidebar");

const overlay = document.getElementById("overlay");

function openSidebar() {

    sidebar.scrollTop = 0;

    sidebar.classList.add("active");

    overlay.classList.add("active");

}

function closeSidebarMenu() {

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}

menuBtn.addEventListener("click", openSidebar);

closeSidebar.addEventListener("click", closeSidebarMenu);

overlay.addEventListener("click", closeSidebarMenu);