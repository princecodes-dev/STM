// =============================
// Student AI Assistant
// =============================

const aiFab = document.getElementById("aiFab");
const aiPopup = document.getElementById("aiPopup");
const closeAI = document.getElementById("closeAI");

const aiInput = document.getElementById("aiInput");
const sendAI = document.getElementById("sendAI");
const aiChat = document.getElementById("aiChat");

const HISTORY_KEY = "aiHistory";


// =============================
// OPEN / CLOSE
// =============================

aiFab.addEventListener("click", () => {

    aiPopup.classList.add("active");

});

closeAI.addEventListener("click", () => {

    aiPopup.classList.remove("active");

});


// =============================
// LOAD HISTORY
// =============================

window.addEventListener("load", () => {

    loadHistory();

});


// =============================
// SEND MESSAGE
// =============================

sendAI.addEventListener("click", sendMessage);

aiInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});

function sendMessage(){

    const text = aiInput.value.trim();

    if(text==="") return;

    addMessage("user",text);

    aiInput.value="";

    showTyping();

setTimeout(()=>{

    hideTyping();

    offlineReply(text);

},1000);

}


// =============================
// ADD MESSAGE
// =============================

function addMessage(sender,text){

    const div=document.createElement("div");

    div.className=

        sender==="user"

        ? "user-message"

        : "ai-message";

    div.innerHTML=text;

    aiChat.appendChild(div);

    aiChat.scrollTop=aiChat.scrollHeight;

    saveMessage(sender,text);

}

// =============================
// AI Typing Indicator
// =============================

function showTyping(){

    const typing=document.createElement("div");

    typing.className="ai-typing";

    typing.id="typingIndicator";

    typing.innerHTML=`
        <span></span>
        <span></span>
        <span></span>
    `;

    aiChat.appendChild(typing);

    aiChat.scrollTop=aiChat.scrollHeight;

}

function hideTyping(){

    const typing=document.getElementById("typingIndicator");

    if(typing){

        typing.remove();

    }

}

// =============================
// AI Welcome Dashboard
// =============================

function showWelcomeDashboard(){

    const welcome = `

        <div class="ai-dashboard">

            <h3>👋 Welcome Back!</h3>

            <div class="ai-card">
                📈 <b>Productivity:</b> ${calculateProductivity()}%
            </div>

            <div class="ai-card">
                📝 <b>Pending:</b> ${pendingTasks()}
            </div>

            <div class="ai-card">
                ✅ <b>Completed:</b> ${completedTasks()}
            </div>

            <div class="ai-card">
                🔥 <b>Overdue:</b> ${overdueTasks().length}
            </div>

            <div class="ai-card">
                🎯 <b>Focus Subject:</b> ${weakestSubject()}
            </div>

            <div class="ai-card">
                💡 ${dailySuggestion()}
            </div>

        </div>

    `;

    const div = document.createElement("div");

div.className = "ai-message";

div.innerHTML = welcome;

aiChat.appendChild(div);

}


// =============================
// SAVE
// =============================

function saveMessage(sender,text){

    let history=

        JSON.parse(

            localStorage.getItem(HISTORY_KEY)

        ) || [];

    history.push({

        sender,

        text,

        time:new Date().toLocaleString()

    });

    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(history)

    );

}


// =============================
// LOAD
// =============================

function loadHistory(){

    aiChat.innerHTML="";

    const history=

        JSON.parse(

            localStorage.getItem(HISTORY_KEY)

        ) || [];

    if(history.length===0){

    showWelcomeDashboard();

    return;

}

    history.forEach(msg=>{

        const div=document.createElement("div");

        div.className=

            msg.sender==="user"

            ? "user-message"

            : "ai-message";

        div.innerHTML=msg.text;

        aiChat.appendChild(div);

    });

    aiChat.scrollTop=aiChat.scrollHeight;

}


// =============================
// OFFLINE REPLY (TEMP)
// =============================

