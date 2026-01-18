const sampleSignals = Array.from({ length: 50 }, (_, i) => ({
    fecha: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    indice: i % 2 === 0 ? 'Boom 1000' : 'Crash 300',
    tipo: i % 2 === 0 ? 'Compra' : 'Venta',
    resultado: i % 3 === 0 ? 'Win' : 'Loss'
}));
