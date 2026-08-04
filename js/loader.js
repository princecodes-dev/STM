async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    const response = await fetch(file);

    const html = await response.text();

    element.innerHTML = html;

}

document.addEventListener("DOMContentLoaded", () => {

    loadComponent("sidebar-container", "components/sidebar.html");

    loadComponent("topbar-container", "components/topbar.html");

});