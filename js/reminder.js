// ================================
// Smart Deadline Reminder
// ================================

window.getReminderHTML = function(task){

    if(task.completed){

    return `
    <div class="reminder completed">
        🎉 Task Completed
    </div>`;
   }

    const today = new Date();
    today.setHours(0,0,0,0);

    const due = new Date(task.date);
    due.setHours(0,0,0,0);

    const diff = Math.floor(
        (due - today)/(1000*60*60*24)
    );

    if(diff < 0){

        return `
        <div class="reminder overdue">
            🔴 Overdue by ${Math.abs(diff)} day${Math.abs(diff)>1?"s":""}
        </div>`;
    }

    if(diff === 0){

        return `
        <div class="reminder today">
            🔥 Due Today
        </div>`;
    }

    if(diff === 1){

        return `
        <div class="reminder tomorrow">
            ⚠ Due Tomorrow
        </div>`;
    }

    return `
    <div class="reminder upcoming">
        📅 Due in ${diff} days
    </div>`;

}