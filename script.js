function calcular(operacion) {
    const n1 = parseFloat(document.getElementById("num1").value);
    const n2 = parseFloat(document.getElementById("num2").value);
    let resultado;

    if (isNaN(n1) || isNaN(n2)) {
        alert("Ingrese ambos números");
        return;
    }

    switch (operacion) {
        case '+': resultado = n1 + n2; break;
        case '-': resultado = n1 - n2; break;
        case '*': resultado = n1 * n2; break;
        case '/':
            if (n2 === 0) {
                alert("No se puede dividir entre cero");
                return;
            }
            resultado = n1 / n2;
            break;
    }

    document.getElementById("resultado").innerText = "Resultado: " + resultado;
}
