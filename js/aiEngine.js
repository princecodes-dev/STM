// =========================================
// STUDENT AI ENGINE
// Offline Intelligence
// =========================================

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

// =========================================
// GET TASKS
// =========================================

function getTasks() {

    const user = getCurrentUser();

    if (!user) return [];

    return user.tasks || [];

}

// =========================================
// PRODUCTIVITY SCORE
// =========================================

function calculateProductivity() {

    const tasks = getTasks();

    if (tasks.length === 0) {

        return 0;

    }

    const completed = tasks.filter(task => task.completed).length;

    return Math.round((completed / tasks.length) * 100);

}

// =========================================
// COMPLETED TASKS
// =========================================

function completedTasks() {

    return getTasks().filter(task => task.completed).length;

}

// =========================================
// PENDING TASKS
// =========================================

function pendingTasks() {

    return getTasks().filter(task => !task.completed).length;

}

// =========================================
// HIGH PRIORITY TASKS
// =========================================

function highPriorityTasks() {

    return getTasks().filter(task =>

        task.priority &&
        task.priority.toLowerCase() === "high" &&
        !task.completed

    );

}

// =========================================
// OVERDUE TASKS
// =========================================

function overdueTasks() {

    const today = new Date();

    return getTasks().filter(task => {

        if (!task.date) return false;

        return (

            new Date(task.date) < today &&
            !task.completed

        );

    });

}

// =========================================
// SUBJECT ANALYSIS
// =========================================

function subjectAnalysis() {

    const subjects = {};

    getTasks().forEach(task => {

        if (!task.subject) return;

        if (!subjects[task.subject]) {

            subjects[task.subject] = 0;

        }

        if (!task.completed) {

            subjects[task.subject]++;

        }

    });

    return subjects;

}

// =========================================
// WEAKEST SUBJECT
// =========================================

function weakestSubject() {

    const subjects = subjectAnalysis();

    let weak = "None";

    let max = 0;

    for (const subject in subjects) {

        if (subjects[subject] > max) {

            max = subjects[subject];

            weak = subject;

        }

    }

    return weak;

}

// =========================================
// AI SUMMARY
// =========================================

function generateSummary() {

    return {

        productivity: calculateProductivity(),

        completed: completedTasks(),

        pending: pendingTasks(),

        overdue: overdueTasks().length,

        highPriority: highPriorityTasks().length,

        weakestSubject: weakestSubject()

    };

}

// =========================================
// AI RESPONSE
// =========================================

function analyzeStudent() {

    const report = generateSummary();

    return `

📊 <b>Performance Report</b>

<br><br>

✅ Productivity :

<b>${report.productivity}%</b>

<br><br>

✔ Completed Tasks :

<b>${report.completed}</b>

<br><br>

📝 Pending Tasks :

<b>${report.pending}</b>

<br><br>

⚠ Overdue Tasks :

<b>${report.overdue}</b>

<br><br>

🔥 High Priority :

<b>${report.highPriority}</b>

<br><br>

📚 Needs More Attention :

<b>${report.weakestSubject}</b>

`;

}

// =========================================
// DAILY SUGGESTION
// =========================================

function dailySuggestion() {

    const report = generateSummary();

    if (report.pending === 0) {

        return "🎉 Amazing! You have completed all your tasks.";

    }

    if (report.overdue > 0) {

        return `⚠ Complete your ${report.overdue} overdue task(s) first.`;

    }

    if (report.highPriority > 0) {

        return `🔥 Focus on ${report.highPriority} high priority task(s).`;

    }

    return `📚 Spend extra time on ${report.weakestSubject}.`;

}



function generateWeeklyReport(){

    return `
        📊 <b>Weekly Report</b><br><br>

        ✅ Completed : ${completedTasks()}<br>

        📝 Pending : ${pendingTasks()}<br>

        📈 Productivity : ${calculateProductivity()}%
    `;

}