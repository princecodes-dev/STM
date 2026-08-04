// ========================================
// STUDENT AI INTENT ENGINE
// Version 1.0
// ========================================

function detectIntent(message) {

    const text = message.toLowerCase().trim();

    // --------------------
    // Greetings
    // --------------------

    if (
        text.includes("hi") ||
        text.includes("hello") ||
        text.includes("hey")
    ) {

        return {
            intent: "greeting"
        };

    }

    // --------------------
    // Productivity
    // --------------------

    if (

        text.includes("productivity") ||

        text.includes("productive") ||

        text.includes("score")

    ) {

        return {

            intent: "productivity"

        };

    }

    // --------------------
    // Performance
    // --------------------

    if (

        text.includes("performance") ||

        text.includes("report") ||

        text.includes("analyze") ||

        text.includes("analysis")

    ) {

        return {

            intent: "performance"

        };

    }

    // --------------------
    // Suggestions
    // --------------------

    if (

        text.includes("suggest") ||

        text.includes("advice") ||

        text.includes("study plan") ||

        text.includes("today")

    ) {

        return {

            intent: "suggestion"

        };

    }

    // --------------------
    // Weak Subject
    // --------------------

    if (

        text.includes("weak") ||

        text.includes("subject")

    ) {

        return {

            intent: "weak"

        };

    }

    // --------------------
    // Pending
    // --------------------

    if (

        text.includes("pending")

    ) {

        return {

            intent: "pending"

        };

    }

    // --------------------
    // Completed
    // --------------------

    if (

        text.includes("completed") ||

        text.includes("finished")

    ) {

        return {

            intent: "completed"

        };

    }

    // --------------------
    // Overdue
    // --------------------

    if (

        text.includes("overdue") ||

        text.includes("late")

    ) {

        return {

            intent: "overdue"

        };

    }

    // --------------------
    // Unknown
    // --------------------

    return {

        intent: "unknown"

    };

}