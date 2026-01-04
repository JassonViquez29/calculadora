const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "";
let operator = "";
let previous = "";

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;

        if (!isNaN(value) || value === ".") {
            if (value === "." && current.includes(".")) return;
            current += value;
            updateDisplay(current);
        }

        else if (["+", "−", "×", "÷"].includes(value)) {
            if (!current) return;
            operator = value;
            previous = current;
            current = "";
        }

        else if (value === "=") {
            if (!previous || !current) return;
            const result = calculate();
            updateDisplay(result);
            current = result.toString();
            previous = "";
        }

        else if (value === "C") {
            current = "";
            previous = "";
            operator = "";
            updateDisplay("0");
        }

        else if (value === "⌫") {
            current = current.slice(0, -1);
            updateDisplay(current || "0");
        }

        else if (value === "%") {
            current = (parseFloat(current) / 100).toString();
            updateDisplay(current);
        }
    });
});

function calculate() {
    const a = parseFloat(previous);
    const b = parseFloat(current);

    switch (operator) {
        case "+": return a + b;
        case "−": return a - b;
        case "×": return a * b;
        case "÷": return b === 0 ? "Error" : a / b;
    }
}

function updateDisplay(value) {
    display.innerText = value;
}
