// Get the display element
const display = document.getElementById("display");

// Add a value to the display
function appendValue(value) {
    display.value += value;
}

// Clear the display
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculate() {
    try {
        if (display.value === "") {
            return;
        }

        // Calculate the expression
        display.value = Function(
            "return " + display.value
        )();
    } catch (error) {
        display.value = "Error";
    }
}

// Keyboard Input
document.addEventListener("keydown", function(event) {

    // Allow numbers and operators
    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === "." ||
        event.key === "%"
    ) {
        appendValue(event.key);
    }

    // Enter key for calculation
    else if (event.key === "Enter") {
        calculate();
    }

    // Backspace to delete
    else if (event.key === "Backspace") {
        deleteLast();
    }

    // Escape to clear
    else if (event.key === "Escape") {
        clearDisplay();
    }

});