const form = document.getElementById('signalForm');
const tabla = document.getElementById('tablaSignals');

let signals = JSON.parse(localStorage.getItem('signals')) || [];

render();

form.addEventListener('submit', e => {
    e.preventDefault();

    const signal = {
        fecha: new Date().toLocaleString(),
        indice: indice.value,
        tipo: tipo.value,
        entrada: entrada.value,
        sl: sl.value,
        tp: tp.value,
        resultado: resultado.value,
        comentario: comentario.value
    };

    signals.push(signal);
    localStorage.setItem('signals', JSON.stringify(signals));

    form.reset();
    render();
});

function render() {
    tabla.innerHTML = '';

    signals.forEach((s, i) => {
        tabla.innerHTML += `
            <tr>
                <td>${s.fecha}</td>
                <td>${s.indice}</td>
                <td>${s.tipo}</td>
                <td>${s.entrada}</td>
                <td>${s.sl}</td>
                <td>${s.tp}</td>
                <td class="${s.resultado === 'Win' ? 'text-success' : s.resultado === 'Loss' ? 'text-danger' : ''}">
                    ${s.resultado}
                </td>
                <td>${s.comentario}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminar(${i})">✖</button>
                </td>
            </tr>
        `;
    });
}

function eliminar(index) {
    signals.splice(index, 1);
    localStorage.setItem('signals', JSON.stringify(signals));
    render();
}
