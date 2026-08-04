// ==========================
// Achievements System
// ==========================

const achievements = [

    {
        id: 1,
        icon: "🏁",
        title: "First Task",
        desc: "Complete your first task.",
        check: () => completedTasks() >= 1
    },

    {
        id: 2,
        icon: "📝",
        title: "Task Master",
        desc: "Complete 10 tasks.",
        check: () => completedTasks() >= 10
    },

    {
        id: 3,
        icon: "📚",
        title: "Study Champion",
        desc: "Complete 50 tasks.",
        check: () => completedTasks() >= 50
    },

    {
        id: 4,
        icon: "🎯",
        title: "Productive",
        desc: "Reach 80% productivity.",
        check: () => calculateProductivity() >= 80
    },

    {
        id: 5,
        icon: "🔥",
        title: "No Overdue",
        desc: "Have zero overdue tasks.",
        check: () => overdueTasks().length === 0
    },

    {
        id: 6,
        icon: "📅",
        title: "Today's Hero",
        desc: "Complete all pending tasks.",
        check: () => pendingTasks() === 0
    },

    {
        id: 7,
        icon: "📌",
        title: "Priority Master",
        desc: "Complete all high priority tasks.",
        check: () => highPriorityTasks() === 0
    },

    {
        id: 8,
        icon: "🏆",
        title: "Perfect Student",
        desc: "Reach 100% productivity.",
        check: () => calculateProductivity() === 100
    }

];

// ==========================
// Load Achievements
// ==========================

function loadAchievements(){

    const grid = document.getElementById("achievementGrid");
    const count = document.getElementById("achievementCount");
    const progress = document.getElementById("achievementProgress");

    if(!grid) return;

    grid.innerHTML = "";

    let unlockedCount = 0;

    achievements.forEach(item=>{

        const unlocked = item.check();

        if(unlocked){

            unlockedCount++;

            const key = "achievement_" + item.id;

            if(!localStorage.getItem(key)){

                showAchievement(item.title);

                localStorage.setItem(key,"true");

            }

        }

        grid.innerHTML += `

            <div class="achievement ${unlocked ? "unlocked" : "locked"}">

                <i>${item.icon}</i>

                <h4>${item.title}</h4>

                <p>${item.desc}</p>

            </div>

        `;

    });

    count.textContent = `${unlockedCount} / ${achievements.length} Unlocked`;

    progress.style.width =
        (unlockedCount / achievements.length) * 100 + "%";

    loadXP(unlockedCount);

}

// ==========================
// Achievement Popup
// ==========================

function showAchievement(title){

    const popup = document.getElementById("achievementPopup");

    const text = document.getElementById("achievementPopupTitle");

    if(!popup || !text) return;

    text.textContent = title;

    popup.classList.add("show");

    setTimeout(()=>{

        popup.classList.remove("show");

    },3000);

}

// ==========================
// XP & Level
// ==========================

// ==========================
// XP & LEVEL SYSTEM
// ==========================

const LEVEL_REQUIREMENTS = [
    0,
    5,
    15,
    30,
    50,
    75,
    105,
    140,
    180,
    225,
    275,
    330,
    390,
    455,
    525
];

function loadXP() {

    const completed = completedTasks();

    let level = 1;

    for (let i = 0; i < LEVEL_REQUIREMENTS.length; i++) {

        if (completed >= LEVEL_REQUIREMENTS[i]) {

            level = i + 1;

        }

    }

    if (level > 15) {

        level = 15;

    }

    document.getElementById("userLevel").textContent =
        `Level ${level}`;

    // MAX LEVEL

    if (level === 15) {

        document.getElementById("xpText").textContent =
            "MAX LEVEL";

        document.getElementById("xpFill").style.width =
            "100%";

        return;

    }

    const currentLevelStart =
        LEVEL_REQUIREMENTS[level - 1];

    const nextLevelTarget =
        LEVEL_REQUIREMENTS[level];

    const completedInCurrentLevel =
        completed - currentLevelStart;

    const totalNeeded =
        nextLevelTarget - currentLevelStart;

    const remaining =
        nextLevelTarget - completed;

    const progress =
        (completedInCurrentLevel / totalNeeded) * 100;

    document.getElementById("xpText").textContent =
        `${remaining} Task${remaining !== 1 ? "s" : ""} Remaining`;

    document.getElementById("xpFill").style.width =
        `${progress}%`;

}

// ==========================
// Initial Load
// ==========================

window.addEventListener("load", loadAchievements);


// ==========================
// Login Streak
// ==========================

function updateLoginStreak(){

    const today = new Date().toDateString();

    const lastLogin = localStorage.getItem("lastLogin");

    let streak = parseInt(localStorage.getItem("loginStreak")) || 0;

    if(lastLogin === today){

        // Already logged in today

    }else{

        if(lastLogin){

            const last = new Date(lastLogin);

            const diff = Math.floor(

                (new Date(today)-last)/(1000*60*60*24)

            );

            if(diff===1){

                streak++;

            }else{

                streak=1;

            }

        }else{

            streak=1;

        }

        localStorage.setItem("lastLogin",today);

        localStorage.setItem("loginStreak",streak);

    }

    document.getElementById("streakText").textContent=

        streak+" Day"+(streak>1?"s":"");

}

window.addEventListener("load",()=>{

    updateLoginStreak();

});