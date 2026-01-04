function calcular(op) {
    const n1 = parseFloat(document.getElementById("num1").value);
    const n2 = parseFloat(document.getElementById("num2").value);
    const resultado = document.getElementById("resultado");

    if (isNaN(n1) || isNaN(n2)) {
        resultado.innerText = "Ingrese ambos números";
        resultado.className = "alert alert-warning text-center";
        return;
    }

    let r;
    switch (op) {
        case '+': r = n1 + n2; break;
        case '-': r = n1 - n2; break;
        case '*': r = n1 * n2; break;
        case '/':
            if (n2 === 0) {
                resultado.innerText = "No se puede dividir entre 0";
                resultado.className = "alert alert-danger text-center";
                return;
            }
            r = n1 / n2;
            break;
    }

    resultado.innerText = "Resultado: " + r;
    resultado.className = "alert alert-success text-center";
}