function offlineReply(message) {

    const ai = detectIntent(message);

    switch (ai.intent) {

        case "greeting":

            addMessage(
                "ai",
                "👋 Hello! I'm your Personal Assistant. I can analyze your productivity, tasks, and study performance."
            );
            break;

        case "productivity":

            addMessage(
                "ai",
                "📈 Your productivity score is <b>" +
                calculateProductivity() +
                "%</b>"
            );
            break;

        case "performance":

            addMessage(
                "ai",
                analyzeStudent()
            );
            break;

        case "suggestion":

            addMessage(
                "ai",
                dailySuggestion()
            );
            break;

        case "weak":

            addMessage(
                "ai",
                "📚 Your weakest subject is <b>" +
                weakestSubject() +
                "</b>"
            );
            break;

        case "pending":

            addMessage(
                "ai",
                "📝 Pending Tasks : <b>" +
                pendingTasks() +
                "</b>"
            );
            break;

        case "completed":

            addMessage(
                "ai",
                "✅ Completed Tasks : <b>" +
                completedTasks() +
                "</b>"
            );
            break;

        case "overdue":

            addMessage(
                "ai",
                "⚠ Overdue Tasks : <b>" +
                overdueTasks().length +
                "</b>"
            );
            break;

        default:

            addMessage(
                "ai",
                "🤖 I don't understand that yet. Soon I'll support natural conversations."
            );

    }

}



// =============================
// Quick Action Buttons
// =============================

document.querySelectorAll(".ai-action").forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        switch (action) {

            case "analyze":

                addMessage("user", "Analyze my performance");
                showTyping();

                setTimeout(() => {

                    hideTyping();
                    addMessage("ai", analyzeStudent());

                }, 1000);

                break;

            case "plan":

                addMessage("user", "Today's study plan");
                showTyping();

                setTimeout(() => {

                    hideTyping();
                    addMessage("ai", dailySuggestion());

                }, 1000);

                break;

            case "weekly":

                addMessage("user", "Weekly report");
                showTyping();

                setTimeout(() => {

                    hideTyping();
                    addMessage("ai", generateWeeklyReport());

                }, 1000);

                break;

            case "focus":

                addMessage("user", "Weakest subject");
                showTyping();

                setTimeout(() => {

                    hideTyping();
                    addMessage("ai", "📚 Focus Subject: <b>" + weakestSubject() + "</b>");

                }, 1000);

                break;

            case "overdue":

                addMessage("user", "Show overdue tasks");
                showTyping();

                setTimeout(() => {

                    hideTyping();
                    addMessage("ai", "🔥 Overdue Tasks: <b>" + overdueTasks().length + "</b>");

                }, 1000);

                break;

            case "summary":

                addMessage("user", "Summarize my tasks");
                showTyping();

                setTimeout(() => {

                    hideTyping();
                    addMessage("ai", generateTaskSummary());

                }, 1000);

                break;

        }

        saveHistory();

    });

});



const quickActions = document.querySelector(".ai-quick-actions");

aiChat.addEventListener("scroll", () => {

    if (aiChat.scrollTop > 20) {

        quickActions.style.display = "none";

    } else {

        quickActions.style.display = "grid";

    }

});



// =============================
// Pull To Refresh Chat
// =============================

const refreshBar = document.getElementById("aiRefresh");

let startY = 0;

aiChat.addEventListener("touchstart", e => {

    if(aiChat.scrollTop === 0){

        startY = e.touches[0].clientY;

    }

});

aiChat.addEventListener("touchmove", e => {

    const distance = e.touches[0].clientY - startY;

    if(aiChat.scrollTop === 0 && distance > 0){

        refreshBar.style.height = Math.min(distance,60) + "px";

        if(distance > 60){

            refreshBar.innerHTML = "🔄 Release to clear chat";

        }else{

            refreshBar.innerHTML = "⬇ Pull down to clear chat";

        }

    }

});

aiChat.addEventListener("touchend", () => {

    if(parseInt(refreshBar.style.height) > 60){

        aiChat.innerHTML = "";

        showWelcomeDashboard();

    }

    refreshBar.style.height = "0";

});



const resetBtn = document.getElementById("resetAI");

resetBtn.addEventListener("click",()=>{

    const chat=document.getElementById("aiChat");

    chat.innerHTML="";

    showWelcomeMessage();

    showToast("🗑️ Chat cleared successfully.");

});