const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn-calc");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      display.innerText = "0";
      return;
    }

    if (value === "=") {
      try {
        display.innerText = eval(display.innerText);
      } catch {
        display.innerText = "Error";
      }
      return;
    }

    if (display.innerText === "0") {
      display.innerText = value;
    } else {
      display.innerText += value;
    }
  });
});
