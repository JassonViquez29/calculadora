const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn-calc");
const tableResults = document.getElementById("tableResults");

let history = JSON.parse(localStorage.getItem("datos_calculadora")) || [];
let currentOperation = "";

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.value;

    if (val === "C") {
      display.innerText = "0";
      currentOperation = "";
      return;
    }

    if (val === "=") {
      try {
        const result = eval(display.innerText);
        saveResult(display.innerText, result);
        display.innerText = result;
        currentOperation = "";
      } catch {
        display.innerText = "Error";
      }
      return;
    }

    if (display.innerText === "0") {
      display.innerText = val;
    } else {
      display.innerText += val;
    }

    currentOperation += val;
  });
});

function saveResult(operation, result) {
  const record = {
    operation,
    result,
    date: new Date().toLocaleString()
  };
  history.push(record);
  localStorage.setItem("datos_calculadora", JSON.stringify(history));
}

function loadResults() {
  tableResults.innerHTML = "";
  history.forEach((r, i) => {
    tableResults.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${r.operation}</td>
        <td>${r.result}</td>
        <td>${r.date}</td>
      </tr>
    `;
  });
}

/* MENU */
document.getElementById("btnCalc").onclick = () => toggleView(true);
document.getElementById("btnResults").onclick = () => toggleView(false);

function toggleView(calc) {
  document.getElementById("calcView").classList.toggle("d-none", !calc);
  document.getElementById("resultsView").classList.toggle("d-none", calc);
  document.getElementById("btnCalc").classList.toggle("active", calc);
  document.getElementById("btnResults").classList.toggle("active", !calc);
  loadResults();
}

/* EXPORTS */
function exportCSV() {
  let csv = "Operacion,Resultado,Fecha\n";
  history.forEach(r => csv += `${r.operation},${r.result},${r.date}\n`);
  download(csv, "datos_calculadora.csv", "text/csv");
}

function exportJSON() {
  download(JSON.stringify(history, null, 2), "datos_calculadora.json", "application/json");
}

function exportXML() {
  let xml = `<resultados>`;
  history.forEach(r => {
    xml += `
      <registro>
        <operacion>${r.operation}</operacion>
        <resultado>${r.result}</resultado>
        <fecha>${r.date}</fecha>
      </registro>`;
  });
  xml += `</resultados>`;
  download(xml, "datos_calculadora.xml", "application/xml");
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let y = 10;

  history.forEach((r, i) => {
    pdf.text(`${i + 1}) ${r.operation} = ${r.result} (${r.date})`, 10, y);
    y += 8;
  });

  pdf.save("datos_calculadora.pdf");
}

function download(data, filename, type) {
  const blob = new Blob([data], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
